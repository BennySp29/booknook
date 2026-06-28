from __future__ import annotations

import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, JSON, String, Text, create_engine, event, func, select
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, sessionmaker


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def database_url() -> str:
    configured = os.getenv("BOOKNOOK_DATABASE_URL") or os.getenv("DATABASE_URL")
    if configured:
        if configured.startswith("postgres://"):
            return configured.replace("postgres://", "postgresql+psycopg://", 1)
        if configured.startswith("postgresql://"):
            return configured.replace("postgresql://", "postgresql+psycopg://", 1)
        return configured

    sqlite_path = Path(__file__).with_name("booknook.db")
    return f"sqlite:///{sqlite_path.as_posix()}"


class Base(DeclarativeBase):
    pass


class UserRow(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80))
    email: Mapped[str] = mapped_column(String(254), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(256))
    location: Mapped[str | None] = mapped_column(String(120), nullable=True)
    genres: Mapped[list[str]] = mapped_column(JSON, default=list)
    goal: Mapped[int] = mapped_column(Integer, default=12)
    avatar: Mapped[str] = mapped_column(String(8), default="📚")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    sessions: Mapped[list["UserSessionRow"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    books: Mapped[list["BookRow"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    listings: Mapped[list["ListingRow"]] = relationship(back_populates="owner_user")
    offers: Mapped[list["OfferRow"]] = relationship(back_populates="offer_user")
    reports: Mapped[list["ReportRow"]] = relationship(back_populates="reporter")


class UserSessionRow(Base):
    __tablename__ = "user_sessions"

    token_hash: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)

    user: Mapped[UserRow] = relationship(back_populates="sessions")


class BookRow(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(160))
    author: Mapped[str] = mapped_column(String(120))
    cover: Mapped[str] = mapped_column(String(32), default="#2A3A2A")
    pages: Mapped[int] = mapped_column(Integer, default=0)
    read: Mapped[int] = mapped_column(Integer, default=0)
    genre: Mapped[str] = mapped_column(String(80), default="Fiction")
    rating: Mapped[int] = mapped_column(Integer, default=0)
    month: Mapped[int] = mapped_column(Integer, default=1)
    review: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(16), default="read")

    user: Mapped[UserRow] = relationship(back_populates="books")


class ListingRow(Base):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    type: Mapped[str] = mapped_column(String(16))
    want_genre: Mapped[str | None] = mapped_column(String(80), nullable=True)
    want_specific: Mapped[str | None] = mapped_column(String(160), nullable=True)
    book: Mapped[str] = mapped_column(String(160))
    author: Mapped[str] = mapped_column(String(120))
    genre: Mapped[str] = mapped_column(String(80), default="Fiction")
    condition: Mapped[str] = mapped_column(String(24), default="Good")
    owner_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    owner: Mapped[str] = mapped_column(String(80))
    owner_bg: Mapped[str] = mapped_column(String(120), default="#7090B0")
    owner_karma: Mapped[int] = mapped_column(Integer, default=0)
    location: Mapped[str] = mapped_column(String(120), default="Your area")
    lat: Mapped[float] = mapped_column(Float, default=51.5)
    lng: Mapped[float] = mapped_column(Float, default=-0.12)
    can_post: Mapped[bool] = mapped_column(Boolean, default=True)
    note: Mapped[str] = mapped_column(Text, default="")
    time: Mapped[str] = mapped_column(String(40), default="just now")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, index=True)

    owner_user: Mapped[UserRow | None] = relationship(back_populates="listings")
    offers: Mapped[list["OfferRow"]] = relationship(back_populates="listing", cascade="all, delete-orphan")


class OfferRow(Base):
    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    listing_id: Mapped[int] = mapped_column(ForeignKey("listings.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    user: Mapped[str] = mapped_column(String(80))
    user_bg: Mapped[str] = mapped_column(String(120), default="#E8C4A0")
    book_offer: Mapped[str] = mapped_column(String(160), default="")
    message: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    listing: Mapped[ListingRow] = relationship(back_populates="offers")
    offer_user: Mapped[UserRow | None] = relationship(back_populates="offers")


class ReportRow(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    reporter_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    content_id: Mapped[str] = mapped_column(String(120))
    reason: Mapped[str] = mapped_column(String(500), default="")
    type: Mapped[str] = mapped_column(String(40), default="content")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    reporter: Mapped[UserRow | None] = relationship(back_populates="reports")


ENGINE_URL = database_url()
IS_SQLITE = ENGINE_URL.startswith("sqlite")
connect_args: dict[str, Any] = {"check_same_thread": False} if IS_SQLITE else {}
engine = create_engine(ENGINE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


@event.listens_for(Engine, "connect")
def enable_sqlite_foreign_keys(dbapi_connection: Any, _connection_record: Any) -> None:
    if IS_SQLITE:
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(seed_listings: list[dict[str, Any]]) -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        listing_count = db.scalar(select(func.count(ListingRow.id))) or 0
        if listing_count:
            return
        for item in seed_listings:
            db.add(
                ListingRow(
                    type=item["type"],
                    want_genre=item.get("wantGenre"),
                    want_specific=item.get("wantSpecific"),
                    book=item["book"],
                    author=item["author"],
                    genre=item["genre"],
                    condition=item["condition"],
                    owner=item["owner"],
                    owner_bg=item["ownerBg"],
                    owner_karma=item["ownerKarma"],
                    location=item["location"],
                    lat=item["lat"],
                    lng=item["lng"],
                    can_post=item["canPost"],
                    note=item["note"],
                    time=item["time"],
                )
            )
        db.commit()
