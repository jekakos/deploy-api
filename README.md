# Авторизация



# Скопировать файл на EC2

scp -i key.pem docker-compose.yml ec2-user@13.51.69.12:~
scp -i key.pem deploy.sh ec2-user@13.51.69.12:~

chmod +x ~/deploy/deploy.sh
