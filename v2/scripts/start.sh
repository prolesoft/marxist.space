#!/usr/bin/env bash
set -e

if ! hash docker-compose 2>/dev/null; then
  echo 'Please install docker and docker-compose'
  exit 1
fi

COMPOSE_HTTP_TIMEOUT=120 docker-compose up --force-recreate
