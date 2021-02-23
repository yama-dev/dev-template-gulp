/**
 * IMPORT MODULES
 */
import path from 'path';
import CONFIG from './config';
import notifier from 'node-notifier';
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

  // Sass.
  const _target_sass = CONFIG.watchIgnoreDirectory.sass.slice();
  _target_sass.unshift(CONFIG.watchDirectory.sass);
  const watcherSass = watch(_target_sass);
  watcherSass.on('change', function(filepath, stats) {
    let filename = path.basename(filepath);
    let refreshflg = /^_.{5,}/.test(filename);
    taskSass(refreshflg);
  });

  const filesEs = glob.sync(CONFIG.watchDirectory.es);

  if(filesEs.length){
    console.log('[dev-template] use es files.');
    const _target_es = CONFIG.watchIgnoreDirectory.es.slice();
    _target_es.unshift(CONFIG.watchDirectory.es);
    watch(_target_es, taskJsBabel);
  } else {
    watch(CONFIG.watchDirectory.jspre, taskJsBabel);
  }

  watch(CONFIG.watchDirectory.ejs, taskTemplateEjs);
  // watch(CONFIG.watchDirectory.pug, taskTemplatePug);
  // watch(CONFIG.watchDirectory.slim, taskTemplateSlim);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });
};

export default taskWatch;
