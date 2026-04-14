# Lanart FastAPI Backend

FastAPI + SQLite backend for the existing Lanart frontend.

## Deployed links

- Backend docs: `https://laranat21-project.onrender.com/docs`
- Backend base URL: `https://laranat21-project.onrender.com`
- Frontend: `https://lanart.netlify.app/`

## Features

- `GET /api/health`
- `GET /api/site`
- `GET /api/site/{section}`
- `PUT /api/site/{section}`
- `GET /api/comics`
- `GET /api/comics/{comic_id}`
- `POST /api/comics`
- `PUT /api/comics/{comic_id}`
- `DELETE /api/comics/{comic_id}`
- `GET /api/dashboard/summary`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

## Default admin credentials

- email: `admin@lanart21.com`
- password: `Larnat@21`

> Admins can login via `POST /api/auth/login` and use the returned bearer token to access dashboard and site editing endpoints.

## Run


```bash
cd lanart_api
python -m venv .venv
.venv\Scripts\activate
source .venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Docs URL: `http://127.0.0.1:8000/docs#/`

Backend base URL: `http://127.0.0.1:8000`

## Render start command

Use this start command on Render:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

