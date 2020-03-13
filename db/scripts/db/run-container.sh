#!/bin/sh

source .env.local

# -p: Expose the containers port to your own localhost
# -e: Environmnet variables
# -d: Detached mode, put it in the background
# -v: Persist a volume to the container - not entirely sure how that works
# --rm Remove the container ( if present ) and re-run it

docker run \
  --name $DB_CONTAINER_NAME \
  --rm \
  -p 5432:$DB_PORT \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_DB=$DB_NAME \
  -d \
  $DB_IMAGE_NAME