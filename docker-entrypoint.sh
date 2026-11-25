#!/bin/sh
set -e
export DATABASE_URL="${DATABASE_URL:-file:/app/data/bk-media-house.db}"
export AUTH_SECRET="${AUTH_SECRET:-build-only-secret-that-is-at-least-32-characters}"
mkdir -p /app/data
npx prisma migrate deploy
npx prisma db seed
exec node server.js
