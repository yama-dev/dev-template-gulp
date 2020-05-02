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
    jspre   : `${CONFIG_PATH.source}**/*.js`,
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
      `!${CONFIG_PATH.source}_**/*.html`,
      `!${CONFIG_PATH.source}__**/*.html`,
      `!${CONFIG_PATH.source}___**/*.html`,
    ],
    ejs : [
      `!${CONFIG_PATH.source}**/_*.ejs`,
      `!${CONFIG_PATH.source}_**/*.ejs`,
      `!${CONFIG_PATH.source}__**/*.ejs`,
      `!${CONFIG_PATH.source}___**/*.ejs`,
    ],
    pug : [
      `!${CONFIG_PATH.source}**/_*.pug`,
      `!${CONFIG_PATH.source}_**/*.pug`,
      `!${CONFIG_PATH.source}__**/*.pug`,
      `!${CONFIG_PATH.source}___**/*.pug`,
    ],
    slim : [
      `!${CONFIG_PATH.source}**/_*.slim`,
      `!${CONFIG_PATH.source}_**/*.slim`,
      `!${CONFIG_PATH.source}__**/*.slim`,
      `!${CONFIG_PATH.source}___**/*.slim`,
    ],
    sass : [
      `!${CONFIG_PATH.source}**/wp/**/*.scss`,
      `!${CONFIG_PATH.source}**/vender/**/*.scss`,
      `!${CONFIG_PATH.source}**/vendor/**/*.scss`,
      `!${CONFIG_PATH.source}**/lib/**/*.scss`,
      `!${CONFIG_PATH.source}**/libs/**/*.scss`,
      `!${CONFIG_PATH.source}_**/*.scss`,
      `!${CONFIG_PATH.source}__**/*.scss`,
      `!${CONFIG_PATH.source}___**/*.scss`,
    ],
    js : [
      `!${CONFIG_PATH.source}**/wp/**/*.js`,
      `!${CONFIG_PATH.source}**/vender/**/*.js`,
      `!${CONFIG_PATH.source}**/vendor/**/*.js`,
      `!${CONFIG_PATH.source}**/lib/**/*.js`,
      `!${CONFIG_PATH.source}**/libs/**/*.js`,
      `!${CONFIG_PATH.source}**/*.min.js`,
      `!${CONFIG_PATH.source}_**/*.js`,
      `!${CONFIG_PATH.source}__**/*.js`,
      `!${CONFIG_PATH.source}___**/*.js`,
    ]
  },

  deployDirectory: [
    `${CONFIG_PATH.source}**/*`,
    `!${CONFIG_PATH.source}_*/**`,
    `!${CONFIG_PATH.source}__*/**`,
    `!${CONFIG_PATH.source}___*/**`,
    `!${CONFIG_PATH.source}vender/**`,
    `!${CONFIG_PATH.source}vendor/**`,
    `!${CONFIG_PATH.source}**/*.ejs`,
    `!${CONFIG_PATH.source}**/*.pug`,
    `!${CONFIG_PATH.source}**/*.slim`,
    `!${CONFIG_PATH.source}**/_*.css`,
    `!${CONFIG_PATH.source}**/*.scss`,
    `!${CONFIG_PATH.source}**/_*.js`,
    `!${CONFIG_PATH.source}**/*.es6`,
    `!${CONFIG_PATH.source}**/*.es`,
  ],

  cleanDirectory: [
    `${CONFIG_PATH.source}**/*.map`,
    `${CONFIG_PATH.sourceBuild}**/*.map`,
    `${CONFIG_PATH.source}**/*.sourcemap`,
    `${CONFIG_PATH.sourceBuild}**/*.sourcemap`,
  ]
};

export default CONFIG;
