/*!
 * DEV TEMPLATE GULP
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import { CONFIG_PATH, CONFIG_USER  } from './pathuser';
import { CONFIG_ENV  } from './env';

/**
 * Set CONFIG.
 */
let CONFIG = {
  path: CONFIG_PATH,
  user: CONFIG_USER,
  env: CONFIG_ENV,

  outputDirectory: {
    dev     : CONFIG_PATH.sourceBuild,
    release : CONFIG_PATH.release
  },

  watchDirectory: {
    html    : `${CONFIG_PATH.sourceBuild}**/*.html`,
    ejs     : `${CONFIG_PATH.source}**/*.ejs`,
    pug     : `${CONFIG_PATH.source}**/*.pug`,
    slim    : `${CONFIG_PATH.source}**/*.slim`,
    php     : `${CONFIG_PATH.sourceBuild}**/*.php`,
    css     : `${CONFIG_PATH.sourceBuild}**/*.css`,
    sass    : `${CONFIG_PATH.source}**/*.scss`,
    js      : `${CONFIG_PATH.sourceBuild}**/*.js`,
    es7     : `${CONFIG_PATH.source}**/*.es7`,
    es6     : `${CONFIG_PATH.source}**/*.es6`,
    es      : `${CONFIG_PATH.source}**/*.es`
  },

  watchIgnoreDirectory: {
    html : [
      `!${CONFIG_PATH.source}**/wp/**/*.html`,
      `!${CONFIG_PATH.source}**/vender/**/*.html`,
      `!${CONFIG_PATH.source}**/vendor/**/*.html`,
      `!${CONFIG_PATH.source}**/inc/**/*.html`,
      `!${CONFIG_PATH.source}**/include/**/*.html`,
      `!${CONFIG_PATH.source}**/ssi/**/*.html`,
      `!${CONFIG_PATH.source}_**/*.html`
    ],
    ejs : [
      `!${CONFIG_PATH.source}**/_*.ejs`
    ],
    pug : [
      `!${CONFIG_PATH.source}**/_*.pug`
    ],
    slim : [
      `!${CONFIG_PATH.source}**/_*.slim`
    ],
    sass : [
      `!${CONFIG_PATH.source}**/wp/**/*.scss`,
      `!${CONFIG_PATH.source}**/vender/**/*.scss`,
      `!${CONFIG_PATH.source}**/vendor/**/*.scss`,
      `!${CONFIG_PATH.source}**/lib/**/*.scss`,
      `!${CONFIG_PATH.source}**/libs/**/*.scss`
    ],
    js : [
      `!${CONFIG_PATH.source}**/wp/**/*.js`,
      `!${CONFIG_PATH.source}**/vender/**/*.js`,
      `!${CONFIG_PATH.source}**/vendor/**/*.js`,
      `!${CONFIG_PATH.source}**/lib/**/*.js`,
      `!${CONFIG_PATH.source}**/libs/**/*.js`,
      `!${CONFIG_PATH.source}**/*.min.js`
    ]
  },

  deployDirectory: [
    `${CONFIG_PATH.source}**/*`,
    `!${CONFIG_PATH.source}_*/**`,
    `!${CONFIG_PATH.source}vender/**`,
    `!${CONFIG_PATH.source}vendor/**`,
    `!${CONFIG_PATH.source}**/*.ejs`,
    `!${CONFIG_PATH.source}**/*.pug`,
    `!${CONFIG_PATH.source}**/*.slim`,
    `!${CONFIG_PATH.source}**/_*.css`,
    `!${CONFIG_PATH.source}**/*.scss`,
    `!${CONFIG_PATH.source}**/*.es6`,
    `!${CONFIG_PATH.source}**/*.es`
  ]
};

export default CONFIG;
