#!./node_modules/.bin/babel-node
//@flow
import path from 'path';
import { generate as generateVideo } from '../helpers/video';
import { startOfToday, subDays } from 'date-fns';

/*global __dirname: true*/

generateVideo(
  path.resolve(__dirname, '../../../images'),
  path.resolve(__dirname, '../../../videos'),
  'last-30-days',
  subDays(startOfToday(), 30),
  startOfToday(),
);
