FROM node:21-alpine3.17

COPY ["./calendar_memo/package.json", "./calendar_memo/package-lock.json", "./"]

RUN npm install

COPY . .