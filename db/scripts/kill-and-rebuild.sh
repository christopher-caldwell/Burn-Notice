#!/bin/sh

source .env.local

docker container kill postgres_test

sh scripts/build-container.sh

sh scripts/run-container.sh

# Waiting for the db in the container to start
sleep 4

sh scripts/setup-db.sh

sh scripts/seed-db.sh