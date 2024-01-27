/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from '../config/index.js';
import notifier from 'node-notifier';
import glob from 'glob';
import { watch } from 'gulp';
import { taskTemplateEjs } from '../template/index.js';
import taskSass from '../sass/index.js';
import taskJsBabel from '../javascript_babel/index.js';
import taskJsWebpack from '../javascript_babel/index.js';

/**
 * Watch Task
 */
let taskWatch = ()=>{
  // Set Watch Tasks.

  // Sass files.
  const _target_sass = CONFIG.watchIgnoreDirectory.sass.slice();
  _target_sass.unshift(CONFIG.watchDirectory.sass);
  const watcherSass = watch(_target_sass);
  watcherSass.on('change', function(filepath, stats) {
    let filename = path.basename(filepath);
    let refreshflg = /^_.{5,}/.test(filename);
    console.log('[dev-template] '+filename);
    taskSass(refreshflg);
  });

  // javascript files.
  const filesJs = glob.sync(CONFIG.watchDirectory.jspre);
  const filesEs = glob.sync(CONFIG.watchDirectory.es);
  if(filesEs.length || filesJs.length){

    let _target_es = [];
    if(filesJs.length){
      if(CONFIG.env.source !== CONFIG.env.sourceBuild){
        console.log('[dev-template] use js files.');
        _target_es.unshift(CONFIG.watchDirectory.jspre);
        _target_es = [..._target_es, ...CONFIG.watchIgnoreDirectory.js];
      }
    }
    if(filesEs.length){
      console.log('[dev-template] use es files.');
      _target_es.unshift(CONFIG.watchDirectory.es);
    }

    if(CONFIG.env.webpack){
      let _target_webpack = [];

      let _configfile_webpack = CONFIG.env.webpackConfig ? path.join(process.cwd(),CONFIG.env.webpackConfig) : path.join(process.cwd(),'webpack.config.js');
      let _webpackConfig = require(_configfile_webpack);

      for (const key in _webpackConfig.entry) {
        if (Object.hasOwnProperty.call(_webpackConfig.entry, key)) {
          _target_es.push(`!${CONFIG.env.source}**/${path.basename(_webpackConfig.entry[key])}`);
          _target_webpack.unshift(`${CONFIG.env.source}**/*${path.basename(_webpackConfig.entry[key])}`);
        }
      }

      watch(_target_es, taskJsBabel);
      watch(_target_webpack, taskJsWebpack);
    } else {
      watch(_target_es, taskJsBabel);
    }
  }

  watch(CONFIG.watchDirectory.ejs, taskTemplateEjs);
  // watch(CONFIG.watchDirectory.pug, taskTemplatePug);
  // watch(CONFIG.watchDirectory.slim, taskTemplateSlim);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });
};

export default taskWatch;
