#!/bin/bash

cd ~/bot
git pull origin main

cd ~/api
git pull origin main

cd ~/ym-api
git pull origin main

cd ~/deploy
docker-compose down || exit 1
sleep 5
docker-compose build --no-cache || exit 1
docker-compose up -d
sleep 10
docker builder prune -af
docker image prune -af #delete unuse images
docker container prune -f # Удаляет все остановленные контейнеры
docker volume prune -f # Удаляет все неиспользуемые тома
docker network prune -f # Удаляет все неиспользуемые сети
