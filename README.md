# avocado.wouterdeschuyter.be

![Tag)](https://img.shields.io/github/tag/wouterds/avocado.wouterdeschuyter.be.svg)
![Code Size](https://img.shields.io/github/languages/code-size/wouterds/avocado.wouterdeschuyter.be.svg)
![Last Commit](https://img.shields.io/github/last-commit/wouterds/avocado.wouterdeschuyter.be.svg)
![CircleCI](https://circleci.com/gh/wouterds/avocado.wouterdeschuyter.be.svg?style=shield)
![Dependencies](https://img.shields.io/david/wouterds/avocado.wouterdeschuyter.be.svg)

Simple app that takes a picture every 5 minutes of my future avocado plant using a [Raspberry Pi](https://www.raspberrypi.org/) & [a cheap webcam](https://www.ebay.com/itm/163188849225).

![Poster](resources/images/github-poster.png?raw=true)

### Example setup

<p align="center">
<img src="resources/images/setup-1.jpg?raw=true" width="296" alt="setup" />
<img src="resources/images/setup-2.jpg?raw=true" width="296" alt="setup" />
<img src="resources/images/setup-3.jpg?raw=true" width="296" alt="setup" />
</p>

### Example output

![Example Picture](resources/images/example.jpg?raw=true)

## Camera app

### Install dependencies

```bash
sudo apt-get update
sudo apt-get install fswebcam -y
```

### Configure cron

Add this to crontab to take a picture every 5 minutes.

```bash
*/5 * * * * /home/pi/avocado.wouterdeschuyter.be/camera-app/picture.sh > /dev/null 2>&1
```

## Web app

### Setup

```shell
npm install
```

#### VSCode

```json
{
  "flow.useNPMPackagedFlow": true,
  "javascript.validate.enable": false,
  "eslint.autoFixOnSave": true,
}
```

### Development

```shell
npm run dev
```

### Building

```shell
make build
```
