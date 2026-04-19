# Forever Young

Проект развертывается по той же схеме, что и `tochka`:

- один hostname: `APP_DOMAIN`
- mini app доступен по `${APP_BASE_PATH}`
- admin panel доступна по `${ADMIN_BASE_PATH}`
- backend API доступен по `${API_BASE_PATH}`
- внешний `gateway` подключается к общей Docker-сети `GATEWAY_NETWORK`

Для production используется домен `forever.etalonfood.com` и маршруты в `gateway/config/routes.yml`:

```yaml
- host: forever.etalonfood.com
  routes:
    - path: /app
      upstream: http://forever-frontend:80
    - path: /admin
      upstream: http://forever-admin:80
    - path: /api
      upstream: http://forever-backend:8000
      strip_prefix: false
```

## Структура

```text
.
├── admin-panel
├── backend
├── frontend
├── scripts
├── .env
├── .env.example
├── docker-compose.yml
├── docker-compose.local.yml
└── README.md
```

## Переменные окружения

Создайте `.env`, если его еще нет:

```bash
cp .env.example .env
```

Ключевые переменные:

```env
POSTGRES_DB=forever
POSTGRES_USER=forever
POSTGRES_PASSWORD=forever
APP_DOMAIN=forever.etalonfood.com
APP_BASE_PATH=/app
ADMIN_BASE_PATH=/admin
API_BASE_PATH=/api
CORS_ORIGINS=https://forever.etalonfood.com
GATEWAY_NETWORK=gateway-net
GUNICORN_WORKERS=4
GUNICORN_TIMEOUT=60
```

Важно:

- `GATEWAY_NETWORK` задает имя внешней Docker-сети, в которую должны быть подключены и `gateway`, и сервисы `forever`
- по умолчанию используется `gateway-net`
- backend ожидает API с префиксом `/api`, поэтому для маршрута `/api` в gateway обязательно `strip_prefix: false`

## Production

Запуск на сервере:

```bash
./scripts/prod-up.sh
```

Скрипт:

- читает `GATEWAY_NETWORK` из `.env`
- при необходимости создает внешнюю Docker-сеть
- запускает `postgres`, `backend`, `frontend`, `admin-panel`

После запуска сервисы доступны для gateway по именам:

- `http://forever-frontend:80`
- `http://forever-admin:80`
- `http://forever-backend:8000`

Остановка:

```bash
./scripts/prod-stop.sh
```

## Локальная разработка

Локальный запуск без gateway:

```bash
./scripts/local-dev.sh
```

Будут доступны:

- mini app: `http://127.0.0.1:3000/`
- admin panel: `http://127.0.0.1:3001/`
- backend API: `http://127.0.0.1:8000/api/`
- healthcheck: `http://127.0.0.1:8000/health`

Локальный override `docker-compose.local.yml`:

- публикует backend на `127.0.0.1:8000`
- пересобирает frontend/admin с прямым API `http://127.0.0.1:8000/api`
- собирает SPA с base path `/`, чтобы локально не требовались `/app` и `/admin`

Остановка локальных сервисов:

```bash
./scripts/local-dev-stop.sh
```

## Docker Compose

Основной `docker-compose.yml` предназначен для production-схемы с gateway:

- `frontend` и `admin-panel` собираются как nginx-контейнеры со статикой внутри
- backend не публикует порт наружу, а доступен gateway через external-сеть
- `frontend` имеет alias `forever-frontend`
- `admin-panel` имеет alias `forever-admin`
- `backend` имеет alias `forever-backend`

Локальный `docker-compose.local.yml` только переопределяет нужное для дев-режима.

## Замечания

- старый сценарий с host nginx и отдельными доменами `app-demo`, `admin-demo`, `api-demo` больше не является актуальным для этого проекта
- файл `nginx/nginx.conf` можно рассматривать как legacy-конфигурацию, текущий production-путь идет через общий проект `gateway`
