#!/bin/sh

source .env.local

node scripts/seeder/createSeedData.js

aws dynamodb batch-write-item \
    --request-items file://scripts/seeder/testQuestions.json \
 		--endpoint-url http://localhost:8000