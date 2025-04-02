FROM --platform=linux/amd64 node:14-alpine as build
WORKDIR /app
COPY ./react/package.json ./
RUN npm install
COPY ./react ./
RUN npm run build

FROM --platform=linux/amd64 node:17-alpine
WORKDIR /app
COPY ./express/package.json ./
RUN npm install
COPY ./express ./
COPY --from=build /app/build /app/build
CMD ["npm","run","start"]