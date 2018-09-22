# avocado.wouterdeschuyter.be

Simple app that takes a picture every 15 minutes of my future avocado plant using a [Raspberry Pi](https://www.raspberrypi.org/) & [a cheap webcam](https://www.ebay.com/itm/163188849225).

![Poster](resources/images/github-poster.png?raw=true)

### Setup

![Setup](resources/images/setup.jpg?raw=true)

### Example output

![Example Picture](resources/images/example.jpg?raw=true)

## Camera app

### Install dependencies

```bash
sudo apt-get install fswebcam fbi -y
```

```bash
wget https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/adafruit-pitft.sh
chmod +x adafruit-pitft.sh
sudo ./adafruit-pitft.sh
rm ./adafruit-pitft.sh
```

### Configure cron

Add this to crontab to take a picture every 15 minutes.

```bash
*/15 * * * * /home/pi/avocado.wouterdeschuyter.be/camera-app/picture.sh > /dev/null 2>&1
```
