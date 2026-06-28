import re
from typing import Any, Literal

from pydantic import BaseModel, Field, field_validator


EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class UserRegister(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=8, max_length=256)
    ageConfirmed: bool = Field(default=False, validate_default=True)
    location: str | None = Field(default=None, max_length=120)
    genres: list[str] = Field(default_factory=list, max_length=12)
    goal: int = Field(default=12, ge=1, le=250)
    avatar: str = Field(default="📚", max_length=8)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        value = value.strip().lower()
        if not EMAIL_RE.match(value):
            raise ValueError("Enter a valid email address")
        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        checks = (
            any(ch.isupper() for ch in value),
            any(ch.islower() for ch in value),
            any(ch.isdigit() for ch in value),
            any(not ch.isalnum() for ch in value),
        )
        if not all(checks):
            raise ValueError("Password must include uppercase, lowercase, number, and symbol characters")
        return value

    @field_validator("location")
    @classmethod
    def city_only_location(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return value.strip().split(",", 1)[0].strip()

    @field_validator("ageConfirmed")
    @classmethod
    def validate_age_confirmation(cls, value: bool) -> bool:
        if not value:
            raise ValueError("You must be 13 or older to create an account")
        return value


class UserLogin(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=1, max_length=256)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        value = value.strip().lower()
        if not EMAIL_RE.match(value):
            raise ValueError("Enter a valid email address")
        return value


class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    author: str = Field(min_length=1, max_length=120)
    cover: str = Field(default="#2A3A2A", max_length=32)
    pages: int = Field(default=0, ge=0, le=10000)
    read: int | None = Field(default=None, ge=0, le=10000)
    genre: str = Field(default="Fiction", max_length=80)
    rating: int = Field(default=0, ge=0, le=5)
    month: int | None = Field(default=None, ge=1, le=12)
    review: str = Field(default="", max_length=2000)
    status: Literal["read", "reading", "want"] = "read"


class ListingCreate(BaseModel):
    type: Literal["give", "trade", "open"]
    book: str = Field(min_length=1, max_length=160)
    author: str = Field(min_length=1, max_length=120)
    genre: str = Field(default="Fiction", max_length=80)
    condition: Literal["Like new", "Good", "Fair", "Well loved"] = "Good"
    wantGenre: str | None = Field(default=None, max_length=80)
    wantSpecific: str | None = Field(default=None, max_length=160)
    canPost: bool = True
    note: str = Field(default="", max_length=1000)
    location: str = Field(default="Your area", max_length=120)
    lat: float = 51.5
    lng: float = -0.12


class OfferCreate(BaseModel):
    bookOffer: str = Field(default="", max_length=160)
    message: str = Field(default="", max_length=1000)


class ReportCreate(BaseModel):
    contentId: str = Field(min_length=1, max_length=120)
    reason: str = Field(default="", max_length=500)
    type: str = Field(default="content", max_length=40)


class RecommendationRequest(BaseModel):
    books: list[dict[str, Any]] = Field(default_factory=list, max_length=100)
