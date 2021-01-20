FROM node:14.15.0

RUN npm i -g nodemon
EXPOSE ${APP_PORT}

CMD [ "npm", "test" ]