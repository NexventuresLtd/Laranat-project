from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel


ComicStatus = Literal["ongoing", "completed"]
ComicType = Literal["series", "one-shot"]


class Comic(BaseModel):
    id: str
    title: str
    description: str
    author: str
    genre: str
    language: str
    status: ComicStatus
    coverImage: str
    type: ComicType
    ageRating: str
    chapterOrEpisode: int | None = None


class SitePayload(BaseModel):
    data: dict[str, Any]


class RegisterPayload(BaseModel):
    name: str
    email: str
    password: str


class LoginPayload(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str


class AuthResponse(BaseModel):
    token: str
    user: UserOut

