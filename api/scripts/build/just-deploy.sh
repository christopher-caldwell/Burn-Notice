#!/bin/sh

Red="\033[0;31m"       # Red
Green="\033[0;32m"     # Green
BICyan="\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\033[0m"    # Text Reset

printf "\n\n$BICyan$( echo Deploying the latest artifact to the $STAGE bucket.. )$Color_Off"
printf "\n\n"

sam deploy \
  --template-file build/.$STAGE-template.yaml \
  --no-fail-on-empty-changeset \
  --stack-name $STAGE-safd \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
			Stage=$STAGE \
			CorsUrl=$CORS_URL \
			S3Bucket=$S3_BUCKET \
			TokenDuration=$TOKEN_DURATION \
			SigningKeyName=$SIGNING_KEY_NAME \
			SecretName=$SECRET_NAME \
			ApiName=$API_NAME \
			DatabaseClient=$DB_CLIENT \
			DatabaseHost=$DB_HOST \
			DatabasePort=$DB_PORT \
			DatabaseUser=$DB_USER \
			DatabasePassword=$DB_PASSWORD \
			DatabaseName=$DB_NAME


if [ $? == 0 ]
then
  printf "\n\n$Green$( echo Successful deployment.. )$Color_Off"
  printf "\n\n"
else
  printf "\n\n$Red$( echo Unsuccessful deployment.. )$Color_Off"
  printf "\n\n"
  exit 1
fi