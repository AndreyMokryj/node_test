FROM node:16.9.1-alpine

WORKDIR /tmp/
COPY . /tmp

RUN apk add --no-cache tesseract-ocr
RUN npm i

CMD [ "npx", "concurrently", "\"npm:app\"", "\"npm:worker\""]