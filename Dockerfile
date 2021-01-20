FROM node:14.15.0

WORKDIR /usr/src/app

COPY . .
RUN npm i

EXPOSE ${APP_PORT}

CMD [ "npm", "start" ]