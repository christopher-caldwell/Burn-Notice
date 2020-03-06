#!/bin/sh

source .env.local

docker build -t $DB_IMAGE_NAME .