#!/bin/bash

cd ~/mlc/bot
git pull origin main

cd ~/mlc/api
git pull origin main

cd ~/mlc/ym-api
git pull origin main

cd ~/mlc/deploy
docker-compose down || exit 1
sleep 10
docker builder prune -af
docker image prune -af #delete unuse images
docker container prune -f # Удаляет все остановленные контейнеры
docker volume prune -f # Удаляет все неиспользуемые тома
docker network prune -f # Удаляет все неиспользуемые сети
sleep 10
docker-compose build --no-cache || exit 1
docker-compose up -d
