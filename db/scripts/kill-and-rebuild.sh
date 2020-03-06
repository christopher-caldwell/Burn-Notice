#!/bin/sh

source .env.local

docker container kill postgres_test

sh scripts/build-container.sh

sh scripts/run-container.sh

sleep 2

sh scripts/setup-db.sh

sh scripts/seed-db.sh