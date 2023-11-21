FROM node:21-alpine3.17

COPY ["/calender_memo/package.json", "/calender_memo/package-lock.json", "./"]

RUN npm install

COPY . .