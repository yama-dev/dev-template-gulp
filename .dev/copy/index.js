/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG        from '../config';
import { src, dest } from 'gulp';
import ignore        from 'gulp-ignore';

/**
 * Copy Task
 */
let taskCopy = ()=>{
  let _target = CONFIG.deployDirectory.slice();

  if(CONFIG.user.webpack){
    let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';
    let _webpackConfig = require(_configfile_webpack);
    Object.keys(_webpackConfig.entry).forEach(function (key) {
      _target.push(`!${CONFIG.path.source}**/*${path.basename(_webpackConfig.entry[key])}`);
    });
  }

  return src(_target)
    .pipe(ignore.include({isFile: true}))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

export default taskCopy;
