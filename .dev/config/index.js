/*!
 * DEV TEMPLATE GULP
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import {
  CONFIG_USER,
  CONFIG_ENV,
} from './env.js';

/**
 * Set CONFIG.
 */
let CONFIG = {
  user: CONFIG_USER,
  env: CONFIG_ENV,

  outputDirectory: {
    dev     : CONFIG_ENV.sourceBuild,
  },

  watchDirectory: {
    htmlpre : `${CONFIG_ENV.source}**/*.html`,
    html    : `${CONFIG_ENV.sourceBuild}**/*.html`,
    ejs     : `${CONFIG_ENV.source}**/*.ejs`,
    pug     : `${CONFIG_ENV.source}**/*.pug`,
    slim    : `${CONFIG_ENV.source}**/*.slim`,
    php     : `${CONFIG_ENV.sourceBuild}**/*.php`,
    css     : `${CONFIG_ENV.sourceBuild}**/*.css`,
    sass    : `${CONFIG_ENV.source}**/*.scss`,
    jspre   : `${CONFIG_ENV.source}**/!(vender|vendor|libs|lib)/*.js`,
    js      : `${CONFIG_ENV.sourceBuild}**/*.js`,
    es      : `${CONFIG_ENV.source}**/*.es`
  },

  watchIgnoreDirectory: {
    html : [
      `!${CONFIG_ENV.source}**/wp/**/*.html`,
      `!${CONFIG_ENV.source}**/vender/**/*.html`,
      `!${CONFIG_ENV.source}**/vendor/**/*.html`,
      `!${CONFIG_ENV.source}**/inc/**/*.html`,
      `!${CONFIG_ENV.source}**/include/**/*.html`,
      `!${CONFIG_ENV.source}**/ssi/**/*.html`,
      `!${CONFIG_ENV.source}_*/**/*.html`,
      `!${CONFIG_ENV.source}__*/**/*.html`,
      `!${CONFIG_ENV.source}___*/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}**/wp/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}**/vender/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}**/vendor/**/*.html`,
      // `!${CONFIG_ENV.sourceBuild}**/inc/**/*.html`,
      // `!${CONFIG_ENV.sourceBuild}**/include/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}**/ssi/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}_*/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}__*/**/*.html`,
      `!${CONFIG_ENV.sourceBuild}___*/**/*.html`,
    ],
    ejs : [
      `!${CONFIG_ENV.source}**/_*.ejs`,
      `!${CONFIG_ENV.source}_*/**/*.ejs`,
      `!${CONFIG_ENV.source}__*/**/*.ejs`,
      `!${CONFIG_ENV.source}___*/**/*.ejs`,
    ],
    pug : [
      `!${CONFIG_ENV.source}**/_*.pug`,
      `!${CONFIG_ENV.source}_*/**/*.pug`,
      `!${CONFIG_ENV.source}__*/**/*.pug`,
      `!${CONFIG_ENV.source}___*/**/*.pug`,
    ],
    slim : [
      `!${CONFIG_ENV.source}**/_*.slim`,
      `!${CONFIG_ENV.source}_*/**/*.slim`,
      `!${CONFIG_ENV.source}__*/**/*.slim`,
      `!${CONFIG_ENV.source}___*/**/*.slim`,
    ],
    sass : [
      `!${CONFIG_ENV.source}**/wp/**/*.scss`,
      `!${CONFIG_ENV.source}**/vender/**/*.scss`,
      `!${CONFIG_ENV.source}**/vendor/**/*.scss`,
      `!${CONFIG_ENV.source}**/lib/**/*.scss`,
      `!${CONFIG_ENV.source}**/libs/**/*.scss`,
      `!${CONFIG_ENV.source}_*/**/*.scss`,
      `!${CONFIG_ENV.source}__*/**/*.scss`,
      `!${CONFIG_ENV.source}___*/**/*.scss`,
    ],
    css : [
      `!${CONFIG_ENV.source}**/_*.css`,
      `!${CONFIG_ENV.source}_*/**/*.css`,
      `!${CONFIG_ENV.source}__*/**/*.css`,
      `!${CONFIG_ENV.source}___*/**/*.css`,
      `!${CONFIG_ENV.sourceBuild}**/_*.css`,
      `!${CONFIG_ENV.sourceBuild}_*/**/*.css`,
      `!${CONFIG_ENV.sourceBuild}__*/**/*.css`,
      `!${CONFIG_ENV.sourceBuild}___*/**/*.css`,
    ],
    js : [
      `!${CONFIG_ENV.source}**/wp/**/*.js`,
      `!${CONFIG_ENV.source}**/vender/**/*.js`,
      `!${CONFIG_ENV.source}**/vendor/**/*.js`,
      `!${CONFIG_ENV.source}**/lib/**/*.js`,
      `!${CONFIG_ENV.source}**/libs/**/*.js`,
      `!${CONFIG_ENV.source}**/*.min.js`,
      `!${CONFIG_ENV.source}_*/**/*.js`,
      `!${CONFIG_ENV.source}__*/**/*.js`,
      `!${CONFIG_ENV.source}___*/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/wp/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/vender/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/vendor/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/lib/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/libs/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}**/*.min.js`,
      `!${CONFIG_ENV.sourceBuild}_*/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}__*/**/*.js`,
      `!${CONFIG_ENV.sourceBuild}___*/**/*.js`,
    ]
  },

  copyDirectory: [
    `${CONFIG_ENV.source}**/*`,
    `!${CONFIG_ENV.source}_*/**`,
    `!${CONFIG_ENV.source}__*/**`,
    `!${CONFIG_ENV.source}___*/**`,
    `!${CONFIG_ENV.source}vender/**`,
    `!${CONFIG_ENV.source}vendor/**`,
    `!${CONFIG_ENV.source}**/*.ejs`,
    `!${CONFIG_ENV.source}**/*.pug`,
    `!${CONFIG_ENV.source}**/*.slim`,
    `!${CONFIG_ENV.source}**/_*.css`,
    `!${CONFIG_ENV.source}**/*.scss`,
    `!${CONFIG_ENV.source}**/_*.js`,
    `!${CONFIG_ENV.source}**/*.es`,
  ],

  deployDirectory: [
    `${CONFIG_ENV.sourceBuild}**/*`,
    `!${CONFIG_ENV.sourceBuild}_*/**`,
    `!${CONFIG_ENV.sourceBuild}__*/**`,
    `!${CONFIG_ENV.sourceBuild}___*/**`,
    `!${CONFIG_ENV.sourceBuild}vender/**`,
    `!${CONFIG_ENV.sourceBuild}vendor/**`,
    `!${CONFIG_ENV.sourceBuild}**/*.ejs`,
    `!${CONFIG_ENV.sourceBuild}**/*.pug`,
    `!${CONFIG_ENV.sourceBuild}**/*.slim`,
    `!${CONFIG_ENV.sourceBuild}**/_*.css`,
    `!${CONFIG_ENV.sourceBuild}**/*.scss`,
    `!${CONFIG_ENV.sourceBuild}**/_*.js`,
    `!${CONFIG_ENV.sourceBuild}**/*.es`,
  ],

  imageMinDirectory: [
    `${CONFIG_ENV.source}**/*.png`,
    `${CONFIG_ENV.source}**/*.jpg`,
    `${CONFIG_ENV.source}**/*.jpeg`,
    `${CONFIG_ENV.source}**/*.gif`,
    `${CONFIG_ENV.source}**/*.svg`,
  ],

  cleanDirectory: [
    `${CONFIG_ENV.source}**/*.map`,
    `${CONFIG_ENV.sourceBuild}**/*.map`,
    `${CONFIG_ENV.source}**/*.sourcemap`,
    `${CONFIG_ENV.sourceBuild}**/*.sourcemap`,
  ]
};

if(CONFIG.env.php){
  CONFIG.env.proxy = '127.0.0.1:3333';
  CONFIG.env.htmlLint = false;
  CONFIG.env.jsLint = false;
}

if(CONFIG.env.twig){
  CONFIG.env.proxy = '127.0.0.1:3333';
  CONFIG.env.htmlLint = false;
  CONFIG.env.jsLint = false;
  if(CONFIG_ENV.source !== CONFIG_ENV.sourceBuild){
    CONFIG.copyDirectory.push(`${CONFIG_ENV.source}**/_twig/**`);
  }
}

export default CONFIG;
