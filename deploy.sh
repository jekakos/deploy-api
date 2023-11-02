#!/bin/bash

cd ~/bot
git pull origin main

cd ~/api
git pull origin main

cd ~/ym-api
git pull origin main

cd ~/deploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d
docker image prune -af #delete unuse images
docker container prune -f # Удаляет все остановленные контейнеры
docker volume prune -f # Удаляет все неиспользуемые тома
docker network prune -f # Удаляет все неиспользуемые сети