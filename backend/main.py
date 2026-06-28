from __future__ import annotations

import hashlib
import os
import secrets
import time
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import delete, or_, select
from sqlalchemy.orm import Session, selectinload
from starlette.middleware.trustedhost import TrustedHostMiddleware

try:
    from .database import (
        BookRow,
        ListingRow,
        OfferRow,
        ReportRow,
        UserRow,
        UserSessionRow,
        get_db,
        init_db,
    )
    from .models import (
        BookCreate,
        ListingCreate,
        OfferCreate,
        RecommendationRequest,
        ReportCreate,
        UserLogin,
        UserRegister,
    )
except ImportError:
    from database import (
        BookRow,
        ListingRow,
        OfferRow,
        ReportRow,
        UserRow,
        UserSessionRow,
        get_db,
        init_db,
    )
    from models import (
        BookCreate,
        ListingCreate,
        OfferCreate,
        RecommendationRequest,
        ReportCreate,
        UserLogin,
        UserRegister,
    )


def env_csv(name: str, default: str) -> list[str]:
    return [item.strip() for item in os.getenv(name, default).split(",") if item.strip()]


ALLOWED_ORIGINS = env_csv("BOOKNOOK_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
ALLOWED_HOSTS = env_csv("BOOKNOOK_ALLOWED_HOSTS", "localhost,127.0.0.1")
SESSION_TTL_MINUTES = int(os.getenv("BOOKNOOK_SESSION_TTL_MINUTES", "480"))
MAX_REQUEST_BYTES = int(os.getenv("BOOKNOOK_MAX_REQUEST_BYTES", "65536"))
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("BOOKNOOK_RATE_LIMIT_WINDOW_SECONDS", "60"))
RATE_LIMIT_MAX = int(os.getenv("BOOKNOOK_RATE_LIMIT_MAX", "90"))
AUTH_RATE_LIMIT_MAX = int(os.getenv("BOOKNOOK_AUTH_RATE_LIMIT_MAX", "10"))
FAILED_LOGIN_LIMIT = int(os.getenv("BOOKNOOK_FAILED_LOGIN_LIMIT", "5"))
LOGIN_LOCKOUT_SECONDS = int(os.getenv("BOOKNOOK_LOGIN_LOCKOUT_SECONDS", "900"))


