/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import { src, dest } from 'gulp';
import streamUtil from '@yama-dev/gulp-stream-util';
import notifier   from 'node-notifier';
import ejs        from 'gulp-ejs';
import pug        from 'gulp-pug';
import rename     from 'gulp-rename';
import plumber    from 'gulp-plumber';

/**
 * Ejs Task
 */
let taskTemplateEjs = () => {
  let _target = CONFIG.watchIgnoreDirectory.ejs.slice();
  _target.unshift(CONFIG.watchDirectory.ejs);

  let _config_ejs_data = {};
  if(CONFIG.user.ejs) _config_ejs_data = { ejs: CONFIG.user.ejs };

  return src(_target)
    .pipe(plumber())
    .pipe(streamUtil(function(){
      if(CONFIG.user.ejs){
        let _current_data = _config_ejs_data.ejs.pages.find(item => item.slug == this.dir);
        _config_ejs_data.ejs.current = null;
        if(_current_data) _config_ejs_data.ejs.current = _current_data;
      }
    }))
    .pipe(ejs(_config_ejs_data, {}, { ext: '' }))
    .pipe(rename({
      extname: ''
    }))
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
