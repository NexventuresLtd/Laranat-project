from __future__ import annotations

import hashlib
import json
import sqlite3
from pathlib import Path
from typing import Any

try:
    from .seed_data import DEFAULT_SITE_SECTIONS, SAMPLE_COMICS
except ImportError:
    from seed_data import DEFAULT_SITE_SECTIONS, SAMPLE_COMICS

ROOT = Path(__file__).resolve().parent.parent
DB_DIR = ROOT / "data"
DB_PATH = DB_DIR / "lanart.db"
PASSWORD_SALT = "lanart_salt_v1"
DEFAULT_ADMIN = {
    "name": "Lanart Admin",
    "email": "admin@lanart21.com",
    "password": "Larnat@21",
}


def _hash_password(raw_password: str) -> str:
    return hashlib.sha256(f"{PASSWORD_SALT}:{raw_password}".encode("utf-8")).hexdigest()


def get_conn() -> sqlite3.Connection:
    DB_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS site_content (
            section TEXT PRIMARY KEY,
            payload TEXT NOT NULL,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS comics (
            id TEXT PRIMARY KEY,
            payload TEXT NOT NULL,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            auth_token TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    _seed_if_empty(conn)
    conn.close()


def _seed_if_empty(conn: sqlite3.Connection) -> None:
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) AS c FROM site_content")
    if cur.fetchone()["c"] == 0:
        for section, payload in DEFAULT_SITE_SECTIONS.items():
            cur.execute(
                "INSERT INTO site_content(section, payload) VALUES(?, ?)",
                (section, json.dumps(payload)),
            )

    cur.execute("SELECT COUNT(*) AS c FROM comics")
    if cur.fetchone()["c"] == 0:
        for comic in SAMPLE_COMICS:
            cur.execute(
                "INSERT INTO comics(id, payload) VALUES(?, ?)",
                (comic["id"], json.dumps(comic)),
            )

    cur.execute("SELECT COUNT(*) AS c FROM users")
    if cur.fetchone()["c"] == 0:
        cur.execute(
            "INSERT INTO users(name, email, password_hash) VALUES(?, ?, ?)",
            (
                DEFAULT_ADMIN["name"],
                DEFAULT_ADMIN["email"],
                _hash_password(DEFAULT_ADMIN["password"]),
            ),
        )
    else:
        cur.execute("SELECT 1 FROM users WHERE email = ?", (DEFAULT_ADMIN["email"].lower(),))
        if cur.fetchone() is None:
            cur.execute(
                "INSERT INTO users(name, email, password_hash) VALUES(?, ?, ?)",
                (
                    DEFAULT_ADMIN["name"],
                    DEFAULT_ADMIN["email"].lower(),
                    _hash_password(DEFAULT_ADMIN["password"]),
                ),
            )
    conn.commit()


def get_site_section(section: str) -> dict[str, Any] | None:
    conn = get_conn()
    row = conn.execute("SELECT payload FROM site_content WHERE section = ?", (section,)).fetchone()
    conn.close()
    if not row:
        return None
    return json.loads(row["payload"])


def get_all_site() -> dict[str, Any]:
    conn = get_conn()
    rows = conn.execute("SELECT section, payload FROM site_content").fetchall()
    conn.close()
    return {row["section"]: json.loads(row["payload"]) for row in rows}


def upsert_site_section(section: str, payload: dict[str, Any]) -> None:
    conn = get_conn()
    conn.execute(
        """
        INSERT INTO site_content(section, payload, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(section) DO UPDATE SET
            payload = excluded.payload,
            updated_at = CURRENT_TIMESTAMP
        """,
        (section, json.dumps(payload)),
    )
    conn.commit()
    conn.close()


def list_comics() -> list[dict[str, Any]]:
    conn = get_conn()
    rows = conn.execute("SELECT payload FROM comics ORDER BY CAST(id as INTEGER) ASC, id ASC").fetchall()
    conn.close()
    return [json.loads(r["payload"]) for r in rows]


def get_comic(comic_id: str) -> dict[str, Any] | None:
    conn = get_conn()
    row = conn.execute("SELECT payload FROM comics WHERE id = ?", (comic_id,)).fetchone()
    conn.close()
    if not row:
        return None
    return json.loads(row["payload"])


def upsert_comic(comic: dict[str, Any]) -> None:
    conn = get_conn()
    conn.execute(
        """
        INSERT INTO comics(id, payload, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
            payload = excluded.payload,
            updated_at = CURRENT_TIMESTAMP
        """,
        (comic["id"], json.dumps(comic)),
    )
    conn.commit()
    conn.close()


def delete_comic(comic_id: str) -> bool:
    conn = get_conn()
    cur = conn.execute("DELETE FROM comics WHERE id = ?", (comic_id,))
    conn.commit()
    conn.close()
    return cur.rowcount > 0


def create_user(name: str, email: str, password_hash: str) -> bool:
    conn = get_conn()
    try:
        conn.execute(
            "INSERT INTO users(name, email, password_hash) VALUES(?, ?, ?)",
            (name, email.lower(), password_hash),
        )
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()


def get_user_by_email(email: str) -> dict[str, Any] | None:
    conn = get_conn()
    row = conn.execute(
        "SELECT id, name, email, password_hash, auth_token FROM users WHERE email = ?",
        (email.lower(),),
    ).fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


def get_user_by_token(token: str) -> dict[str, Any] | None:
    conn = get_conn()
    row = conn.execute(
        "SELECT id, name, email FROM users WHERE auth_token = ?",
        (token,),
    ).fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


def save_user_token(user_id: int, token: str | None) -> None:
    conn = get_conn()
    conn.execute(
        "UPDATE users SET auth_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        (token, user_id),
    )
    conn.commit()
    conn.close()

