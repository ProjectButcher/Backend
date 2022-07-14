FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install --location=global --force yarn

RUN yarn install

CMD yarn dev