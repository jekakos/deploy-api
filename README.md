# Авторизация

cd ..
ssh -i "key.pem" ec2-user@13.51.69.12

# Update deploy service

cd mlc/deploy
git pull origin main
pm2 restart deploy-service

# Mnual deploy

Use Postman to run request

http://13.51.69.12:3001/manual-deploy

# Скопировать файл на EC2

scp -i key.pem docker-compose.yml ec2-user@13.51.69.12:~
scp -i key.pem deploy.sh ec2-user@13.51.69.12:~

chmod +x ~/mlc/deploy/deploy.sh
