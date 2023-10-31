#!/bin/bash

cd ~/bot
git pull origin main

cd ~/api
git pull origin main

cd ~/ym-api
git pull origin main

cd ~/deploy
docker-compose down
docker-compose up -d