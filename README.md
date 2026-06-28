# Book Nook

A local React + FastAPI prototype for tracking reading, discovering communities, and exchanging books.

## Frontend

```bash
npm install
npm run dev
```

The Vite app runs at `http://localhost:5173`.

## Tester Home-Screen Installs

The frontend includes a web app manifest and service worker so testers can add Book Nook to their phone home screen.

- iOS Safari: Share -> Add to Home Screen.
- Android Chrome: Menu -> Install app or Add to Home screen.
- The profile sheet shows the active tester build.
- Installed testers should open the app after each deploy. If an update is available, Book Nook shows an update banner and reloads into the latest build.

## Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API runs at `http://localhost:8000`. The frontend defaults to that URL, or you can override it with `VITE_API_BASE_URL`.

## Current API Surface

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /me/export`
- `DELETE /me`
- `GET /bootstrap`
- `GET /books`
- `POST /books`
- `GET /listings`
- `POST /listings`
- `POST /listings/{listing_id}/offers`
- `POST /reports`
- `POST /recommendations`

Data is currently stored in memory so the app is easy to run locally without a database.

## Security Notes

The API has baseline local-dev protections for passwords, expiring sessions, rate limits, request size limits, CORS, trusted hosts, and security headers. See [SECURITY.md](SECURITY.md) before using real user data.

Common environment overrides:

```bash
set BOOKNOOK_ALLOWED_ORIGINS=http://localhost:5173
set BOOKNOOK_ALLOWED_HOSTS=localhost,127.0.0.1
set BOOKNOOK_SESSION_TTL_MINUTES=480
set BOOKNOOK_ENABLE_DOCS=1
```
