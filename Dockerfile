FROM node:16-alpine3.15

WORKDIR /HEX-TEAM

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm i

CMD [ "npm", "start" ]