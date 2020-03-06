#!/bin/sh

source .env.local

# -it: Interactive mode, not just running a command  
# $DB_CONTAINER_NAME The containers name
# Shell env
docker exec \
  -it \
  $DB_CONTAINER_NAME \
  bash