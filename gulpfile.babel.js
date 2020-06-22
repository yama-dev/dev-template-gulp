/*!
 * DEV TEMPLATE GULP
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import pkg from './package.json';
let _copy = `${pkg.name.toUpperCase()}
- Version ${pkg.version}
- Repository ${pkg.repository.url}
- Copyright ${pkg.author}
- Licensed under the ${pkg.license} license.`;
console.log('-'.repeat(38) + '\n'+ _copy + '\n'+'-'.repeat(38));
import { series, parallel } from 'gulp';
import taskSass from './.dev/sass';
import taskJsBabel from './.dev/javascript_babel';
import taskTemplate from './.dev/template';
import taskServer from './.dev/server';
import taskWatch from './.dev/watch';
import taskClean from './.dev/clean';
import taskPhp from './.dev/php';
export default series(
  taskClean,
  taskTemplate,
  taskSass,
  taskJsBabel,
  parallel(
    taskPhp,
    taskServer,
    taskWatch
  )
);
export const prod = series(
  taskClean,
  taskTemplate,
  taskSass,
  taskJsBabel,
  parallel(
    taskPhp,
    taskServer,
    taskWatch
  )
);
