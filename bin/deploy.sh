#!/bin/bash
if [[ $1 = "prod" || $1 = "dev" ]] && [[ $2 = "down" || $2 = "up" ]]; then
  cd ..
  fileEnv="docker-compose.${1}.yaml"
  if [ "$2" == "up" ]; then
    echo "Running docker-compose -f docker-compose.yaml -f $fileEnv up -d --build"
    docker-compose -f docker-compose.yaml -f $fileEnv up -d --build
  else
    echo "Running docker-compose -f docker-compose.yaml -f $fileEnv down"
    docker-compose -f docker-compose.yaml -f $fileEnv down
  fi
else
  echo "Need to follow format ./deploy.sh prod|dev down|up"
fi