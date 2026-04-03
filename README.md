# Forever Young Deployment With Host Nginx

## Endpoints

- Mini App: `https://app-demo.etalonfood.com:9091`
- Admin panel: `https://admin-demo.etalonfood.com:9092`
- API: `https://api-demo.etalonfood.com:9000`
- API health: `https://api-demo.etalonfood.com:9000/health`
- API docs: `https://api-demo.etalonfood.com:9000/docs`

## Architecture

- host `nginx` serves static files for frontend and admin-panel
- host `nginx` proxies API requests to backend on `127.0.0.1:9000`
- Docker runs only:
  - `forever-backend`
  - `forever-postgres`
  - `forever-frontend`
  - `forever-admin-panel`

`forever-frontend` and `forever-admin-panel` are one-shot builder containers. They build static files and exit with code `0`.

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
├── deploy
│   ├── admin
│   └── frontend
├── frontend
├── nginx
│   └── nginx.conf
├── .env.example
├── docker-compose.yml
└── README.md
```

## .env

Create `.env`:

```bash
cp .env.example .env
```

Example:

```env
POSTGRES_DB=forever
POSTGRES_USER=forever
POSTGRES_PASSWORD=change_me
BACKEND_BIND_PORT=19000
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

## Docker Deploy

Build and start containers:

```bash
docker compose up --build -d
```

This does three things:

- starts PostgreSQL
- starts backend on `127.0.0.1:19000`
- builds frontend into `./deploy/frontend`
- builds admin-panel into `./deploy/admin`

## Host Nginx

Use [nginx/nginx.conf](/home/szeryoga/devel/forever/nginx/nginx.conf) as the host nginx site config template.

Before enabling it, replace:

```text
/path/to/forever/deploy/frontend
/path/to/forever/deploy/admin
```

with the real absolute path to this repo on the server, for example:

```text
/home/karabas/devel/forever/deploy/frontend
/home/karabas/devel/forever/deploy/admin
```

If you change `BACKEND_BIND_PORT`, also update the API upstream in host nginx:

```nginx
proxy_pass http://127.0.0.1:19000;
```

Then install the config into host nginx, for example:

```bash
sudo cp nginx/nginx.conf /etc/nginx/conf.d/forever.conf
```

Test config:

```bash
sudo nginx -t
```

Reload host nginx:

```bash
sudo systemctl reload nginx
```

## Certificates

Host nginx expects these certificate files to already exist:

- `/etc/letsencrypt/live/app-demo.etalonfood.com/fullchain.pem`
- `/etc/letsencrypt/live/app-demo.etalonfood.com/privkey.pem`
- `/etc/letsencrypt/live/admin-demo.etalonfood.com/fullchain.pem`
- `/etc/letsencrypt/live/admin-demo.etalonfood.com/privkey.pem`
- `/etc/letsencrypt/live/api-demo.etalonfood.com/fullchain.pem`
- `/etc/letsencrypt/live/api-demo.etalonfood.com/privkey.pem`

Issue certificates on the host with certbot:

```bash
sudo certbot certonly --nginx \
  -d app-demo.etalonfood.com \
  -d admin-demo.etalonfood.com \
  -d api-demo.etalonfood.com
```

If your host nginx config is not active yet, use:

```bash
sudo certbot certonly --standalone \
  -d app-demo.etalonfood.com \
  -d admin-demo.etalonfood.com \
  -d api-demo.etalonfood.com
```

## Operations

Rebuild everything:

```bash
docker compose up --build -d
```

Restart backend only:

```bash
docker compose up --build -d backend
```

Refresh static builds only:

```bash
docker compose up --build -d frontend-builder admin-builder
sudo systemctl reload nginx
```

Stop containers:

```bash
docker compose down
```

Show logs:

```bash
docker compose logs -f backend postgres
```

## Notes

- Host nginx owns the public ports and TLS termination.
- Docker does not run nginx anymore.
- Backend is exposed only on `127.0.0.1:19000` by default.
- Frontend and admin-panel are static builds written into `./deploy/frontend` and `./deploy/admin`.
