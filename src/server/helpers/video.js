//@flow
import path from 'path';
import fs from 'fs-extra';
import md5 from 'md5';
import { format, isBefore, isAfter } from 'date-fns';
import { sumBy } from 'lodash';
import ffmpeg from 'fluent-ffmpeg';

type Image = {
  path: string,
  size: number,
  date: Date,
};

const loadImages = (source: string, from: Date, to: Date): Image[] => {
  // Get files from images
  let files = fs.readdirSync(source);

  // Remove files that are not images
  files = files.filter(file => file.indexOf('.jpg') !== -1);

  // Add full path
  files = files.map(file => path.resolve(`./images/${file}`));

  // Create image objects from path
  let images: Image[] = files.map(path => ({
    path,
    size: fs.statSync(path).size,
    date: new Date(
      parseInt(
        path
          .split('/')
          .pop()
          .split('.')
          .shift(),
      ) * 1000,
    ),
  }));

  // Filter out images between dates
  images = images.filter(image => isAfter(image.date, from));
  images = images.filter(image => isBefore(image.date, to));

  // Calculate average image size
  const averageSize = sumBy(images, 'size') / images.length;

  // Strip images that are below average
  images = images.filter(image => image.size > averageSize);

  return images;
};

export const generate = (
  source: string,
  output: string,
  name: string,
  from: Date,
  to: Date,
) => {
  // Temporary folder
  const extension = 'mp4';
  const tmpFolder = `/tmp/${md5(name)}`;
  const tmpFile = `videos/${name}.temp.${extension}`;
  const file = `videos/${name}.${extension}`;

  let i = 0;
  const images = loadImages(source, from, to).map(image => {
    const tmpPath = path.resolve(`${tmpFolder}/${i++}.jpg`);

    // Copy to temp dir as incremental jpeg
    fs.copySync(image.path, tmpPath);

    return tmpPath;
  });

  // No images?
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
    console.log(`Finished generating ${tmpFile}`);
    fs.removeSync(tmpFolder);
    fs.moveSync(tmpFile, file, { overwrite: true });
  });

  command.save(tmpFile);
};