app = FastAPI(
    title="BookNook API",
    version="0.4.0",
    docs_url="/docs" if os.getenv("BOOKNOOK_ENABLE_DOCS") == "1" else None,
    redoc_url=None,
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=ALLOWED_HOSTS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

rate_buckets: dict[str, deque[float]] = defaultdict(deque)
failed_logins: dict[str, dict[str, Any]] = defaultdict(lambda: {"count": 0, "lockedUntil": 0.0})


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def as_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


@app.middleware("http")
async def protect_requests(request: Request, call_next):
    if request.method in {"POST", "PUT", "PATCH"}:
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                too_large = int(content_length) > MAX_REQUEST_BYTES
            except ValueError:
                return JSONResponse({"detail": "Invalid Content-Length"}, status_code=status.HTTP_400_BAD_REQUEST)
            if too_large:
                return JSONResponse({"detail": "Request body too large"}, status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)

    if request.url.path != "/health":
        bucket_name = f"{client_ip(request)}:{request.method}:{request.url.path}"
        limit = AUTH_RATE_LIMIT_MAX if request.url.path.startswith("/auth/") else RATE_LIMIT_MAX
        now = time.monotonic()
        bucket = rate_buckets[bucket_name]
        while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SECONDS:
            bucket.popleft()
        if len(bucket) >= limit:
            return JSONResponse({"detail": "Too many requests"}, status_code=status.HTTP_429_TOO_MANY_REQUESTS)
        bucket.append(now)

    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    response.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'"
    response.headers["Cache-Control"] = "no-store"
    return response


BOOK_SEED = [
    {
        "title": "The Midnight Library",
        "author": "Matt Haig",
        "cover": "#2D4A3E",
        "pages": 304,
        "read": 304,
        "genre": "Fiction",
        "rating": 5,
        "month": 1,
        "review": "A gorgeous meditation on regret and possibility.",
        "status": "read",
    },
    {
        "title": "Atomic Habits",
        "author": "James Clear",
        "cover": "#8B4513",
        "pages": 320,
        "read": 320,
        "genre": "Self-Help",
        "rating": 5,
        "month": 2,
        "review": "Changed how I think about building routines.",
        "status": "read",
    },
    {
        "title": "Dune",
        "author": "Frank Herbert",
        "cover": "#C4922A",
        "pages": 688,
        "read": 688,
        "genre": "Sci-Fi",
        "rating": 4,
        "month": 3,
        "review": "Epic world-building, slow start but worth it.",
        "status": "read",
    },
    {
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "cover": "#1A2A4A",
        "pages": 476,
        "read": 476,
        "genre": "Sci-Fi",
        "rating": 5,
        "month": 8,
        "review": "The most fun I've had reading in years.",
        "status": "read",
    },
]

LISTING_SEED = [
    {
        "type": "give",
        "book": "Lessons in Chemistry",
        "author": "Bonnie Garmus",
        "genre": "Fiction",
        "condition": "Good",
        "owner": "Tom R.",
        "ownerBg": "#7090B0",
        "ownerKarma": 12,
        "location": "North London",
        "lat": 51.544,
        "lng": -0.055,
        "canPost": True,
        "note": "Loved it, hoping it goes to a good home.",
        "time": "1h ago",
    },
    {
        "type": "trade",
        "wantGenre": "Sci-Fi",
        "wantSpecific": "anything by Kim Stanley Robinson",
        "book": "Fourth Wing",
        "author": "Rebecca Yarros",
        "genre": "Fantasy",
        "condition": "Like new",
        "owner": "Priya S.",
        "ownerBg": "#B07090",
        "ownerKarma": 8,
        "location": "Manchester",
        "lat": 53.480,
        "lng": -2.242,
        "canPost": True,
        "note": "Obsessed with KSR lately.",
        "time": "3h ago",
    },
    {
        "type": "open",
        "book": "The Thursday Murder Club",
        "author": "Richard Osman",
        "genre": "Fiction",
        "condition": "Good",
        "owner": "Ben W.",
        "ownerBg": "#709070",
        "ownerKarma": 21,
        "location": "Bristol",
        "lat": 51.454,
        "lng": -2.587,
        "canPost": False,
        "note": "Open to anything - surprise me!",
        "time": "5h ago",
    },
]

CITY_COORDS = {
    "brighton": (50.827, -0.137),
    "bristol": (51.454, -2.587),
    "edinburgh": (55.953, -3.188),
    "london": (51.507, -0.128),
    "manchester": (53.480, -2.242),
    "north london": (51.544, -0.055),
}


@app.on_event("startup")
def startup() -> None:
    init_db(LISTING_SEED)


def public_user(user: UserRow) -> dict[str, Any]:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "location": user.location,
        "genres": user.genres or [],
        "goal": user.goal,
        "avatar": user.avatar,
    }


def public_offer(offer: OfferRow) -> dict[str, Any]:
    return {
        "id": offer.id,
        "user": offer.user,
        "userBg": offer.user_bg,
        "bookOffer": offer.book_offer,
        "message": offer.message,
        "createdAt": offer.created_at.isoformat(),
    }


def export_offer(offer: OfferRow) -> dict[str, Any]:
    return public_offer(offer)


def export_offer_groups(offers: list[OfferRow]) -> list[dict[str, Any]]:
    grouped: dict[int, list[dict[str, Any]]] = {}
    for offer in offers:
        grouped.setdefault(offer.listing_id, []).append(export_offer(offer))
    return [{"listingId": listing_id, "offers": grouped[listing_id]} for listing_id in grouped]


