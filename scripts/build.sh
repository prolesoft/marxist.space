#!/usr/bin/env sh
set -e

npm run build-db
cd client && npm run build
