/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import notifier from 'node-notifier';
import fs from 'fs';
import path from 'path';
// import glob from 'glob';

import { src, dest } from 'gulp';
// import streamUtil from '@yama-dev/gulp-stream-util';

import gulpif from 'gulp-if';
// import cache from 'gulp-cached';
// import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import javascriptObfuscator from 'gulp-javascript-obfuscator';
import terser from 'gulp-terser';
import eslint from 'gulp-eslint';
import prettier from 'gulp-prettier';

/**
 * Js Task Babel, Webpack.
 */

import babel from 'gulp-babel';

let taskJsBabel = ()=>{
  let _target = [];

  _target.unshift(CONFIG.watchDirectory.es);

  if(CONFIG.path.source !== CONFIG.path.sourceBuild){
    _target.unshift(CONFIG.watchDirectory.jspre);
    _target = [..._target, ...CONFIG.watchIgnoreDirectory.js];
  }

  if(CONFIG.user.webpack || CONFIG.env.webpack){
    let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';
    let _webpackConfig = require(_configfile_webpack);

    Object.keys(_webpackConfig.entry).forEach(function (key) {
      _target.push(`!${CONFIG.path.source}**/${path.basename(_webpackConfig.entry[key])}`);
    });
  }

  let sourcemaps = false;
  if(CONFIG.user.sourcemaps === true
    || CONFIG.user.sourcemap === true
    || CONFIG.env.sourcemaps === true){
    sourcemaps = true;
  }
  if(CONFIG.user.sourcemaps === false
    || CONFIG.user.sourcemap === false
    || CONFIG.env.sourcemaps === false){
    sourcemaps = false;
  }
  if(CONFIG.env.production == true || CONFIG.env.prod == true) sourcemaps = false;

  let jsmin = false;
  if(CONFIG.user.jsMin === true
    || CONFIG.env.jsMin === true){
    jsmin = true;
  }

  let obfuscator = false;
  if(CONFIG.user.obfuscator === true
    || CONFIG.env.obfuscator === true
    || CONFIG.user.hide === true
    || CONFIG.env.hide === true){
    jsmin = false;
    obfuscator = true;
  }

  /** @type {boolean|object} */
  let _config_obfuscator_default = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  };

  let _config_obfuscator_max = {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayEncoding: [],
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  };

  let _config_obfuscator = _config_obfuscator_default;
  if(CONFIG.user.obfuscatorMax === true || CONFIG.env.obfuscatorMax === true){
    _config_obfuscator = _config_obfuscator_max;
  }

  return src(_target, { sourcemaps: sourcemaps })
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
    .pipe(plumber({
      errorHandler(error){
        notifier.notify({ title: 'BABEL コンパイル エラー', message: error.message });
      }
    }))
    .pipe(babel())
    .on('error', function(e) {
      console.log('[dev-template] ERROR ', e);
      this.emit('end');
    })
    .pipe(prettier({
      printWidth: 300,
      trailingComma: 'es5',
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      bracketSpacing: false,
    }))
    .pipe(gulpif(jsmin ,terser()))
    .pipe(gulpif(obfuscator ,javascriptObfuscator(_config_obfuscator)))
    .pipe(dest(CONFIG.outputDirectory.dev, { sourcemaps: sourcemaps }));
};

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

let taskJsWebpack = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es);

  if(CONFIG.user.webpack || CONFIG.env.webpack){
    let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';

    if(!fs.existsSync(path.join(__dirname,_configfile_webpack))){
      // @ts-ignore
      console.log(`[dev-template] NOT FOUND ${path.join(__dirname,_configfile_webpack)}`.white.bgRed);
      return Promise.resolve('not use webpack.');
    }

    return src(_target)
      .pipe(plumber({
        errorHandler(error){
          notifier.notify({ title: 'WEBPACK コンパイル エラー', message: error.message });
        }
      }))
      .pipe(webpackStream({
        config : require(_configfile_webpack)
      }, webpack))
      .on('error', function(e) {
        console.log('[dev-template] ERROR ', e);
        this.emit('end');
      })
      .pipe(dest(CONFIG.outputDirectory.dev));
  } else {
    return Promise.resolve('not use webpack.');
  }
};

export {
  taskJsWebpack,
  taskJsBabel,
};
