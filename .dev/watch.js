/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from './config';
import notifier       from 'node-notifier';
import { watch } from 'gulp';
import { taskTemplateEjs } from './template';
import taskSass from './sass';
import taskJsBabel from './javascript_babel';

/**
 * Watch Task
 */
let taskWatch = ()=>{
  // Set Watch Tasks.
  // CSS.
  const watcherCss = watch(CONFIG.watchDirectory.sass);
  watcherCss.on('change', function(filepath, stats) {
    let filename = path.basename(filepath);
    let refreshflg = /^_.{5,}/.test(filename);
    taskSass(refreshflg);
  });

  watch(CONFIG.watchDirectory.jspre, taskJsBabel);
  watch(CONFIG.watchDirectory.es6, taskJsBabel);
  watch(CONFIG.watchDirectory.es, taskJsBabel);

  watch(CONFIG.watchDirectory.ejs, taskTemplateEjs);
  // watch(CONFIG.watchDirectory.pug, taskTemplatePug);
  // watch(CONFIG.watchDirectory.slim, taskTemplateSlim);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });
};

export default taskWatch;
