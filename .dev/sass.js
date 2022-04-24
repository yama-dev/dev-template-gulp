/**
 * IMPORT MODULES
 */
import CONFIG from './config';
import notifier       from 'node-notifier';

import { src, dest } from 'gulp';

import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import dartSass from 'sass';
// const sass = gulpSass(nodeSass);
const sass = gulpSass(dartSass);

import postcss        from 'gulp-postcss';
import pixrem         from 'pixrem';
import autoprefixer   from 'autoprefixer';
import cssnano        from 'cssnano';
import cssSorter      from 'css-declaration-sorter';
import postcssCombineMediaQuery from 'postcss-combine-media-query';

import cache          from 'gulp-cached';
import plumber        from 'gulp-plumber';

/**
 * Sass Task
 */
const taskSass = (isRefresh = false) => {

  // Delete Cache.
  if(isRefresh === true) cache.caches = {};

  // Sourcemap setting.
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

  const _config_sass = {
    outputStyle: 'expanded', //nested, compact, compressed, expanded.
    indentType: 'space',
    indentWidth: 2,
    precision: 3
  };

  const _config_autoprefixer = {
    grid: true,
    cascade: false
  };

  let _config_postcss = [];

  if(CONFIG.env.cssSortPropaty || CONFIG.user.cssSortPropaty){
    _config_postcss.push( cssSorter({order: 'concentric-css'}) );
  }

  if(CONFIG.env.cssMergeMediaQuery || CONFIG.user.cssMergeMediaQuery){
    _config_postcss.push( postcssCombineMediaQuery() );
  }

  _config_postcss = [
    ..._config_postcss,
    autoprefixer(_config_autoprefixer),
    pixrem(),
  ];

  if(CONFIG.env.cssMin || CONFIG.user.cssMin){
    _config_postcss.push( cssnano({autoprefixer: false}) );
  }

  let _target = CONFIG.watchIgnoreDirectory.sass.slice();
  _target.unshift(CONFIG.watchDirectory.sass);

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
