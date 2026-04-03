# Forever Young Production Deployment

## Endpoints

- Mini App local URL: `https://127.0.0.1:9091`
- Mini App DNS: `app-demo.etalonfood.com`
- Admin local URL: `https://127.0.0.1:9092`
- Admin DNS: `admin-demo.etalonfood.com`
- API local URL: `https://127.0.0.1:9000`
- API DNS: `api-demo.etalonfood.com`

Public URLs with DNS and ports:

- Mini App: `https://app-demo.etalonfood.com:9091`
- Admin panel: `https://admin-demo.etalonfood.com:9092`
- API: `https://api-demo.etalonfood.com:9000`
- API health: `https://api-demo.etalonfood.com:9000/health`
- API docs: `https://api-demo.etalonfood.com:9000/docs`

## Stack

- `nginx` serves the Mini App on port `9091`
- `nginx` serves the admin panel on port `9092`
- `nginx` proxies the API on port `9000`
- `backend` runs FastAPI behind `gunicorn` + `uvicorn` workers
- `postgres` stores application data
- `frontend-builder` builds `frontend/dist`
- `admin-builder` builds `admin-panel/dist`

## Container Names

- `forever-frontend`
- `forever-admin-panel`
- `forever-backend`
- `forever-postgres`

## Project Structure

```text
.
├── admin-panel
├── backend
├── frontend
├── nginx
│   └── nginx.conf
├── .env.example
├── docker-compose.yml
└── README.md
```

## Deploy On Ubuntu

1. Install Docker and Docker Compose plugin.
2. Clone the repository to the server.
3. Create environment file:

```bash
cp .env.example .env
```

4. Edit `.env` if needed.

Example:

```env
POSTGRES_DB=forever
POSTGRES_USER=forever
POSTGRES_PASSWORD=change_me
LETSENCRYPT_DIR=/etc/letsencrypt
APP_PORT=9091
ADMIN_PORT=9092
API_PORT=9000
APP_DOMAIN=app-demo.etalonfood.com
ADMIN_DOMAIN=admin-demo.etalonfood.com
API_DOMAIN=api-demo.etalonfood.com
VITE_API_BASE_URL=https://api-demo.etalonfood.com:9000
BACKEND_CORS_ORIGINS=https://app-demo.etalonfood.com:9091,https://admin-demo.etalonfood.com:9092
GUNICORN_WORKERS=4
GUNICORN_TIMEOUT=60
```

5. Build and start the stack:

```bash
docker compose up --build -d
```

## Access

- Mini App: `https://127.0.0.1:9091`
- Admin panel: `https://127.0.0.1:9092`
- API: `https://127.0.0.1:9000`

DNS-based access:

- `https://app-demo.etalonfood.com:9091`
- `https://admin-demo.etalonfood.com:9092`
- `https://api-demo.etalonfood.com:9000`

## Operations

Start or rebuild everything:

```bash
docker compose up --build -d
```

Restart services:

```bash
docker compose restart nginx backend
```

Stop services:

```bash
docker compose down
```

Stop services and remove volumes:

```bash
docker compose down -v
```

Show logs:

```bash
docker compose logs -f nginx backend postgres
```

## Update Frontend Or Admin Panel

After frontend or admin-panel code changes:

```bash
docker compose up --build -d frontend-builder admin-builder nginx
```

If backend code changed too:

```bash
docker compose up --build -d backend nginx
```

## SSL With Certbot

1. Point these DNS records to the server IP:

- `app-demo.etalonfood.com`
- `admin-demo.etalonfood.com`
- `api-demo.etalonfood.com`

2. Open port `80` temporarily for certificate issuance, plus `9091`, `9092`, and `9000` for the final HTTPS endpoints.
3. Install Certbot on Ubuntu:

```bash
sudo apt update
sudo apt install -y certbot
```

4. Stop nginx container temporarily:

```bash
docker compose stop nginx
```

5. Issue certificates:

```bash
sudo certbot certonly --standalone \
  -d app-demo.etalonfood.com \
  -d admin-demo.etalonfood.com \
  -d api-demo.etalonfood.com
```

6. Ensure `.env` contains:

```env
LETSENCRYPT_DIR=/etc/letsencrypt
VITE_API_BASE_URL=https://api-demo.etalonfood.com:9000
BACKEND_CORS_ORIGINS=https://app-demo.etalonfood.com:9091,https://admin-demo.etalonfood.com:9092
```

7. Start the stack:

```bash
docker compose up --build -d
```

8. Configure the Telegram Mini App to use `https://app-demo.etalonfood.com:9091`.

## Notes

- Vite dev server is not used anywhere in this setup.
- Frontend and admin panel are static builds only.
- Because app, admin, and API are now separate origins, both UIs use `VITE_API_BASE_URL`.
- `postgres` is internal only and is not exposed publicly.
- Backend tables and seed data are initialized automatically on startup.
- Nginx expects valid Let's Encrypt certificates under `/etc/letsencrypt/live/<domain>/`.
