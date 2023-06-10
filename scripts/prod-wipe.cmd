docker-compose -f devops/docker-compose.yml -p bot down --volumes
del /s /q data\prod
rmdir /s /q data\prod
