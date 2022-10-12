FROM node:14 as base

WORKDIR /home/

COPY package*.json ./

RUN npm i

COPY . .