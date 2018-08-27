'use strict';

const pkg = require('./package.json');
console.log('-'.repeat(38) + '\n'+pkg.name + ' version:' + pkg.version + '\n'+'-'.repeat(38));

/**
 * CLIでの引数を判定
 */
const argv = process.argv.slice(2);
let param = new Object();
argv.forEach((item,i)=>{
  if(i % 2 === 0 && /\-\-/.test(item) && !/\-\-/.test(argv[i+1])) param[item] = argv[i+1];
});

/**
 * 環境設定
 */
const CONFIG_PATH = {
  src     : 'src/',
  release : 'release/',
  cms     : 'cms/',
  php     : 'php/'
};
const CONFIG = {
  outputDirectory: {
    dev     : CONFIG_PATH.src,
    release : CONFIG_PATH.release
  },
  sourceDirectory: {
    sass    : CONFIG_PATH.src + '**/*.scss',
    js      : CONFIG_PATH.src + '**/*.js',
    es6     : CONFIG_PATH.src + '**/*.es6'
  },
  watchDirectory: {
    html    : CONFIG_PATH.src + '**/*.html',
    php     : CONFIG_PATH.src + '**/*.php',
    css     : CONFIG_PATH.src + '**/*.css',
    sass    : CONFIG_PATH.src + '**/*.scss',
    js      : CONFIG_PATH.src + '**/*.js',
    es6     : CONFIG_PATH.src + '**/*.es6'
  },
  watchIgnoreDirectory: {
    js      : [
      '!' + CONFIG_PATH.src + '**/vender/*.js',
      '!' + CONFIG_PATH.src + '**/libs/*.js'
    ]
  }
};
const SASS_AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ios >= 8',
  'android >= 4.4',
  'last 2 versions'
];
const SASS_OUTPUT_STYLE = 'expanded'; //nested, compact, compressed, expanded.

/**
 * IMPORT MODULES
 */
const gulp           = require('gulp');
const sass           = require('gulp-sass');
const postcss        = require('gulp-postcss');
const csscomb        = require('gulp-csscomb');
const babel          = require("gulp-babel");
const eslint         = require('gulp-eslint');
const htmlhint       = require('gulp-htmlhint');
const cache          = require('gulp-cached');
const plumber        = require('gulp-plumber');
const notify         = require("gulp-notify");
const ignore         = require("gulp-ignore");
const pixrem         = require('pixrem');
const postcssOpacity = require('postcss-opacity');
const autoprefixer   = require('autoprefixer');
const cssMqpacker    = require('css-mqpacker');
const browserSync    = require('browser-sync').create();
const runSequence    = require('run-sequence');

/**
 * Sass Task
 */
gulp.task('sass', ()=>{
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
      autoprefixer({browsers: SASS_AUTOPREFIXER_BROWSERS}),
      cssMqpacker(),
      pixrem(),
      postcssOpacity()
    ]))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * HtmlLint Task
 */
gulp.task('htmllint', ()=>{
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
 * Js Task
 */
gulp.task('js_babel', ()=>{
  return gulp.src([ CONFIG.sourceDirectory.es6 ])
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Js エラー",
        message: "<%= error.message %>"
      })
    }))
    .pipe(babel())
    .pipe(gulp.dest(CONFIG.outputDirectory.dev))
});

/**
 * Js Task
 */
gulp.task('js', ()=>{
  return gulp.src([
      CONFIG.sourceDirectory.js,
      CONFIG.watchIgnoreDirectory.js[0],
      CONFIG.watchIgnoreDirectory.js[1]
    ])
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Js エラー",
        message: "<%= error.message %>"
      })
    }))
    .pipe(eslint({
      globals: [
        'jQuery',
        '$'
      ],
      "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": "script",
        "ecmaFeatures": {}
      },
      envs: [
        'browser'
      ],
      "rules": {
        "comma-dangle": 1,
        "no-cond-assign": 1,
        "no-console": 1,
        "no-constant-condition": 1,
        "no-control-regex": 1,
        "no-debugger": 1,
        "no-dupe-args": 1,
        "no-dupe-keys": 1,
        "no-duplicate-case": 1,
        "no-empty-character-class": 1,
        "no-empty": 1,
        "no-ex-assign": 1,
        "no-extra-boolean-cast": 1,
        "no-extra-parens": 1,
        "no-extra-semi": 1,
        "no-func-assign": 1,
        "no-inner-declarations": 1,
        "no-invalid-regexp": 1,
        "no-irregular-whitespace": 1,
        "no-negated-in-lhs": 1,
        "no-obj-calls": 1,
        "no-regex-spaces": 1,
        "no-sparse-arrays": 1,
        "no-unreachable": 1,
        "use-isnan": 1,
        "valid-typeof": 1,
        "eqeqeq": 1,
        "no-fallthrough": 1,
        "no-octal": 1,
        "no-redeclare": 1,
        "no-delete-var": 1,
        "no-undef": 1,
        "no-unused-vars": 1,
        "no-mixed-spaces-and-tabs": 1
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

/**
 * Watch Task
 */
gulp.task('watch',['server'], ()=>{

  // Set Watch Tasks.
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
  gulp.watch(CONFIG.watchDirectory.es6,['js_babel']);
  gulp.watch(CONFIG.watchDirectory.html,['htmllint']);
  gulp.watch(CONFIG.watchDirectory.js,['js']);

  gulp.src('').pipe(notify({
    title: 'Start Gulp',
    message: new Date(),
    sound: 'Glass'
  }));

});

/**
 * Server Task
 */
gulp.task('server', ()=>{

  // Set BrowserSync server.
  if(param['--proxy']){
    browserSync.init({
      proxy: param['--proxy']
    });
  } else {
    browserSync.init({
      server: {
        baseDir: CONFIG.outputDirectory.dev
      }
    });
  }

  // Browser reload.
  gulp.watch(CONFIG.watchDirectory.html, browserSync.reload);
  gulp.watch(CONFIG.watchDirectory.js, browserSync.reload);
  gulp.watch(CONFIG.watchDirectory.php, browserSync.reload);
  gulp.watch(CONFIG.watchDirectory.css, ()=>{
    gulp.src(CONFIG.watchDirectory.css).pipe(browserSync.stream());
  });

});

/**
 * Default Task
 */
gulp.task('default', (callback)=>{
  return runSequence(['js_babel','sass'],['htmllint','js'],'watch',callback);
});

/**
 * Release Task
 */
gulp.task('release', ()=>{

  // Copy Release files.
  gulp.src([CONFIG.outputDirectory.dev+'**/*','!'+CONFIG.outputDirectory.dev+'**/_*','!**/*.scss','!**/*.es6'])
    .pipe(ignore.include({isFile: true}))
    .pipe(gulp.dest(CONFIG.outputDirectory.release))

  gulp.src('').pipe(notify({
    title: 'Finished Release-Task',
    message: new Date(),
    sound: 'Glass'
  }));

});
