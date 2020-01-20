/**
 * IMPORT MODULES
 */
import CONFIG from './config';
import notifier       from 'node-notifier';

import { src, dest } from 'gulp';

import sass           from 'gulp-sass';
import sassCompiler   from 'node-sass';
sass.compiler = sassCompiler;
import postcss        from 'gulp-postcss';
import pixrem         from 'pixrem';
import postcssOpacity from 'postcss-opacity';
import autoprefixer   from 'autoprefixer';
import cssnano        from 'cssnano';
import cssSorter      from 'css-declaration-sorter';

import cache          from 'gulp-cached';
import plumber        from 'gulp-plumber';

/**
 * Sass Task
 */
const taskSass = (isRefresh = false) => {

  let _target = CONFIG.watchIgnoreDirectory.sass.slice();
  _target.unshift(CONFIG.watchDirectory.sass);

  let sourcemaps = false;
  if(CONFIG.user.sourcemaps === true || CONFIG.user.sourcemap === true){
    sourcemaps = true;
  } else if(CONFIG.user.sourcemaps === false || CONFIG.user.sourcemap === false){
    sourcemaps = false;
  }
  if(CONFIG.env.sourcemaps === true || CONFIG.env.sourcemap === true){
    sourcemaps = true;
  } else if(CONFIG.env.sourcemaps === false || CONFIG.env.sourcemap === false){
    sourcemaps = false;
  }
  if(CONFIG.env.production == true || CONFIG.env.prod == true) sourcemaps = false;

  if(isRefresh === true) cache.caches = {};

  const _config_sass = {
    outputStyle: 'expanded', //nested, compact, compressed, expanded.
    indentType: 'space',
    indentWidth: 2,
    precision: 3
  };

  let _config_postcss = [
    cssSorter({order: 'concentric-css'}),
    autoprefixer(),
    pixrem(),
    postcssOpacity()
  ];

  if(CONFIG.env.cssmin) _config_postcss.push( cssnano({autoprefixer: false}) );

  return src(_target, { sourcemaps: sourcemaps })
    .pipe(cache('sass'))
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'Sass コンパイル エラー', message: error.message });
      }
    }))
    .pipe(sass(_config_sass).on('error', sass.logError))
    .pipe(postcss(_config_postcss))
    .pipe(dest(CONFIG.outputDirectory.dev, { sourcemaps: '.' }));
};

export default taskSass;
