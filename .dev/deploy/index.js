/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG        from '../config/index.js';
import { src, dest } from 'gulp';
import ignore        from 'gulp-ignore';
import prompt        from 'gulp-prompt';

/**
 * Copy Task
 */
let taskDeploy = ()=>{
  let _target = CONFIG.deployDirectory.slice();

  if(CONFIG.env.webpack){
    let _configfile_webpack = CONFIG.env.webpackConfig ? path.join(process.cwd(),CONFIG.env.webpackConfig) : path.join(process.cwd(),'webpack.config.js');
    let _webpackConfig = require(_configfile_webpack);
    for (const key in _webpackConfig.entry) {
      if (Object.hasOwnProperty.call(_webpackConfig.entry, key)) {
        _target.push(`!${CONFIG.env.source}**/*${path.basename(_webpackConfig.entry[key])}`);
      }
    }
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
