#!/bin/sh
rm -r .aws-sam

concurrently \
	"webpack-cli --config webpack.dev.js -w" \
	"wait-on .aws-sam/ && sam local start-api -p 5000 -t .aws-sam/build/template.yaml --env-vars localEnv.json"