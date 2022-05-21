/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import { src, dest, lastRun } from 'gulp';
import notifier from 'node-notifier';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';
import htmlhint from 'gulp-htmlhint';

/**
 * HtmlLint Task
 */
let taskHtmlLint = () => {
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

  return src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'HTML LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(htmlhint(_config_htmllist))
    .pipe(htmlhint.reporter());
};

/**
 * Minify Task
 */
let taskHtmlMin = () => {
  const _config_htmlmin = {
    collapseWhitespace: true,
    // preserveLineBreaks: true
  };

  let _target = CONFIG.watchIgnoreDirectory.html.slice();
  _target.unshift(CONFIG.watchDirectory.html);

  return src(_target, { since: lastRun(taskHtmlMin) })
    .pipe(htmlmin(_config_htmlmin))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

export {
  taskHtmlLint,
  taskHtmlMin,
};
