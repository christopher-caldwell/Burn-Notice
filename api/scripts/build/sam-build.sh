#!/bin/sh

Red="\033[0;31m"       # Red
BICyan="\033[1;96m"    # Bold Cyan
Color_Off="\033[0m"    # Text Reset

printf "\n\n$BICyan$( echo Building the latest artifact.. )$Color_Off"
printf "\n\n"

rm -r .aws-sam

npm run build:prod

if [ $? != 0 ]
  printf "\n\n$Red$( echo Build unsucessful.. )$Color_Off"
  exit 1
fi