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
import taskSass from './.dev/sass/index.js';
import {
  taskJsBabel,
  taskJsWebpack,
} from './.dev/javascript_babel/index.js';
import taskTemplate from './.dev/template/index.js';
import taskServer from './.dev/server/index.js';
import taskWatch from './.dev/watch/index.js';
import taskClean from './.dev/clean/index.js';
import taskPhp from './.dev/php/index.js';
import taskTwig from './.dev/twig/index.js';
import tackDeploy from './.dev/deploy/index.js';
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
