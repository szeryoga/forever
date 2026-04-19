#!/usr/bin/env zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

GATEWAY_NETWORK_NAME="gateway-net"

if [[ -f .env ]]; then
  GATEWAY_NETWORK_FROM_ENV="$(grep -E '^GATEWAY_NETWORK=' .env | tail -n 1 | cut -d'=' -f2- || true)"
  if [[ -n "${GATEWAY_NETWORK_FROM_ENV}" ]]; then
    GATEWAY_NETWORK_NAME="${GATEWAY_NETWORK_FROM_ENV}"
  fi
fi

if ! docker network inspect "$GATEWAY_NETWORK_NAME" >/dev/null 2>&1; then
  echo "Creating external gateway network: $GATEWAY_NETWORK_NAME"
  docker network create "$GATEWAY_NETWORK_NAME" >/dev/null
fi

docker compose up -d --build postgres backend frontend admin-panel

cat <<EOF

Production services started:
  backend:    forever-backend:8000
  frontend:   forever-frontend:80
  admin:      forever-admin:80
  postgres:   internal only

Gateway network:
  ${GATEWAY_NETWORK_NAME}

Gateway upstream names:
  http://forever-frontend:80
  http://forever-admin:80
  http://forever-backend:8000
EOF
