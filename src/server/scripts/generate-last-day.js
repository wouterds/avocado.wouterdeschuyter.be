#!./node_modules/.bin/babel-node
//@flow
import path from 'path';
import { generate as generateVideo } from '../helpers/video';
import { startOfYesterday, startOfToday } from 'date-fns';

/*global __dirname: true*/

generateVideo(
  path.resolve(__dirname, '../../../images'),
  path.resolve(__dirname, '../../../videos'),
  'last-day',
  startOfYesterday(),
  startOfToday(),
);
