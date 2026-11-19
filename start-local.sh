#!/usr/bin/env bash
# Starts the CoverPilot mock API (port 8080) and the front end (port 5173).
# Usage:  ./start-local.sh      (stop with Ctrl+C)
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node 22 or newer from https://nodejs.org and try again."; exit 1
fi

# Use pnpm if present, otherwise fetch it on the fly (no global install needed).
if command -v pnpm >/dev/null 2>&1; then PNPM="pnpm"; else PNPM="npx --yes pnpm@10"; fi

echo "==> Installing dependencies"
$PNPM install

# Stop both servers when this script exits.
trap 'trap - EXIT INT TERM; kill 0' EXIT INT TERM

echo "==> Starting the mock API on http://localhost:8080"
PORT=8080 $PNPM --filter @workspace/api-server run dev &

for i in $(seq 1 60); do
  if curl -sf http://localhost:8080/api/healthz >/dev/null 2>&1; then break; fi
  sleep 1
done
if ! curl -sf http://localhost:8080/api/healthz >/dev/null 2>&1; then
  echo "The API did not start on port 8080. Is something else using that port?"; exit 1
fi

echo "==> Starting the front end on http://localhost:5173"
if command -v open >/dev/null 2>&1; then (sleep 4; open http://localhost:5173) & fi
PORT=5173 BASE_PATH=/ $PNPM --filter @workspace/insurance-hub run dev
