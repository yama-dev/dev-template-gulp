/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import { src, dest } from 'gulp';
import streamUtil from '@yama-dev/gulp-stream-util';
import notifier   from 'node-notifier';
import ejs        from 'gulp-ejs';
import pug        from 'gulp-pug';
import rename     from 'gulp-rename';
import plumber    from 'gulp-plumber';
import gulpif     from 'gulp-if';
import htmlmin    from 'gulp-htmlmin';
import dataCollector from '@yama-dev/data-collector';
import dataTemplate from '@yama-dev/data-template';

/**
 * Ejs Task
 */
let taskTemplateEjs = () => {
  let _target = CONFIG.watchIgnoreDirectory.ejs.slice();
  _target.unshift(CONFIG.watchDirectory.ejs);

  let min = false;
  if(CONFIG.env.htmlMin === true){
    min = true;
  }

  let _config_ejs_data = {};
  _config_ejs_data = {
    ejs: {},
    env: CONFIG.env,
    data: null
  };
  if(CONFIG.env.ejs){
    _config_ejs_data.ejs = CONFIG.env.ejs;
  }

  if(CONFIG.user.data){
    console.log('[dev-template] use data.');
    let _config_data_collector = {
      data: CONFIG.user.data.directory ? CONFIG.user.data.directory : 'data', // Directory where data is stored.
      order: CONFIG.user.data.order ? CONFIG.user.data.order : 'DESC', // Sort. DESC or ASC
      orderby: CONFIG.user.data.orderby ? CONFIG.user.data.orderby : 'date', // Sort. property-name.
    };
    _config_ejs_data.data = dataCollector(_config_data_collector);
    if(CONFIG.user.data.template){
      console.log('[dev-template] use data-template.');
      dataTemplate({
        dataall: _config_ejs_data, // テンプレートに渡されるデータ
        data: _config_ejs_data.data, // 対象のデータ
        template: CONFIG.user.data.template // テンプレートのデータ
      });
    }
  }

  const _config_htmlmin = {
    collapseWhitespace: true,
    // preserveLineBreaks: true
  };

  return src(_target)
    .pipe(plumber())
    .pipe(streamUtil(function(){
      _config_ejs_data.ejs.current = {};
      if(CONFIG.env.ejs && CONFIG.env.ejs.pages){
        let _current_data = _config_ejs_data.ejs.pages.find(item => item.slug == this.dir);
        if(_current_data) _config_ejs_data.ejs.current = _current_data;
      }
    }))
    .pipe(ejs(_config_ejs_data, {}, { ext: '' }))
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulpif(min, htmlmin()))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

/**
 * Pug Task
 */
let taskTemplatePug = () => {
  let _target = CONFIG.watchIgnoreDirectory.pug.slice();
  _target.unshift(CONFIG.watchDirectory.pug);

  let _config_pug = {
    pretty: true
  };

  return src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'PUG エラー', message: error.message });
        this.emit('end');
      }
    }))
    // @ts-ignore
    .pipe(pug(_config_pug))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('.html','');
    }))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

/**
 * Slim Task
 */

export default taskTemplateEjs;

export { taskTemplateEjs as taskTemplateEjs };
