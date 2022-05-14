/*!
 * DEV TEMPLATE GULP
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import pkg from './package.json';
let _copy = `${pkg.name.toUpperCase()}
- Version ${pkg.version}
- Copyright ${pkg.author}`;
console.log('-'.repeat(38) + '\n'+ _copy + '\n'+'-'.repeat(38));
import { series, parallel } from 'gulp';
import taskSass from './.dev/sass/';
import {
  taskJsBabel,
  taskJsWebpack,
} from './.dev/javascript_babel/';
import taskTemplate from './.dev/template/';
import taskServer from './.dev/server/';
import taskWatch from './.dev/watch/';
import taskClean from './.dev/clean/';
import taskPhp from './.dev/php/';
import taskTwig from './.dev/twig/';
import tackDeploy from './.dev/deploy/';
import tackImageMin from './.dev/image/';
export default series(
  taskClean,
  taskTemplate,
  taskSass,
  taskJsBabel,
  taskJsWebpack,
  parallel(
    taskPhp,
    taskTwig,
    taskServer,
    taskWatch
  )
);
export const prod = series(
  taskClean,
  taskTemplate,
  taskSass,
  taskJsBabel,
  taskJsWebpack,
  parallel(
    taskPhp,
    taskTwig,
    taskServer,
    taskWatch
  )
);
export const deploy = series(
  taskClean,
  taskTemplate,
  taskSass,
  taskJsBabel,
  taskJsWebpack,
  tackDeploy
);
export const imagemin = series(
  taskClean,
  tackImageMin
);
