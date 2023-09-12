/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import notifier       from 'node-notifier';

import { src, dest } from 'gulp';

import gulpSass from 'gulp-sass';
// import nodeSass from 'node-sass';
import dartSass from 'sass';
// const sass = gulpSass(nodeSass);
const sass = gulpSass(dartSass);

import postcss        from 'gulp-postcss';
import autoprefixer   from 'autoprefixer';
import cssnano        from 'cssnano';
import cssSorter      from 'css-declaration-sorter';
import postcssCombineMediaQuery from 'postcss-combine-media-query';

import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssColorHexAlpha from 'postcss-color-hex-alpha';


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
  if(CONFIG.env.sourcemaps === true){
    sourcemaps = true;
  }
  if(CONFIG.env.sourcemaps === false){
    sourcemaps = false;
  }
  if(CONFIG.env.production == true || CONFIG.env.prod == true){
    sourcemaps = false;
  }

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

  if(CONFIG.env.cssCascade === true){
    _config_autoprefixer.cascade = true;
  }

  let _config_postcss = [
    postcssCustomMedia,
    postcssCustomSelectors,
    postcssMediaMinmax,
    postcssColorHexAlpha,
  ];

  if(CONFIG.env.cssSortPropaty){
    _config_postcss.push( cssSorter({order: 'concentric-css'}) );
  }

  if(CONFIG.env.cssMergeMediaQuery){
    _config_postcss.push( postcssCombineMediaQuery() );
  }

  _config_postcss = [
    ..._config_postcss,
    autoprefixer(_config_autoprefixer),
  ];

  if(CONFIG.env.cssMin){
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
