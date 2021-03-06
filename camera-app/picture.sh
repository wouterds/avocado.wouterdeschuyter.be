#!/bin/bash

# Make sure this script also runs from cron
cd "$(dirname "$0")"

# Dynamic file name
FILE=`date '+%s'`.jpg
FILE_PATH=./images/$FILE

# Take picture
fswebcam -c ./webcam.conf $FILE_PATH

# Copy to webserver pi
rsync --ignore-existing --recursive ./images/* pi@server01.wouterdeschuyter.be:~/docker/sites/be.wouterdeschuyter.avocado/images

# Make sure it's cached by cloudflare already
curl -I https://avocado.wouterdeschuyter.be/images/$FILE
