FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
CMD ["npm","run","start"]