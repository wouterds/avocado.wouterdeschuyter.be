//@flow
import fs from 'fs-extra';
import { subHours, format, isBefore, isAfter, subDays } from 'date-fns';
import { sumBy } from 'lodash';
import md5 from 'md5';
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

class Server {
  images: Array<{
    path: string,
    size: number,
    date: Date,
  }>;

  constructor() {
    this.loadImages();
    this.generateVideos();
  }

  loadImages() {
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

  generateVideos = () => {
    // Last 24 hours - delayed one minute
    setTimeout(
      () =>
        this.generateVideo(subHours(new Date(), 24), new Date(), 'LAST-DAY'),
      1 * 60 * 1000,
    );

    // Last week - delayed 2 minutes
    setTimeout(
      () => this.generateVideo(subDays(new Date(), 7), new Date(), 'LAST-WEEK'),
      2 * 60 * 1000,
    );

    // Last month - delayed 5 minutes
    setTimeout(
      () =>
        this.generateVideo(subDays(new Date(), 30), new Date(), 'LAST-MONTH'),
      5 * 60 * 1000,
    );

    // All time - delayed 10 minutes
    setTimeout(
      () => this.generateVideo(this.images[0].date, new Date(), 'ALL-TIME'),
      10 * 60 * 1000,
    );

    // Generate again in one hour
    setTimeout(this.generateVideos, 1000 * 60 * 60);
  };

  generateVideo = async (from: Date, to: Date, name: string) => {
    const tmpFolder = `/tmp/${md5(name)}`;
    const extension = 'mp4';
    const file = `videos/${name}.${extension}`;
    const tempFile = `${file.split(`.${extension}`)[0]}.temp.mp4`;

    let i = 0;
    const images = this.images
      .filter(image => isAfter(image.date, from))
      .filter(image => isBefore(image.date, to))
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
          from,
          'MMM Do, YYYY HH:MM',
        )} - ${format(to, 'MMM Do, YYYY HH:MM')}`,
      );
    });
    command.on('error', e => {
      console.error(e);
      fs.emptyDir(tmpFolder);
    });
    command.on('end', () => {
      console.log(`Finished generating ${tempFile}`);
      fs.emptyDirSync(tmpFolder);
      fs.moveSync(tempFile, file, { overwrite: true });
    });

    command.save(tempFile);
  };
}

new Server();
