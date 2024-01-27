/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import notifier from 'node-notifier';
import fs from 'fs';
import path from 'path';
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';

/**
 * Js Task Babel, Webpack.
 */

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

let taskJsWebpack = ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es);

  if(CONFIG.env.webpack){
    let _configfile_webpack = CONFIG.env.webpackConfig ? path.join(process.cwd(),CONFIG.env.webpackConfig) : path.join(process.cwd(),'webpack.config.js');

    if(!fs.existsSync(_configfile_webpack)){
      // @ts-ignore
      console.log(`[dev-template] NOT FOUND ${_configfile_webpack}`.white.bgRed);
      return Promise.resolve('not use webpack.');
    }

    let _webpackConfig = require(_configfile_webpack);
    if(CONFIG.env.production == true){
      _webpackConfig.mode = 'production';
    } else {
      _webpackConfig.mode = 'development';
    }

    return src(_target)
      .pipe(plumber({
        errorHandler(error){
          notifier.notify({ title: 'WEBPACK コンパイル エラー', message: error.message });
        }
      }))
      .pipe(webpackStream({
        config : _webpackConfig,
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

export default taskJsWebpack;
