FROM arm32v6/nginx:alpine
LABEL maintainer="Wouter De Schuyter <wouter.de.schuyter@gmail.com>"

RUN mkdir -p /code/public/images /code/public/videos
COPY ./.docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./build/index.html /code/public/index.html
COPY ./build/static /code/public/static

WORKDIR /code
