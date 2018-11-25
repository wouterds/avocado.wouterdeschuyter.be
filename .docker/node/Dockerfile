FROM arm32v6/node:9-alpine
LABEL maintainer="Wouter De Schuyter <wouter.de.schuyter@gmail.com>"

RUN apk add --no-cache ffmpeg

COPY ./node_modules /code/node_modules
COPY ./package.json /code/package.json
COPY ./.babelrc /code/.babelrc
COPY ./src /code/src

WORKDIR /code

CMD ["npm", "start"]
