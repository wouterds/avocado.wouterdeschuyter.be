#!/bin/bash

# Make sure this script also runs from cron
cd "$(dirname "$0")"

# Dynamic file name
FILE=./images/`date '+%Y%m%d%H%M'`.jpg

# Take picture
fswebcam -c ./webcam.conf $FILE

# Display on TFT screen
sudo fbi -T 2 -d /dev/fb1 -noverbose -a $FILE

# Copy to webserver pi
rsync --ignore-existing --recursive ./images/* pi@server01.wouterdeschuyter.be:~/docker/sites/be.wouterdeschuyter.avocado/public/images
