from __future__ import annotations

from collections import Counter
import hashlib
import hmac
import secrets
from uuid import uuid4

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

try:
    from .database import (
        create_user,
        delete_comic,
        get_all_site,
        get_comic,
        get_site_section,
        get_user_by_email,
        get_user_by_token,
        init_db,
        list_comics,
        save_user_token,
        upsert_comic,
        upsert_site_section,
    )
    from .schemas import (
        AuthResponse,
        Comic,
        LoginPayload,
        RegisterPayload,
        SitePayload,
        UserOut,
    )
except ImportError:
    from database import (
        create_user,
        delete_comic,
        get_all_site,
        get_comic,
        get_site_section,
        get_user_by_email,
        get_user_by_token,
        init_db,
        list_comics,
        save_user_token,
        upsert_comic,
        upsert_site_section,
    )
    from schemas import (
        AuthResponse,
        Comic,
        LoginPayload,
        RegisterPayload,
        SitePayload,
        UserOut,
    )

ALLOWED_SECTIONS = {"about", "home", "services", "portfolio", "contact", "settings"}

app = FastAPI(title="Lanart API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PASSWORD_SALT = "lanart_salt_v1"
ADMIN_EMAIL = "admin@lanart21.com"


def hash_password(raw_password: str) -> str:
    return hashlib.sha256(f"{PASSWORD_SALT}:{raw_password}".encode("utf-8")).hexdigest()


def verify_password(raw_password: str, expected_hash: str) -> bool:
    return hmac.compare_digest(hash_password(raw_password), expected_hash)


def is_admin_user(user: dict[str, Any]) -> bool:
    return user.get("email", "").strip().lower() == ADMIN_EMAIL


def parse_bearer_token(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1].strip()


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "lanart-api"}


@app.get("/api/site")
def get_site_all() -> dict:
    return get_all_site()


@app.get("/api/site/{section}")
def get_site_section_route(section: str) -> dict:
    if section not in ALLOWED_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    row = get_site_section(section)
    if row is None:
        raise HTTPException(status_code=404, detail="Section not found")
    return row


@app.put("/api/site/{section}")
def put_site_section(section: str, payload: SitePayload, authorization: str | None = Header(default=None)) -> dict[str, bool]:
    if section not in ALLOWED_SECTIONS:
        raise HTTPException(status_code=400, detail="Invalid section")
    
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Only admins can edit site content")
    
    upsert_site_section(section, payload.data)
    return {"ok": True}


@app.get("/api/comics")
def get_comics() -> list[dict]:
    return list_comics()


@app.get("/api/comics/{comic_id}")
def get_comic_route(comic_id: str) -> dict:
    comic = get_comic(comic_id)
    if comic is None:
        raise HTTPException(status_code=404, detail="Comic not found")
    return comic


@app.post("/api/comics")
def create_comic(payload: Comic, authorization: str | None = Header(default=None)) -> dict:
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Only admins can create comics")
    
    comic = payload.model_dump()
    if not comic.get("id"):
        comic["id"] = str(uuid4())[:8]
    if get_comic(comic["id"]) is not None:
        raise HTTPException(status_code=409, detail="Comic id already exists")
    upsert_comic(comic)
    return comic


@app.put("/api/comics/{comic_id}")
def update_comic(comic_id: str, payload: Comic, authorization: str | None = Header(default=None)) -> dict:
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Only admins can update comics")
    
    if get_comic(comic_id) is None:
        raise HTTPException(status_code=404, detail="Comic not found")
    comic = payload.model_dump()
    comic["id"] = comic_id
    upsert_comic(comic)
    return comic


@app.delete("/api/comics/{comic_id}")
def remove_comic(comic_id: str, authorization: str | None = Header(default=None)) -> dict[str, bool]:
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Only admins can delete comics")
    
    ok = delete_comic(comic_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Comic not found")
    return {"ok": True}


@app.get("/api/dashboard/summary")
def dashboard_summary() -> dict:
    comics = list_comics()
    status_counts = Counter(c.get("status", "unknown") for c in comics)
    type_counts = Counter(c.get("type", "unknown") for c in comics)
    site = get_all_site()
    team_count = len(site.get("about", {}).get("teamSection", {}).get("members", []))
    return {
        "counts": {
            "comics": len(comics),
            "teamMembers": team_count,
            "pages": 5,
            "siteConfigured": bool(site.get("settings", {}).get("siteName")),
        },
        "comicsByStatus": status_counts,
        "comicsByType": type_counts,
    }





@app.post("/api/auth/login", response_model=AuthResponse)
def login(payload: LoginPayload) -> AuthResponse:
    user = get_user_by_email(payload.email.strip().lower())
    if user is None or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not is_admin_user(user):
        raise HTTPException(status_code=403, detail="Only admin users can login")
    token = secrets.token_urlsafe(32)
    save_user_token(user["id"], token)
    user_out = UserOut(id=user["id"], name=user["name"], email=user["email"])
    return AuthResponse(token=token, user=user_out)


@app.get("/api/auth/me", response_model=UserOut)
def auth_me(authorization: str | None = Header(default=None)) -> UserOut:
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return UserOut(id=user["id"], name=user["name"], email=user["email"])


@app.post("/api/auth/logout")
def auth_logout(authorization: str | None = Header(default=None)) -> dict[str, bool]:
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    save_user_token(user["id"], None)
    return {"ok": True}



