FROM node:17

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD yarn start