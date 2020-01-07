/**
 * IMPORT MODULES
 */
import CONFIG from './config';
import notifier       from 'node-notifier';
import streamUtil     from '@yama-dev/gulp-stream-util';

import { src, dest, watch } from 'gulp';

import htmlhint       from 'gulp-htmlhint';
import htmlmin        from 'gulp-htmlmin';
import ejs            from 'gulp-ejs';
import pug            from 'gulp-pug';

import babel          from 'gulp-babel';
import eslint         from 'gulp-eslint';
import uglify         from 'gulp-uglify';

import rename         from 'gulp-rename';
import cache          from 'gulp-cached';
import progeny        from 'gulp-progeny';
import plumber        from 'gulp-plumber';
import ignore         from 'gulp-ignore';

import browserSync    from 'browser-sync';
browserSync.create();
import runSequence    from 'run-sequence';
runSequence.options.ignoreUndefinedTasks = true;

/**
 * Ejs Task
 */
gulp.task('ejs', function buildHTML(){
  let _target = CONFIG.watchIgnoreDirectory.ejs.slice();
  _target.unshift(CONFIG.watchDirectory.ejs);

  let _config_ejs_data = {};
  if(CONFIG_USER.ejs) _config_ejs_data = { ejs: CONFIG_USER.ejs };

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'EJS エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(streamUtil(function(){
      if(CONFIG_USER.ejs){
        let _current_data = _config_ejs_data.ejs.pages.find(item => item.slug == this.dir);
        if(_current_data) _config_ejs_data.ejs.current = _current_data;
      }
    }))
    .pipe(ejs(_config_ejs_data, {}, { ext: '' }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Pug Task
 */
gulp.task('pug', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.pug.slice();
  _target.unshift(CONFIG.watchDirectory.pug);

  let _config_pug = {
    pretty: true
  };

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'PUG エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(pug(_config_pug))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('.html','');
    }))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * HtmlLint Task
 */
gulp.task('html_lint', ()=>{

  const _config_htmllist = {
    'tagname-lowercase': true,
    'attr-lowercase': ['viewBox'],
    'attr-value-double-quotes': true,
    'attr-value-not-empty': false,
    'attr-no-duplication': true,
    'doctype-first': false,
    'tag-pair': true,
    'tag-self-close': false,
    'spec-char-escape': true,
    'id-unique': true,
    'src-not-empty': true,
    'alt-require': true,
    'head-script-disabled': false,
    'img-alt-require': true,
    'doctype-html5': true,
    'id-class-value': false,
    'style-disabled': false,
    'space-tab-mixed-disabled': true,
    'id-class-ad-disabled': true,
    'href-abs-or-rel': false,
    'attr-unsafe-chars': true
  };

  let _target = CONFIG.watchIgnoreDirectory.html.slice();
  _target.unshift(CONFIG.watchDirectory.html);

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'HTML LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(htmlhint(_config_htmllist))
    .pipe(htmlhint.reporter());
});

/**
 * Minify Task */
gulp.task('html_min', ()=>{
  const _config_htmlmin = {
    collapseWhitespace: true,
    preserveLineBreaks: true
  };

  let _target = CONFIG.watchIgnoreDirectory.html.slice();
  _target.unshift(CONFIG.watchDirectory.html);

  return gulp.src(_target)
    .pipe(htmlmin(_config_htmlmin))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Deploy Task
 */
gulp.task('deploy', ()=>{
  notifier.notify({ title: 'Deploy', message: new Date(), sound: 'Glass' });

  let _target = CONFIG.deployDirectory.slice();

  return gulp.src(_target)
    .pipe(ignore.include({isFile: true}))
    .pipe(gulp.dest(CONFIG.outputDirectory.release));
});

/**
 * Default Task
 */
gulp.task('default', (callback)=>{
  if(!taskListAdd.length){
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], 'watch', callback);
  } else {
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], taskListAdd, 'watch', callback);
  }
});

/**
 * Release Task
 */
gulp.task('release', (callback)=>{
  if(!taskListAdd.length){
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], 'deploy', callback);
  } else {
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], taskListAdd, 'deploy', callback);
  }
});

