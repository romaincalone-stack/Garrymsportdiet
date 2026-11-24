#!/usr/bin/env bash
# Développement seulement : vide la base, réapplique les migrations et le contenu fictif.
set -euo pipefail
[ "${NODE_ENV:-}" = "production" ] && { echo "refusé en production"; exit 1; }
psql "$DATABASE_URL" -q -c "drop schema public cascade; create schema public;"
node "$(dirname "$0")/migrate.mjs"
node "$(dirname "$0")/seed.mjs" --demo
