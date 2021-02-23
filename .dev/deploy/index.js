/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG        from '../config';
import { src, dest } from 'gulp';
import ignore        from 'gulp-ignore';
import prompt        from 'gulp-prompt';

/**
 * Copy Task
 */
let taskDeploy = ()=>{
  let _target = CONFIG.deployDirectory.slice();

  if(CONFIG.user.webpack){
    let _configfile_webpack = CONFIG.user.webpackConfig ? `../../${CONFIG.user.webpackConfig}` : '../../webpack.config.js';
    let _webpackConfig = require(_configfile_webpack);
    Object.keys(_webpackConfig.entry).forEach(function (key) {
      _target.push(`!${CONFIG.path.source}**/*${path.basename(_webpackConfig.entry[key])}`);
    });
  }

  let _output_dir = '';

  return src('./package.json')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'dir',
      message: 'Please output directory name.'
    }, function(res){
      if(res.dir) _output_dir = res.dir;
      if(!res.dir) return false;
      return src(_target)
        .pipe(ignore.include({isFile: true}))
        .pipe(dest(_output_dir));
    }));
};

export default taskDeploy;
