#!/usr/bin/env sh
set -e

cd server && npm run build
cd ..
cd client && npm run build
