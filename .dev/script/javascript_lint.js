/**
 * IMPORT MODULES
 */
import CONFIG   from '../config/index.js';
import notifier from 'node-notifier';
import { src }  from 'gulp';
import eslint   from 'gulp-eslint';
import plumber  from 'gulp-plumber';

/**
 * Js Task Lint
 */
let taskJsLint = () => {
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.js);

  return src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

export default taskJsLint;