def public_listing(listing: ListingRow) -> dict[str, Any]:
    return {
        "id": listing.id,
        "type": listing.type,
        "wantGenre": listing.want_genre,
        "wantSpecific": listing.want_specific,
        "book": listing.book,
        "author": listing.author,
        "genre": listing.genre,
        "condition": listing.condition,
        "owner": listing.owner,
        "ownerBg": listing.owner_bg,
        "ownerKarma": listing.owner_karma,
        "location": listing.location,
        "lat": listing.lat,
        "lng": listing.lng,
        "canPost": listing.can_post,
        "note": listing.note,
        "offers": [public_offer(offer) for offer in listing.offers],
        "time": listing.time,
    }


def public_book(book: BookRow) -> dict[str, Any]:
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "cover": book.cover,
        "pages": book.pages,
        "read": book.read,
        "genre": book.genre,
        "rating": book.rating,
        "month": book.month,
        "review": book.review,
        "status": book.status,
    }


def export_report(report: ReportRow) -> dict[str, Any]:
    return {
        "id": report.id,
        "contentId": report.content_id,
        "reason": report.reason,
        "type": report.type,
        "createdAt": report.created_at.isoformat(),
    }


def hash_password(password: str, salt: str | None = None) -> str:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 310_000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, encoded: str) -> bool:
    salt, expected = encoded.split("$", 1)
    return secrets.compare_digest(hash_password(password, salt), f"{salt}${expected}")


def token_digest(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_session(db: Session, user: UserRow) -> str:
    token = secrets.token_urlsafe(32)
    db.add(
        UserSessionRow(
            token_hash=token_digest(token),
            user_id=user.id,
            expires_at=utc_now() + timedelta(minutes=SESSION_TTL_MINUTES),
        )
    )
    db.commit()
    return token


def current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> UserRow:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Missing bearer token")
    token = authorization.split(" ", 1)[1]
    session_key = token_digest(token)
    session = db.get(UserSessionRow, session_key)
    if not session or as_utc(session.expires_at) <= utc_now():
        if session:
            db.delete(session)
            db.commit()
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")
    user = db.get(UserRow, session.user_id)
    if not user:
        db.delete(session)
        db.commit()
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")
    return user


def assert_not_locked(email: str) -> None:
    state = failed_logins[email]
    if state["lockedUntil"] > time.monotonic():
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, "Too many failed login attempts. Try again later.")


def record_failed_login(email: str) -> None:
    state = failed_logins[email]
    state["count"] += 1
    if state["count"] >= FAILED_LOGIN_LIMIT:
        state["lockedUntil"] = time.monotonic() + LOGIN_LOCKOUT_SECONDS


def clear_failed_login(email: str) -> None:
    failed_logins.pop(email, None)


def revoke_session(db: Session, authorization: str | None) -> None:
    if not authorization or not authorization.lower().startswith("bearer "):
        return
    token = authorization.split(" ", 1)[1]
    session = db.get(UserSessionRow, token_digest(token))
    if session:
        db.delete(session)
        db.commit()


def coarse_coords(location: str) -> tuple[float, float]:
    key = (location or "").strip().lower()
    return CITY_COORDS.get(key, (51.5, -0.12))


def seed_books_for_user(db: Session, user: UserRow) -> None:
    for item in BOOK_SEED:
        db.add(
            BookRow(
                user_id=user.id,
                title=item["title"],
                author=item["author"],
                cover=item["cover"],
                pages=item["pages"],
                read=item["read"],
                genre=item["genre"],
                rating=item["rating"],
                month=item["month"],
                review=item["review"],
                status=item["status"],
            )
        )


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "BookNook API is running"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/register")
def register(payload: UserRegister, db: Session = Depends(get_db)) -> dict[str, Any]:
    existing_user = db.scalar(select(UserRow).where(UserRow.email == payload.email))
    if existing_user:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account already exists for this email")

    user = UserRow(
        name=payload.name.strip(),
        email=payload.email,
        password_hash=hash_password(payload.password),
        location=(payload.location or "").strip(),
        genres=payload.genres,
        goal=payload.goal,
        avatar=payload.avatar,
        created_at=utc_now(),
    )
    db.add(user)
    db.flush()
    seed_books_for_user(db, user)
    db.commit()
    db.refresh(user)
    return {"token": create_session(db, user), "user": public_user(user)}


