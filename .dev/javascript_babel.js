/**
 * IMPORT MODULES
 */
import CONFIG from './config';
import notifier       from 'node-notifier';

import { src, dest } from 'gulp';

import cache from 'gulp-cached';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';

/**
 * Js Task Babel, Webpack.
 */

import babel          from 'gulp-babel';

let defaultFunction = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es6);
  _target.unshift(CONFIG.watchDirectory.es);

  return src(_target)
    .pipe(plumber({
      errorHandler(error){
        notifier.notify({ title: 'BABEL コンパイル エラー', message: error.message });
      }
    }))
    .pipe(babel())
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      this.emit('end');
    })
    .pipe(dest(CONFIG.outputDirectory.dev));
};

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

let useWebpackFunction = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es6);
  _target.unshift(CONFIG.watchDirectory.es);

  let _configfile_webpack = '../webpack.config.js';

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
  if(CONFIG.env.webpack){
    return useWebpackFunction();
  } else {
    return defaultFunction();
  }
};

export default taskJsBabel;
