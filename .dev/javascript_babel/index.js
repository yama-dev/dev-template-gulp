/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import notifier from 'node-notifier';

import { src, dest } from 'gulp';
import streamUtil from '@yama-dev/gulp-stream-util';

import gulpif from 'gulp-if';
import cache from 'gulp-cached';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import javascriptObfuscator from 'gulp-javascript-obfuscator';

/**
 * Js Task Babel, Webpack.
 */

import babel from 'gulp-babel';

let defaultFunction = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es);

  let sourcemaps = false;
  if(CONFIG.user.sourcemaps === true || CONFIG.user.sourcemap === true){
    sourcemaps = true;
  } else if(CONFIG.user.sourcemaps === false || CONFIG.user.sourcemap === false){
    sourcemaps = false;
  }
  if(CONFIG.env.sourcemaps === true || CONFIG.env.sourcemap === true){
    sourcemaps = true;
  } else if(CONFIG.env.sourcemaps === false || CONFIG.env.sourcemap === false){
    sourcemaps = false;
  }
  if(CONFIG.env.production == true || CONFIG.env.prod == true) sourcemaps = false;

  let obfuscator = false;
  if(CONFIG.user.obfuscator === true
    || CONFIG.env.obfuscator === true
    || CONFIG.user.hide === true
    || CONFIG.env.hide === true){
    obfuscator = true;
  }

  let _config_obfuscator = {
    splitStrings: true,
    stringArrayEncoding: 'rc4',
    unicodeEscapeSequence: true
  };

  return src(_target, { sourcemaps: sourcemaps })
    .pipe(plumber({
      errorHandler(error){
        notifier.notify({ title: 'BABEL コンパイル エラー', message: error.message });
      }
    }))
    .pipe(babel())
    .pipe(gulpif(obfuscator ,javascriptObfuscator(_config_obfuscator)))
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      this.emit('end');
    })
    .pipe(dest(CONFIG.outputDirectory.dev, { sourcemaps: sourcemaps }));
};

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

let useWebpackFunction = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es);

  let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';

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
      console.log('>>> ERROR', e);
      this.emit('end');
    })
    .pipe(dest(CONFIG.outputDirectory.dev));
};

let taskJsBabel = () => {
  if(CONFIG.user.webpack || CONFIG.env.webpack){
    return useWebpackFunction();
  } else {
    return defaultFunction();
  }
};

export default taskJsBabel;
