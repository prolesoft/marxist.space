#!/usr/bin/env bash
set -e

version=$(git describe --exact 2>/dev/null || git rev-parse --short=10 HEAD)
docker build -t marxist.space:$version -f scripts/deployment/Dockerfile .
