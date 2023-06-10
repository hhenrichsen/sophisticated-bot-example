docker-compose -f devops/docker-compose-dev.yml -p bot exec bot npm run typeorm -- migration:generate -d datasource.js src/migrations/$@ 
