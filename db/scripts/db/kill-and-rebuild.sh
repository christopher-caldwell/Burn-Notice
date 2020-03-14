#!/bin/sh

source .env.local

docker container kill $DB_CONTAINER_NAME

sh scripts/db/build-container.sh

sh scripts/db/run-container.sh

# Waiting for the db in the container to start
sleep 4

sh scripts/db/setup-db.sh

sh scripts/db/seed-db.sh