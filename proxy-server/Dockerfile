FROM node:18.13.0 as builder
WORKDIR /server
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY .. .
EXPOSE 4000
CMD npm run start