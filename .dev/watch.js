/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from './config';
import notifier       from 'node-notifier';
import glob from 'glob';
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

  const filesEs = glob.sync(CONFIG.watchDirectory.es);

  if(filesEs.length){
    console.log('use es files.');
    watch(CONFIG.watchDirectory.es, taskJsBabel);
  } else {
    watch(CONFIG.watchDirectory.jspre, taskJsBabel);
  }

  watch(CONFIG.watchDirectory.ejs, taskTemplateEjs);
  // watch(CONFIG.watchDirectory.pug, taskTemplatePug);
  // watch(CONFIG.watchDirectory.slim, taskTemplateSlim);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });
};

export default taskWatch;
