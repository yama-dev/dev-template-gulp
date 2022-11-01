/*!
 * DEV TEMPLATE GULP
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import {
  CONFIG_PATH,
  CONFIG_USER,
} from './pathuser.js';
import { CONFIG_ENV  } from './env.js';

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
    htmlpre : `${CONFIG_PATH.source}**/*.html`,
    html    : `${CONFIG_PATH.sourceBuild}**/*.html`,
    ejs     : `${CONFIG_PATH.source}**/*.ejs`,
    pug     : `${CONFIG_PATH.source}**/*.pug`,
    slim    : `${CONFIG_PATH.source}**/*.slim`,
    php     : `${CONFIG_PATH.sourceBuild}**/*.php`,
    css     : `${CONFIG_PATH.sourceBuild}**/*.css`,
    sass    : `${CONFIG_PATH.source}**/*.scss`,
    jspre   : `${CONFIG_PATH.source}**/!(vender|vendor|libs|lib)/*.js`,
    js      : `${CONFIG_PATH.sourceBuild}**/*.js`,
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
      `!${CONFIG_PATH.source}_*/**/*.html`,
      `!${CONFIG_PATH.source}__*/**/*.html`,
      `!${CONFIG_PATH.source}___*/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}**/wp/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}**/vender/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}**/vendor/**/*.html`,
      // `!${CONFIG_PATH.sourceBuild}**/inc/**/*.html`,
      // `!${CONFIG_PATH.sourceBuild}**/include/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}**/ssi/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}_*/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}__*/**/*.html`,
      `!${CONFIG_PATH.sourceBuild}___*/**/*.html`,
    ],
    ejs : [
      `!${CONFIG_PATH.source}**/_*.ejs`,
      `!${CONFIG_PATH.source}_*/**/*.ejs`,
      `!${CONFIG_PATH.source}__*/**/*.ejs`,
      `!${CONFIG_PATH.source}___*/**/*.ejs`,
    ],
    pug : [
      `!${CONFIG_PATH.source}**/_*.pug`,
      `!${CONFIG_PATH.source}_*/**/*.pug`,
      `!${CONFIG_PATH.source}__*/**/*.pug`,
      `!${CONFIG_PATH.source}___*/**/*.pug`,
    ],
    slim : [
      `!${CONFIG_PATH.source}**/_*.slim`,
      `!${CONFIG_PATH.source}_*/**/*.slim`,
      `!${CONFIG_PATH.source}__*/**/*.slim`,
      `!${CONFIG_PATH.source}___*/**/*.slim`,
    ],
    sass : [
      `!${CONFIG_PATH.source}**/wp/**/*.scss`,
      `!${CONFIG_PATH.source}**/vender/**/*.scss`,
      `!${CONFIG_PATH.source}**/vendor/**/*.scss`,
      `!${CONFIG_PATH.source}**/lib/**/*.scss`,
      `!${CONFIG_PATH.source}**/libs/**/*.scss`,
      `!${CONFIG_PATH.source}_*/**/*.scss`,
      `!${CONFIG_PATH.source}__*/**/*.scss`,
      `!${CONFIG_PATH.source}___*/**/*.scss`,
    ],
    css : [
      `!${CONFIG_PATH.source}**/_*.css`,
      `!${CONFIG_PATH.source}_*/**/*.css`,
      `!${CONFIG_PATH.source}__*/**/*.css`,
      `!${CONFIG_PATH.source}___*/**/*.css`,
      `!${CONFIG_PATH.sourceBuild}**/_*.css`,
      `!${CONFIG_PATH.sourceBuild}_*/**/*.css`,
      `!${CONFIG_PATH.sourceBuild}__*/**/*.css`,
      `!${CONFIG_PATH.sourceBuild}___*/**/*.css`,
    ],
    js : [
      `!${CONFIG_PATH.source}**/wp/**/*.js`,
      `!${CONFIG_PATH.source}**/vender/**/*.js`,
      `!${CONFIG_PATH.source}**/vendor/**/*.js`,
      `!${CONFIG_PATH.source}**/lib/**/*.js`,
      `!${CONFIG_PATH.source}**/libs/**/*.js`,
      `!${CONFIG_PATH.source}**/*.min.js`,
      `!${CONFIG_PATH.source}_*/**/*.js`,
      `!${CONFIG_PATH.source}__*/**/*.js`,
      `!${CONFIG_PATH.source}___*/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/wp/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/vender/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/vendor/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/lib/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/libs/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}**/*.min.js`,
      `!${CONFIG_PATH.sourceBuild}_*/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}__*/**/*.js`,
      `!${CONFIG_PATH.sourceBuild}___*/**/*.js`,
    ]
  },

  copyDirectory: [
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
    `!${CONFIG_PATH.source}**/*.es`,
  ],

  deployDirectory: [
    `${CONFIG_PATH.sourceBuild}**/*`,
    `!${CONFIG_PATH.sourceBuild}_*/**`,
    `!${CONFIG_PATH.sourceBuild}__*/**`,
    `!${CONFIG_PATH.sourceBuild}___*/**`,
    `!${CONFIG_PATH.sourceBuild}vender/**`,
    `!${CONFIG_PATH.sourceBuild}vendor/**`,
    `!${CONFIG_PATH.sourceBuild}**/*.ejs`,
    `!${CONFIG_PATH.sourceBuild}**/*.pug`,
    `!${CONFIG_PATH.sourceBuild}**/*.slim`,
    `!${CONFIG_PATH.sourceBuild}**/_*.css`,
    `!${CONFIG_PATH.sourceBuild}**/*.scss`,
    `!${CONFIG_PATH.sourceBuild}**/_*.js`,
    `!${CONFIG_PATH.sourceBuild}**/*.es`,
  ],

  imageMinDirectory: [
    `${CONFIG_PATH.source}**/*.png`,
    `${CONFIG_PATH.source}**/*.jpg`,
    `${CONFIG_PATH.source}**/*.jpeg`,
    `${CONFIG_PATH.source}**/*.gif`,
    `${CONFIG_PATH.source}**/*.svg`,
  ],

  cleanDirectory: [
    `${CONFIG_PATH.source}**/*.map`,
    `${CONFIG_PATH.sourceBuild}**/*.map`,
    `${CONFIG_PATH.source}**/*.sourcemap`,
    `${CONFIG_PATH.sourceBuild}**/*.sourcemap`,
  ]
};

if(CONFIG.user.php || CONFIG.env.php){
  CONFIG.user.proxy = '127.0.0.1:3333';
  CONFIG.env.htmlLint = false;
  CONFIG.env.jsLint = false;
}

if(CONFIG.user.twig || CONFIG.env.twig){
  CONFIG.user.proxy = '127.0.0.1:3333';
  CONFIG.env.htmlLint = false;
  CONFIG.env.jsLint = false;
  if(CONFIG.path.source !== CONFIG.path.sourceBuild){
    CONFIG.copyDirectory.push(`${CONFIG_PATH.source}**/_twig/**`);
  }
}

export default CONFIG;
