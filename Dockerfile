FROM node:16.9.1-alpine

WORKDIR /tmp/
COPY . /tmp

#EXPOSE 10000

RUN npm i

CMD [ "npm", "run", "app" ]
#CMD [ "nodemon", "-L", "src/index.js" ]