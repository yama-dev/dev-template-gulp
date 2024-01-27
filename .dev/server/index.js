/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from '../config/index.js';
import { src, watch } from 'gulp';
import taskCopy from '../copy/index.js';
import {
  taskHtmlLint,
  taskHtmlMin,
} from '../html/index.js';
import browserSync from 'browser-sync';
browserSync.create();

/**
 * Server Task
 */
let taskServer = ()=>{

  // Set BrowserSync server.
  let _config_bs = {
    reloadDelay: 0,
    reloadDebounce: 0,
    logLevel: 'info',
    logPrefix: 'dev-template'
  };
  if(CONFIG.env.proxy){
    _config_bs.proxy = CONFIG.env.proxy;
  } else {
    _config_bs.server = {
      baseDir: CONFIG.outputDirectory.dev
    };
  }
  if(CONFIG.env.host) _config_bs.host = CONFIG.env.host;

  // 起動時に開くパス
  if(CONFIG.env.startPath) _config_bs.startPath = CONFIG.env.startPath;
  
  browserSync.init(_config_bs);

  // COPY.
  if(CONFIG.env.source !== CONFIG.env.sourceBuild){
    let _target = CONFIG.copyDirectory.slice();
    if(CONFIG.env.webpack){
      let _configfile_webpack = CONFIG.env.webpackConfig ? path.join(process.cwd(),CONFIG.env.webpackConfig) : path.join(process.cwd(),'webpack.config.js');
      let _webpackConfig = require(_configfile_webpack);
      for (const key in _webpackConfig.entry) {
        if (Object.hasOwnProperty.call(_webpackConfig.entry, key)) {
          _target.push(`!${CONFIG.env.source}**/*${path.basename(_webpackConfig.entry[key])}`);
        }
      }
    }
    watch(_target).on('change', taskCopy);

    taskCopy();
  }

  // HTML.
  let _target_html = CONFIG.watchIgnoreDirectory.html.slice();
  _target_html.unshift(CONFIG.watchDirectory.html);
  if(CONFIG.env.htmlMin){
    watch(_target_html, taskHtmlMin);
  } else {
    if(CONFIG.env.htmlLint){
      watch(_target_html).on('change', function(path, stats) {
        taskHtmlLint();
      });
    }
    watch(_target_html).on('change', browserSync.reload);
    if(CONFIG.env.source !== CONFIG.env.sourceBuild){
      watch([CONFIG.watchDirectory.htmlpre]).on('change', taskCopy);
    }
  }

  // JS.
  const _target_js = CONFIG.watchIgnoreDirectory.js.slice();
  _target_js.unshift(CONFIG.watchDirectory.js);
  if(CONFIG.env.jsMin){
    // watch(_target_js).on('change', taskJsMin);
  } else {
    if(CONFIG.env.jsLint){
      // watch(_target_js).on('change', taskJsLint);
    }
  }
  watch(_target_js).on('change', browserSync.reload);

  // CSS.
  const _target_css = CONFIG.watchIgnoreDirectory.css.slice();
  _target_css.unshift(CONFIG.watchDirectory.css);
  const watcherCss = watch(_target_css);
  watcherCss.on('change', function(path, stats) {
    src(path).pipe(browserSync.stream());
  });

  // PHP.
  watch(CONFIG.watchDirectory.php).on('change', browserSync.reload);

  if(CONFIG.env.outputDirectory){
    browserSync.reload();
  }

};

export default taskServer;
