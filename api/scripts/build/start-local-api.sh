#!/bin/sh
source .env.local

printf "\n\nStarting API"
printf "\n\n"
sam local start-api \
  -p 5000 \
  -t .aws-sam/build/template.yaml