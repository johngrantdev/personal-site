#!/bin/bash

set -eu

ENV_FILE="${1:-.env}"

# Check if the .env file exists before running
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE file not found"
    echo "Usage: $0 [env-file]"
    exit 1
fi

docker build --secret "id=build_env,src=$ENV_FILE" -f apps/cms/Dockerfile -t personal-site-cms:latest .
docker build --secret "id=build_env,src=$ENV_FILE" -f apps/web/Dockerfile -t personal-site-web:latest .
