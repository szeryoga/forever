# Forever Young Telegram Mini App MVP

Production-like local MVP for the "Forever Young" bar with a Telegram Mini App frontend, a separate admin panel, a FastAPI backend, and PostgreSQL. The project runs locally on Ubuntu with Docker Compose.

## Project Structure

```text
.
├── admin-panel
├── backend
├── frontend
├── references
├── .env.example
├── docker-compose.yml
└── README.md
```

## Services

- `frontend`: Telegram Mini App UI on `http://localhost:3000`
- `admin-panel`: admin CRUD UI on `http://localhost:3001`
- `backend`: FastAPI REST API on `http://localhost:8000`
- `postgres`: PostgreSQL 16 inside Docker on port `5432`

## Run

```bash
docker compose up --build
```

The stack works with built-in default environment values. If you want to override them, copy `.env.example` to `.env` and adjust the values.

## URLs

- Mini App frontend: `http://localhost:3000`
- Admin panel: `http://localhost:3001`
- Backend API docs: `http://localhost:8000/docs`
- Backend health: `http://localhost:8000/health`

## Backend API

Public endpoints for the mini app:

- `GET /api/public/settings`
- `GET /api/public/events`
- `GET /api/public/events/{id}`
- `GET /api/public/bar-items`
- `GET /api/public/profile-page`

Admin endpoints:

- `GET /api/admin/settings`
- `PUT /api/admin/settings/{key}`
- `GET /api/admin/events`
- `POST /api/admin/events`
- `GET /api/admin/events/{id}`
- `PUT /api/admin/events/{id}`
- `DELETE /api/admin/events/{id}`
- `GET /api/admin/bar-items`
- `POST /api/admin/bar-items`
- `GET /api/admin/bar-items/{id}`
- `PUT /api/admin/bar-items/{id}`
- `DELETE /api/admin/bar-items/{id}`

## Notes

- Database tables are created automatically on backend startup using `SQLAlchemy metadata.create_all()`.
- Alembic is intentionally not used yet.
- Seed data is loaded automatically on the first startup:
  - default page titles
  - multiple events
  - multiple bar items
- CORS is configured for local frontend and admin origins.
- The mini app reads Telegram WebApp user data when opened inside Telegram and falls back to demo data in local browser mode.
- All documentation and source comments are in English.
