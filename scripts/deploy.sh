#!/bin/bash
# Run from repo root after git pull. Same-port: VITE_API_BASE_URL='' (default). Or set for separate API domain.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export VITE_API_BASE_URL="${VITE_API_BASE_URL:-}"

echo "Installing backend deps..."
(cd be && npm i)

echo "Installing frontend deps and building..."
(cd fe && npm i && npm run build)

echo "Restarting PM2..."
pm2 restart ecosystem.config.cjs --env production

echo "Done."
