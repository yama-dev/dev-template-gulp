'use strict';

/**
 * CLIでの引数を判定
 */
let argv = process.argv.slice(2);
let param = new Object();
argv.forEach(function(item,i){
  if(i % 2 === 0 && /\-\-/.test(item) && !/\-\-/.test(argv[i+1])) param[item] = argv[i+1];
});

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
    js      : [
      '!' + CONFIG_PATH.src + '**/vender/*.js',
      '!' + CONFIG_PATH.src + '**/libs/*.js'
    ]
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
 * Js Task
 */
gulp.task('js', function() {
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
      "env": {
        "browser": true,
        "es6": true
      },
      "rules": {
        "comma-dangle": [1, "never"],
        "no-console": 1,
        "eol-last": 0,
        "block-scoped-var": 0,
        "complexity": 1,
        "consistent-return": 1,
        "default-case": 1,
        "eqeqeq": 1,
        "no-alert": 1,
        "no-caller": 1,
        "no-eval": 2,
        "no-new": 0,
        "no-new-func": 1,
        "no-proto": 1,
        "no-script-url": 1,
        "no-self-compare": 1,
        "no-void": 1,
        "camelcase": [2, {"properties": "always"}],
        "no-array-constructor": 1,
        "quotes": [2, "single"],
        "no-unused-vars": 1,
        "space-after-keywords": 0,
        "space-infix-ops": 0,
        "space-return-throw-case": 0,
        "comma-spacing": 0,
        "prefer-const": 0,
        "no-undef": 0,
        "curly": 0
      },
      "ecmaFeatures": {
        "arrowFunctions": true,
        "binaryLiterals": true,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": true,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": true,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": true,
        "regexUFlag": true,
        "regexYFlag": true,
        "restParams": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodeCodePointEscapes": true,
        "globalReturn": true,
        "jsx": true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(browserSync.reload({stream:true}));
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
 * Watch Task
 */
gulp.task('watch',['server'], function() {

  // Set Watch Tasks.
  gulp.watch(CONFIG.watchDirectory.html,['htmllint']);
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
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
gulp.task('server', function() {

  // Set BrowserSync server.
  if(param['--proxy']){
    browserSync({
      proxy: param['--proxy']
    });
  } else {
    browserSync({
      server: {
        baseDir: CONFIG.outputDirectory.dev
      }
    });
  }

  // Browser reload.
  gulp.watch(CONFIG.watchDirectory.html, browserSync.reload);
  gulp.watch(CONFIG.watchDirectory.php, browserSync.reload);

});

/**
 * Default Task
 */
gulp.task('default', function(callback) {
  return runSequence(['sass','htmllint','js'],'watch',callback);
});

/**
 * Release Task
 */
gulp.task('release', function() {

  // Copy Release files.
  gulp.src([CONFIG.outputDirectory.dev+'**/*','!**/*.scss','!**/*.es6'])
    .pipe(gulp.dest(CONFIG.outputDirectory.release))

  gulp.src('').pipe(notify({
    title: 'Finished Release-Task',
    message: new Date(),
    sound: 'Glass'
  }));

});
