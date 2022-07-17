FROM node:16-alpine

WORKDIR /usr/src/app

RUN npm install --location=global --force yarn

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]