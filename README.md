# Battle Simulator API

# Note

Make sure you have mysql and redis up and running

- mysql for data storing and redis for Bull queue
- using Bull for processing multiple battles in parallel
- winston for logging
- socket.io for real time data transfer
- joi for backend validation
- app is listening on port 5000 by default

#### Commands with Docker

```
- create .env based on .env.example
- "docker-compose up --build" to start in docker
```

#### Commands without Docker

```
- create .env based on .env.example
- "yarn run sequelize-cli db:create" to create db
- "yarn dev" to start the app
```
