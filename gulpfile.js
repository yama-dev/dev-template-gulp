'use strict';
/**
 * 環境設定
 */
var CONFIG_PATH = {
  src     : './src/',
  release : './release/',
  cms     : './cms/',
  php     : './php/',
  twig    : './src_twig/'
};
var CONFIG = {
  outputDirectory: {
    dev     : CONFIG_PATH.src,
    release : CONFIG_PATH.release
  },
  sourceDirectory: {
    sass    : CONFIG_PATH.src + '**/*.scss',
    js      : CONFIG_PATH.src + '**/*.js'
  },
  watchDirectory: {
    html    : CONFIG_PATH.src + '**/*.html',
    php     : CONFIG_PATH.src + '**/*.php',
    css     : CONFIG_PATH.src + '**/*.css',
    sass    : CONFIG_PATH.src + '**/*.scss',
    js      : CONFIG_PATH.src + '**/*.js'
  },
  watchIgnoreDirectory: {
    js      : '!' + CONFIG_PATH.src + '**/libs/*.js'
  }
};
const SASS_AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ios >= 8',
  'android >= 4.4',
  'last 2 versions'
];
const SASS_OUTPUT_STYLE = 'expanded'; //nested, compact, compressed, expanded.

/**
 * IMPORT MODULES
 */
const gulp         = require('gulp');
const cache        = require('gulp-cached');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb      = require('gulp-csscomb');
const plumber      = require('gulp-plumber');
const htmlhint     = require('gulp-htmlhint');
const notify       = require("gulp-notify");
const replace      = require("gulp-replace");
const browserSync  = require('browser-sync');
const runSequence  = require('run-sequence');
const eslint       = require('gulp-eslint');

/**
 * Sass Task
 */
gulp.task('sass', function() {
  gulp.src(CONFIG.sourceDirectory.sass)
    .pipe(cache('sass'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Sass コンパイル エラー",
        message: "<%= error.message %>"
      })
    }))
    .pipe(sass({outputStyle: SASS_OUTPUT_STYLE}))
    .pipe(csscomb())
    .pipe(postcss([
      require('autoprefixer')({browsers: SASS_AUTOPREFIXER_BROWSERS}),
      require('css-mqpacker')
    ]))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev))
    .pipe(browserSync.reload({stream:true}));
});

/**
 * HtmlLint Task
 */
gulp.task('htmllint', function() {
  return gulp.src([CONFIG.watchDirectory.html])
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "HTML LINT エラー",
        message: "<%= error.message %>"
      })
    }))
    .pipe(htmlhint({
      "tagname-lowercase": true,
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "attr-value-not-empty": false,
      "attr-no-duplication": true,
      "doctype-first": true,
      "tag-pair": true,
      "tag-self-close": false,
      "spec-char-escape": true,
      "id-unique": true,
      "src-not-empty": true,
      "alt-require": true,
      "head-script-disabled": false,
      "img-alt-require": true,
      "doctype-html5": true,
      "id-class-value": "false",
      "style-disabled": false,
      "space-tab-mixed-disabled": true,
      "id-class-ad-disabled": true,
      "href-abs-or-rel": false,
      "attr-unsafe-chars": true
    }))
    .pipe(htmlhint.reporter('htmlhint-stylish'))
});

/**
 * Twig Task
 * replace php-tag -> twig-tag
 */
gulp.task('php-twig', function(callback) {
  return runSequence('php-twig-movefiles','php-twig-replace',callback);
});
gulp.task('php-twig-movefiles', function(){
  gulp.src([CONFIG.outputDirectory.dev+'**/*','!**/*.html','!**/*.scss','!**/*.es6'])
    .pipe(gulp.dest(CONFIG_PATH.twig))
});
gulp.task('php-twig-replace', function(){
  gulp.src('./src/**/sp/**/*.html')
    .pipe(replace(/\<\?php include \"\.{1,2}(.*)\";? \?\>/g, '{% include "/html/sp$1" %}'))
    .pipe(gulp.dest(CONFIG_PATH.twig))
  gulp.src(['./src/**/*.html','!./src/**/sp/**/*.html'])
    .pipe(replace(/\<\?php include \"\.{1,2}(.*)\";? \?\>/g, '{% include "/html$1" %}'))
    .pipe(gulp.dest(CONFIG_PATH.twig))
});

/**
 * Reload Task
 */
gulp.task('reload',function() {
  gulp.src().pipe(browserSync.reload({stream:true}));
});

/**
 * Watch Task
 */
gulp.task('watch',['server'], function() {
  gulp.watch(CONFIG.watchDirectory.html,['htmllint']);
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
  gulp.watch(CONFIG.watchDirectory.js, browserSync.reload);
  gulp.src('').pipe(notify({
    title: 'Start Gulp',
    message: new Date(),
    sound: 'Glass'
  }));
});

/**
 * Server Task
 */
gulp.task('server', function() {
    browserSync({
      server: {
        baseDir: CONFIG.outputDirectory.dev
      }
    });
  gulp.watch(CONFIG.watchDirectory.html, browserSync.reload);
  gulp.watch(CONFIG.watchDirectory.php, browserSync.reload);
});

/**
 * Default Task
 */
gulp.task('default', function(callback) {
  return runSequence(['sass','htmllint'],'watch',callback);
});

/**
 * Release Task
 */
gulp.task('release', function() {
  gulp.src([CONFIG.outputDirectory.dev+'**/*','!**/*.scss','!**/*.es6'])
    .pipe(gulp.dest(CONFIG.outputDirectory.release))
  gulp.src('').pipe(notify({
    title: 'Finished Release-Task',
    message: new Date(),
    sound: 'Glass'
  }));
});
