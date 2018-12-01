#!./node_modules/.bin/babel-node
//@flow
import { usage, demandOption, argv } from 'yargs';
import fs from 'fs-extra';
import { format, isBefore, isAfter, getTime, parse } from 'date-fns';
import { sumBy } from 'lodash';
import ffmpeg from 'fluent-ffmpeg';

const dateFromPath = (image: string): Date => {
  return new Date(
    parseInt(
      image
        .split('/')
        .pop()
        .split('.')
        .shift(),
    ) * 1000,
  );
};

class GenerateVideo {
  from: Date;
  to: Date;
  images: Array<{
    path: string,
    size: number,
    date: Date,
  }>;

  constructor() {
    this.setupCli();
    this.loadImages();
    this.generate();
  }

  setupCli() {
    // Describe usage
    usage('Usage: $0 --from [date] --to [date]');

    // Required options
    demandOption(['from', 'to']);

    // Parse options
    this.from = parse(argv.from);
    this.to = parse(argv.to);
  }

  loadImages() {
    console.log('Loading images..');

    // Get images
    let images = fs.readdirSync('./images');

    // Remove files from array that are not images
    images = images.filter(image => image.indexOf('.jpg') !== -1);

    // Add full path
    images = images.map(image => `./images/${image}`);

    // Create image objects
    this.images = images.map(path => ({
      path,
      size: fs.statSync(path).size,
      date: dateFromPath(path),
    }));

    // Filter out images below average
    const averageSize = sumBy(this.images, 'size') / this.images.length;
    this.images = this.images.filter(image => image.size > averageSize);
  }

  generate = async () => {
    const name = `${Math.round(getTime(this.from) / 1000)}-${Math.round(
      getTime(this.to) / 1000,
    )}`;
    const extension = 'mp4';
    const tmpFolder = `/tmp/${name}`;
    const file = `videos/${name}.${extension}`;
    const tmpFile = `videos/${name}.temp.${extension}`;

    let i = 0;
    const images = this.images
      .filter(image => isAfter(image.date, this.from))
      .filter(image => isBefore(image.date, this.to))
      .map(image => {
        const path = `${tmpFolder}/${i++}.jpg`;

        fs.copySync(image.path, path);

        return path;
      });

    if (images.length === 0) {
      return;
    }

    const command = ffmpeg(`${tmpFolder}/%d.jpg`);
    command.fps(25);
    command.size('640x?');
    command.videoCodec('libx264');
    command.outputOption('-pix_fmt yuv420p');
    command.format('mp4');

    command.on('start', () => {
      console.log(
        `Generating video of ${images.length} images between ${format(
          this.from,
          'MMM Do, YYYY HH:MM',
        )} - ${format(this.to, 'MMM Do, YYYY HH:MM')}`,
      );
    });
    command.on('error', e => {
      console.error(e);
      fs.emptyDir(tmpFolder);
    });
    command.on('end', () => {
      console.log(`Finished generating ${tmpFile}`);
      fs.removeSync(tmpFolder);
      fs.moveSync(tmpFile, file, { overwrite: true });
    });

    command.save(tmpFile);
  };
}

new GenerateVideo();
