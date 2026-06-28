from __future__ import annotations

import hashlib
import os
import secrets
import time
from collections import defaultdict, deque
from copy import deepcopy
from datetime import timedelta, timezone, datetime
from typing import Any

from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.trustedhost import TrustedHostMiddleware

try:
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


app = FastAPI(title="BookNook API", version="0.3.0", docs_url="/docs" if os.getenv("BOOKNOOK_ENABLE_DOCS") == "1" else None, redoc_url=None)

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
        "id": 1,
        "title": "The Midnight Library",
        "author": "Matt Haig",
        "cover": "#2D4A3E",
        "pages": 304,
        "read": 304,
        "genre": "Fiction",
        "rating": 5,
        "month": 1,
        "review": "A gorgeous meditation on regret and possibility.",
    },
    {
        "id": 2,
        "title": "Atomic Habits",
        "author": "James Clear",
        "cover": "#8B4513",
        "pages": 320,
        "read": 320,
        "genre": "Self-Help",
        "rating": 5,
        "month": 2,
        "review": "Changed how I think about building routines.",
    },
    {
        "id": 3,
        "title": "Dune",
        "author": "Frank Herbert",
        "cover": "#C4922A",
        "pages": 688,
        "read": 688,
        "genre": "Sci-Fi",
        "rating": 4,
        "month": 3,
        "review": "Epic world-building, slow start but worth it.",
    },
    {
        "id": 4,
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "cover": "#1A2A4A",
        "pages": 476,
        "read": 476,
        "genre": "Sci-Fi",
        "rating": 5,
        "month": 8,
        "review": "The most fun I've had reading in years.",
    },
]

LISTING_SEED = [
    {
        "id": 1,
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
        "offers": [],
        "time": "1h ago",
    },
    {
        "id": 2,
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
        "offers": [],
        "time": "3h ago",
    },
    {
        "id": 3,
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
        "offers": [],
        "time": "5h ago",
    },
]

users_by_email: dict[str, dict[str, Any]] = {}
sessions: dict[str, dict[str, Any]] = {}
books_by_user: dict[str, list[dict[str, Any]]] = {}
listings: list[dict[str, Any]] = deepcopy(LISTING_SEED)
reports: list[dict[str, Any]] = []
next_ids = {"user": 1, "book": 100, "listing": 100, "offer": 100}

CITY_COORDS = {
    "brighton": (50.827, -0.137),
    "bristol": (51.454, -2.587),
    "edinburgh": (55.953, -3.188),
    "london": (51.507, -0.128),
    "manchester": (53.480, -2.242),
    "north london": (51.544, -0.055),
}


def public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "location": user.get("location"),
        "genres": user.get("genres", []),
        "goal": user.get("goal", 12),
        "avatar": user.get("avatar", "📚"),
    }


def public_offer(offer: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in offer.items() if key != "userId"}


def public_listing(listing: dict[str, Any]) -> dict[str, Any]:
    safe = {key: value for key, value in listing.items() if key != "ownerId"}
    safe["offers"] = [public_offer(offer) for offer in listing.get("offers", [])]
    return safe


def hash_password(password: str, salt: str | None = None) -> str:
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 310_000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, encoded: str) -> bool:
    salt, expected = encoded.split("$", 1)
    return secrets.compare_digest(hash_password(password, salt), f"{salt}${expected}")


