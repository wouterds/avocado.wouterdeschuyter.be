FROM arm32v6/node:9-alpine
LABEL maintainer="Wouter De Schuyter <wouter.de.schuyter@gmail.com>"

# Dependencies
RUN apk add --no-cache ffmpeg

# Workdir
WORKDIR /code

# Copy resources
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json
COPY ./.babelrc ./.babelrc
COPY ./src ./src
COPY ./.docker/node/crons ./crons

# Enable crontab
RUN crontab ./crons

# Start cron deamon in foreground as main process
CMD ["crond", "-f"]
