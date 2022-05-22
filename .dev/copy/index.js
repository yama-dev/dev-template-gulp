/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from '../config/index.js';
import {
  src,
  dest,
} from 'gulp';
import ignore from 'gulp-ignore';
import changed from 'gulp-changed';

/**
 * Copy Task
 */
let taskCopy = ()=>{
  let _target = CONFIG.copyDirectory.slice();

  if(CONFIG.path.source !== CONFIG.path.sourceBuild){
    _target.push(`!${CONFIG.watchDirectory.jspre}`);
  }

  if(CONFIG.user.webpack || CONFIG.env.webpack){
    let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';
    let _webpackConfig = require(_configfile_webpack);
    Object.keys(_webpackConfig.entry).forEach(function (key) {
      _target.push(`!${CONFIG.path.source}**/*${path.basename(_webpackConfig.entry[key])}`);
    });
  }

  return src(_target)
    .pipe(changed(CONFIG.outputDirectory.dev))
    .pipe(ignore.include({isFile: true}))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

export default taskCopy;
