# Forever Young Production Deployment

## Stack

- `nginx` serves the Telegram Mini App and admin panel static bundles
- `backend` runs FastAPI behind `gunicorn` + `uvicorn` workers
- `postgres` stores application data
- `frontend-builder` builds `frontend/dist`
- `admin-builder` builds `admin-panel/dist`

## URLs

- Mini App: `http://SERVER_IP/`
- Admin panel: `http://SERVER_IP/admin/`
- API: `http://SERVER_IP/api/`
- Health: `http://SERVER_IP/health`

For Telegram Mini App production use a real HTTPS domain instead of `SERVER_IP`.

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

4. Edit `.env` and set:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `BACKEND_CORS_ORIGINS`

Example:

```env
POSTGRES_DB=forever
POSTGRES_USER=forever
POSTGRES_PASSWORD=change_me
NGINX_PORT=80
BACKEND_CORS_ORIGINS=https://miniapp.example.com
GUNICORN_WORKERS=4
GUNICORN_TIMEOUT=60
```

5. Build and start the stack:

```bash
docker compose up --build -d
```

## Access

- `http://SERVER_IP/`
- `http://SERVER_IP/admin/`

If you configure DNS:

- `https://miniapp.example.com/`
- `https://miniapp.example.com/admin/`

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

Recommended production flow:

1. Point your domain A record to the server IP.
2. Open ports `80` and `443` in the server firewall.
3. Start the stack on port `80`.
4. Install Certbot on Ubuntu:

```bash
sudo apt update
sudo apt install -y certbot
```

5. Stop nginx container temporarily:

```bash
docker compose stop nginx
```

6. Issue certificate:

```bash
sudo certbot certonly --standalone -d miniapp.example.com
```

7. Mount certificates into the nginx container and add an HTTPS server block.
8. Configure Telegram Mini App to use the HTTPS domain.

Certificate files are usually placed in:

```text
/etc/letsencrypt/live/miniapp.example.com/
```

## Notes

- Vite dev server is not used anywhere in this setup.
- `frontend` and `admin-panel` are built into static files only.
- `nginx` serves static files and proxies `/api` to `backend:8000`.
- `postgres` is internal only and is not exposed to the public network.
- Backend tables and seed data are initialized automatically on startup.
