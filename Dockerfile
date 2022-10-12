FROM node:16 as base

WORKDIR /home/

COPY package*.json ./

RUN npm i

COPY . .