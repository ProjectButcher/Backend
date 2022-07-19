FROM node:16-alpine

WORKDIR /usr/src/app

RUN npm install --location=global --force yarn

COPY package*.json ./
COPY .env ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]