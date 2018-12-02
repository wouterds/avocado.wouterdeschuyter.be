#!./node_modules/.bin/babel-node
//@flow
import path from 'path';
import { generate as generateVideo } from '../helpers/video';

/*global __dirname: true*/

generateVideo(
  path.resolve(__dirname, '../../../images'),
  path.resolve(__dirname, '../../../videos'),
  'all-time',
  new Date(0),
  new Date(),
);