def token_digest(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_session(email: str) -> str:
    token = secrets.token_urlsafe(32)
    sessions[token_digest(token)] = {
        "email": email,
        "expiresAt": utc_now() + timedelta(minutes=SESSION_TTL_MINUTES),
    }
    return token


def current_user(authorization: str | None = Header(default=None)) -> dict[str, Any]:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Missing bearer token")
    token = authorization.split(" ", 1)[1]
    session_key = token_digest(token)
    session = sessions.get(session_key)
    if not session or session["expiresAt"] <= utc_now():
        sessions.pop(session_key, None)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")
    user = users_by_email.get(session["email"])
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")
    return user


def now_id(kind: str) -> int:
    next_ids[kind] += 1
    return next_ids[kind]


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


def revoke_session(authorization: str | None) -> None:
    if not authorization or not authorization.lower().startswith("bearer "):
        return
    token = authorization.split(" ", 1)[1]
    sessions.pop(token_digest(token), None)


def coarse_coords(location: str) -> tuple[float, float]:
    key = (location or "").strip().lower()
    return CITY_COORDS.get(key, (51.5, -0.12))


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "BookNook API is running"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/register")
def register(payload: UserRegister) -> dict[str, Any]:
    if payload.email in users_by_email:
        raise HTTPException(status.HTTP_409_CONFLICT, "An account already exists for this email")

    user = {
        "id": now_id("user"),
        "name": payload.name.strip(),
        "email": payload.email,
        "passwordHash": hash_password(payload.password),
        "location": (payload.location or "").strip(),
        "genres": payload.genres,
        "goal": payload.goal,
        "avatar": payload.avatar,
        "createdAt": utc_now().isoformat(),
    }
    users_by_email[user["email"]] = user
    books_by_user[user["email"]] = deepcopy(BOOK_SEED)
    return {"token": create_session(user["email"]), "user": public_user(user)}


@app.post("/auth/login")
def login(payload: UserLogin) -> dict[str, Any]:
    assert_not_locked(payload.email)
    user = users_by_email.get(payload.email)
    if not user or not verify_password(payload.password, user["passwordHash"]):
        record_failed_login(payload.email)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")
    clear_failed_login(payload.email)
    return {"token": create_session(user["email"]), "user": public_user(user)}


@app.post("/auth/logout")
def logout(authorization: str | None = Header(default=None)) -> dict[str, bool]:
    revoke_session(authorization)
    return {"ok": True}


@app.get("/me")
def me(user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    return {"user": public_user(user)}


@app.get("/me/export")
def export_me(user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    owned_listing_ids = {listing["id"] for listing in listings if listing.get("ownerId") == user["id"]}
    visible_offers = []
    for listing in listings:
        if listing["id"] in owned_listing_ids:
            offers = listing.get("offers", [])
        else:
            offers = [offer for offer in listing.get("offers", []) if offer.get("userId") == user["id"]]
        if offers:
            visible_offers.append({"listingId": listing["id"], "offers": [public_offer(offer) for offer in offers]})
    return {
        "user": public_user(user),
        "books": books_by_user.get(user["email"], []),
        "listings": [public_listing(listing) for listing in listings if listing.get("ownerId") == user["id"]],
        "offers": visible_offers,
        "reports": [report for report in reports if report.get("reporterId") == user["id"]],
    }


@app.delete("/me")
def delete_me(authorization: str | None = Header(default=None), user: dict[str, Any] = Depends(current_user)) -> dict[str, bool]:
    email = user["email"]
    users_by_email.pop(email, None)
    books_by_user.pop(email, None)
    for token, session in list(sessions.items()):
        if session["email"] == email:
            sessions.pop(token, None)
    listings[:] = [listing for listing in listings if listing.get("ownerId") != user["id"]]
    for listing in listings:
        listing["offers"] = [offer for offer in listing.get("offers", []) if offer.get("userId") != user["id"]]
    reports[:] = [report for report in reports if report.get("reporterId") != user["id"]]
    revoke_session(authorization)
    return {"ok": True}


@app.get("/bootstrap")
def bootstrap(user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    return {
        "user": public_user(user),
        "books": books_by_user.get(user["email"], []),
        "listings": [public_listing(listing) for listing in listings],
    }


@app.get("/books")
def list_books(user: dict[str, Any] = Depends(current_user)) -> list[dict[str, Any]]:
    return books_by_user.get(user["email"], [])


@app.post("/books")
def add_book(payload: BookCreate, user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    book = payload.model_dump()
    book["id"] = now_id("book")
    book["read"] = book["read"] if book["read"] is not None else (book["pages"] if book["status"] == "read" else 0)
    book["month"] = book["month"] or utc_now().month
    books_by_user.setdefault(user["email"], []).append(book)
    return book


@app.get("/listings")
def list_market() -> list[dict[str, Any]]:
    return [public_listing(listing) for listing in listings]


@app.post("/listings")
def create_listing(payload: ListingCreate, user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    listing = payload.model_dump()
    listing["location"] = (listing.get("location") or user.get("location") or "Your area").strip().split(",", 1)[0].strip()
    listing["lat"], listing["lng"] = coarse_coords(listing["location"])
    listing.update(
        {
            "id": now_id("listing"),
            "ownerId": user["id"],
            "owner": user["name"],
            "ownerBg": "linear-gradient(135deg,#E8C4A0,#C4A070)",
            "ownerKarma": 0,
            "offers": [],
            "time": "just now",
        }
    )
    listings.insert(0, listing)
    return public_listing(listing)


@app.post("/listings/{listing_id}/offers")
def create_offer(
    listing_id: int,
    payload: OfferCreate,
    user: dict[str, Any] = Depends(current_user),
) -> dict[str, Any]:
    for listing in listings:
        if listing["id"] == listing_id:
            offer = payload.model_dump()
            offer.update(
                {
                    "id": now_id("offer"),
                    "userId": user["id"],
                    "user": user["name"],
                    "userBg": "#E8C4A0",
                    "createdAt": utc_now().isoformat(),
                }
            )
            listing.setdefault("offers", []).append(offer)
            return public_offer(offer)
    raise HTTPException(status.HTTP_404_NOT_FOUND, "Listing not found")


@app.post("/reports")
def create_report(payload: ReportCreate, user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    report = payload.model_dump()
    report.update({"id": len(reports) + 1, "reporterId": user["id"], "createdAt": utc_now().isoformat()})
    reports.append(report)
    return {"ok": True}


@app.post("/recommendations")
def recommendations(payload: RecommendationRequest, user: dict[str, Any] = Depends(current_user)) -> list[dict[str, str]]:
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
    picks = by_genre.get(favorite_genre, [
        ("Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "A layered novel about creativity, friendship, and ambition."),
        ("The Covenant of Water", "Abraham Verghese", "A sweeping family story with huge emotional range."),
    ])
    return [
        {"title": title, "author": author, "genre": favorite_genre, "why": why, "emoji": "📚"}
        for title, author, why in picks
    ]