@app.post("/auth/login")
def login(payload: UserLogin, db: Session = Depends(get_db)) -> dict[str, Any]:
    assert_not_locked(payload.email)
    user = db.scalar(select(UserRow).where(UserRow.email == payload.email))
    if not user or not verify_password(payload.password, user.password_hash):
        record_failed_login(payload.email)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")
    clear_failed_login(payload.email)
    return {"token": create_session(db, user), "user": public_user(user)}


@app.post("/auth/logout")
def logout(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> dict[str, bool]:
    revoke_session(db, authorization)
    return {"ok": True}


@app.get("/me")
def me(user: UserRow = Depends(current_user)) -> dict[str, Any]:
    return {"user": public_user(user)}


@app.get("/me/export")
def export_me(user: UserRow = Depends(current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    owned_listings = db.scalars(
        select(ListingRow)
        .options(selectinload(ListingRow.offers))
        .where(ListingRow.owner_id == user.id)
        .order_by(ListingRow.created_at.desc())
    ).all()
    visible_offers = db.scalars(
        select(OfferRow)
        .join(OfferRow.listing)
        .options(selectinload(OfferRow.listing))
        .where(or_(OfferRow.user_id == user.id, ListingRow.owner_id == user.id))
        .order_by(OfferRow.created_at.desc())
    ).all()
    books = db.scalars(select(BookRow).where(BookRow.user_id == user.id).order_by(BookRow.id)).all()
    reports = db.scalars(select(ReportRow).where(ReportRow.reporter_id == user.id).order_by(ReportRow.id)).all()
    return {
        "user": public_user(user),
        "books": [public_book(book) for book in books],
        "listings": [public_listing(listing) for listing in owned_listings],
        "offers": export_offer_groups(list(visible_offers)),
        "reports": [export_report(report) for report in reports],
    }


@app.delete("/me")
def delete_me(
    authorization: str | None = Header(default=None),
    user: UserRow = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    db.execute(delete(UserSessionRow).where(UserSessionRow.user_id == user.id))
    db.execute(delete(BookRow).where(BookRow.user_id == user.id))
    db.execute(delete(OfferRow).where(OfferRow.user_id == user.id))
    db.execute(delete(ReportRow).where(ReportRow.reporter_id == user.id))
    db.execute(delete(ListingRow).where(ListingRow.owner_id == user.id))
    db.delete(user)
    db.commit()
    revoke_session(db, authorization)
    return {"ok": True}


@app.get("/bootstrap")
def bootstrap(user: UserRow = Depends(current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    books = db.scalars(select(BookRow).where(BookRow.user_id == user.id).order_by(BookRow.id)).all()
    listings = db.scalars(
        select(ListingRow).options(selectinload(ListingRow.offers)).order_by(ListingRow.created_at.desc(), ListingRow.id.desc())
    ).all()
    return {
        "user": public_user(user),
        "books": [public_book(book) for book in books],
        "listings": [public_listing(listing) for listing in listings],
    }


@app.get("/books")
def list_books(user: UserRow = Depends(current_user), db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    books = db.scalars(select(BookRow).where(BookRow.user_id == user.id).order_by(BookRow.id)).all()
    return [public_book(book) for book in books]


@app.post("/books")
def add_book(payload: BookCreate, user: UserRow = Depends(current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    data = payload.model_dump()
    read = data["read"] if data["read"] is not None else (data["pages"] if data["status"] == "read" else 0)
    book = BookRow(
        user_id=user.id,
        title=data["title"],
        author=data["author"],
        cover=data["cover"],
        pages=data["pages"],
        read=read,
        genre=data["genre"],
        rating=data["rating"],
        month=data["month"] or utc_now().month,
        review=data["review"],
        status=data["status"],
    )
    db.add(book)
    db.commit()
    db.refresh(book)
    return public_book(book)


@app.get("/listings")
def list_market(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    listings = db.scalars(
        select(ListingRow).options(selectinload(ListingRow.offers)).order_by(ListingRow.created_at.desc(), ListingRow.id.desc())
    ).all()
    return [public_listing(listing) for listing in listings]


@app.post("/listings")
def create_listing(
    payload: ListingCreate,
    user: UserRow = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    data = payload.model_dump()
    location = (data.get("location") or user.location or "Your area").strip().split(",", 1)[0].strip()
    lat, lng = coarse_coords(location)
    listing = ListingRow(
        type=data["type"],
        want_genre=data.get("wantGenre"),
        want_specific=data.get("wantSpecific"),
        book=data["book"],
        author=data["author"],
        genre=data["genre"],
        condition=data["condition"],
        owner_id=user.id,
        owner=user.name,
        owner_bg="linear-gradient(135deg,#E8C4A0,#C4A070)",
        owner_karma=0,
        location=location,
        lat=lat,
        lng=lng,
        can_post=data["canPost"],
        note=data["note"],
        time="just now",
        created_at=utc_now(),
    )
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return public_listing(listing)


@app.post("/listings/{listing_id}/offers")
def create_offer(
    listing_id: int,
    payload: OfferCreate,
    user: UserRow = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    listing = db.get(ListingRow, listing_id)
    if not listing:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Listing not found")
    data = payload.model_dump()
    offer = OfferRow(
        listing_id=listing.id,
        user_id=user.id,
        user=user.name,
        user_bg="#E8C4A0",
        book_offer=data["bookOffer"],
        message=data["message"],
        created_at=utc_now(),
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return public_offer(offer)


@app.post("/reports")
def create_report(payload: ReportCreate, user: UserRow = Depends(current_user), db: Session = Depends(get_db)) -> dict[str, bool]:
    data = payload.model_dump()
    report = ReportRow(
        reporter_id=user.id,
        content_id=data["contentId"],
        reason=data["reason"],
        type=data["type"],
        created_at=utc_now(),
    )
    db.add(report)
    db.commit()
    return {"ok": True}


@app.post("/recommendations")
def recommendations(payload: RecommendationRequest, user: UserRow = Depends(current_user)) -> list[dict[str, str]]:
    genres = [book.get("genre") for book in payload.books if book.get("genre")]
    favorite_genre = max(set(genres), key=genres.count) if genres else "Fiction"
    by_genre = {
        "Sci-Fi": [
            ("A Psalm for the Wild-Built", "Becky Chambers", "Quiet, hopeful science fiction with a generous heart."),
            ("The Long Way to a Small, Angry Planet", "Becky Chambers", "Found-family space travel for readers who like warmth with their ideas."),
        ],
        "Fantasy": [
            ("The Priory of the Orange Tree", "Samantha Shannon", "Expansive fantasy with political stakes and a strong ensemble."),
            ("A Wizard of Earthsea", "Ursula K. Le Guin", "A lean classic about power, pride, and growing wiser."),
        ],
        "Self-Help": [
            ("Four Thousand Weeks", "Oliver Burkeman", "A humane counterweight to productivity pressure."),
            ("Deep Work", "Cal Newport", "Practical structure for readers who liked habit systems."),
        ],
        "Memoir": [
            ("Crying in H Mart", "Michelle Zauner", "Tender, vivid, and emotionally exact."),
            ("Know My Name", "Chanel Miller", "A powerful memoir with extraordinary clarity."),
        ],
    }
    picks = by_genre.get(
        favorite_genre,
        [
            ("Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "A layered novel about creativity, friendship, and ambition."),
            ("The Covenant of Water", "Abraham Verghese", "A sweeping family story with huge emotional range."),
        ],
    )
    return [{"title": title, "author": author, "genre": favorite_genre, "why": why, "emoji": "📚"} for title, author, why in picks]
