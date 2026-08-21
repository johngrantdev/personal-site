#!/bin/bash

# Exit if docker build exits with a non-zero status
set -e

IMAGE_NAME="personal-site"
ENV_FILE="${1:-.env}"

# Check if the .env file exists before running
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE file not found!"
    echo "Usage: $0 [env-file]"
    exit 1
fi

echo "🚀 Building Docker image '$IMAGE_NAME' using BuildKit secrets from '$ENV_FILE'..."

# Execute the docker build
docker build \
  --secret id=build_env,src=$ENV_FILE \
  -t $IMAGE_NAME .

echo "✅ Build complete! Image tagged as '$IMAGE_NAME'"
