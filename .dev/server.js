/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from './config';
import { src, watch } from 'gulp';
import taskCopy    from './copy';
import browserSync from 'browser-sync';
browserSync.create();

/**
 * Server Task
 */
let taskServer = ()=>{

  // Set BrowserSync server.
  let _config_bs = {};
  if(CONFIG.user.proxy){
    _config_bs = {
      proxy: CONFIG.user.proxy,
      reloadDelay: 300
    };
  } else if(CONFIG.env.proxy){
    _config_bs = {
      proxy: CONFIG.env.proxy,
      reloadDelay: 300
    };
  } else {
    _config_bs = {
      reloadDelay: 300,
      server: {
        baseDir: CONFIG.outputDirectory.dev
      }
    };
  }
  if(CONFIG.user.host) _config_bs.host = CONFIG.user.host;
  if(CONFIG.env.host) _config_bs.host = CONFIG.env.host;
  browserSync.init(_config_bs);

  // COPY.
  if(CONFIG.user.outputDirectory){
    let _target = CONFIG.deployDirectory.slice();
    if(CONFIG.user.webpack){
      let _configfile_webpack = CONFIG.user.webpackConfig ? `../${CONFIG.user.webpackConfig}` : '../webpack.config.js';
      let _webpackConfig = require(_configfile_webpack);
      Object.keys(_webpackConfig.entry).forEach(function (key) {
        _target.push(`!${CONFIG.path.source}**/*${path.basename(_webpackConfig.entry[key])}`);
      });
    }
    watch(_target).on('change', taskCopy);

    taskCopy();
  }

  // HTML.
  let _target_html = CONFIG.watchIgnoreDirectory.html.slice();
  _target_html.unshift(CONFIG.watchDirectory.html);
  if(CONFIG.env.htmlmin){
    // watch(_target_html).on('change', taskHtmlMin);
  } else {
    if(CONFIG.env.htmllint){
      // watch(_target_html).on('change', taskHtmlLint);
    }
    watch(_target_html).on('change', browserSync.reload);
  }

  // JS.
  if(CONFIG.env.jsmin){
    // watch(CONFIG.watchDirectory.js).on('change', taskJsMin);
  } else {
    if(CONFIG.env.jslint){
      // watch(CONFIG.watchDirectory.js).on('change', taskJsLint);
    }
  }
  watch(CONFIG.watchDirectory.js).on('change', browserSync.reload);

  // CSS.
  const watcherCss = watch(CONFIG.watchDirectory.css);
  watcherCss.on('change', function(path, stats) {
    src(path).pipe(browserSync.stream());
  });

  // PHP.
  watch(CONFIG.watchDirectory.php).on('change', browserSync.reload);

  if(CONFIG.user.outputDirectory){
    browserSync.reload();
  }

};

export default taskServer;
