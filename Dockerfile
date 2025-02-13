FROM node:17-alpine

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN chmod +x docker-app-entrypoint.sh  
ENTRYPOINT ./docker-app-entrypoint.sh