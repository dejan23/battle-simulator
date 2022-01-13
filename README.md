# Battle Simulator API

# Note

Make sure you have mysql and redis up and running

- mysql for data storing and redis for Bull queue
- using Bull for processing multiple battles in parallel
- winston for logging
- socket.io for real time data transfer
- zod for backend validation
- app is listening on port 5000 by default

#### Commands

```
- "yarn dev" to start without docker 
- "docker-compose up --build" to start in docker
```
