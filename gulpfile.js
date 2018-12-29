/*!
 * DEV TEMPLATE GULP
 * Version 0.3.3
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

const pkg = require('./package.json');
console.log('-'.repeat(38) + '\n'+pkg.name + ' version:' + pkg.version + '\n'+'-'.repeat(38));

/**
 * CLIでの引数を判定
 */
const argv = process.argv.slice(2);
let param = new Object();
argv.map((item,i)=>{
  if(/--/.test(item)){
    if(argv[i+1]){
      if(!/--/.test(argv[i+1])) param[item] = argv[i+1];
      else param[item] = true;
    } else {
      param[item] = true;
    }
  }
});

/**
 * 環境設定
 */
const CONFIG_PATH = {
  src     : 'src/',
  release : 'release/',
  build   : 'build/',
  dist    : 'dist/'
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
    html : [
      '!' + CONFIG_PATH.src + '**/vender/**/*.html',
      '!' + CONFIG_PATH.src + '**/vendor/**/*.html',
      '!' + CONFIG_PATH.src + '**/inc/**/*.html',
      '!' + CONFIG_PATH.src + '**/include/**/*.html',
      '!' + CONFIG_PATH.src + '**/ssi/**/*.html',
      '!' + CONFIG_PATH.src + '_**/*.html'
    ],
    js : [
      '!' + CONFIG_PATH.src + '**/vender/**/*.js',
      '!' + CONFIG_PATH.src + '**/vendor/**/*.js',
      '!' + CONFIG_PATH.src + '**/lib/**/*.js',
      '!' + CONFIG_PATH.src + '**/libs/**/*.js'
    ]
  },
  deployDirectory: [
    CONFIG_PATH.src + '**/*',
    '!' + CONFIG_PATH.src + '_*/**',
    '!' + CONFIG_PATH.src + 'vender/**',
    '!' + CONFIG_PATH.src + 'vendor/**',
    '!' + CONFIG_PATH.src + '**/_*.css',
    '!' + CONFIG_PATH.src + '**/*.scss',
    '!' + CONFIG_PATH.src + '**/*.es6'
  ]
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
sass.compiler        = require('node-sass');
const postcss        = require('gulp-postcss');
const csscomb        = require('gulp-csscomb');
const babel          = require('gulp-babel');
const eslint         = require('gulp-eslint');
const htmlhint       = require('gulp-htmlhint');
const cache          = require('gulp-cached');
const progeny        = require('gulp-progeny');
const plumber        = require('gulp-plumber');
const ignore         = require('gulp-ignore');
const uglify         = require('gulp-uglify');
const notifier       = require('node-notifier');
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
  return gulp.src(CONFIG.sourceDirectory.sass)
    .pipe(cache('sass'))
    .pipe(progeny({
      multipass: [
        /@import[^;:]+;/g,
        /\s*['"][^'"]+['"]\s*,?/g,
        /(?:['"])([^'"]+)/
      ]
    }))
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'Sass コンパイル エラー', message: error.message });
      }
    }))
    .pipe(sass({outputStyle: SASS_OUTPUT_STYLE,indentType: 'space',indentWidth: 2,precision: 3}).on('error', sass.logError))
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
  let _target = CONFIG.watchIgnoreDirectory.html.slice();
  _target.unshift(CONFIG.watchDirectory.html);

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'HTML LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(htmlhint({
      'tagname-lowercase': true,
      'attr-lowercase': true,
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
      'id-class-value': 'false',
      'style-disabled': false,
      'space-tab-mixed-disabled': true,
      'id-class-ad-disabled': true,
      'href-abs-or-rel': false,
      'attr-unsafe-chars': true
    }))
    .pipe(htmlhint.reporter());
});

/**
 * Js Task
 */
gulp.task('js_babel', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.sourceDirectory.es6);

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error){
        notifier.notify({ title: 'BABEL コンパイル エラー', message: error.message });
      }
    }))
    .pipe(babel())
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Js Task
 */
gulp.task('js_lint', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.sourceDirectory.js);

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Minify Task */
gulp.task('js_min', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.sourceDirectory.js);

  if(param['--min']){
    return gulp.src(_target)
      .pipe(uglify({ output: { ascii_only: true } }))
      .pipe(gulp.dest(CONFIG.outputDirectory.dev));
  }
});

/**
 * Watch Task
 */
gulp.task('watch',['server'], ()=>{

  // Set Watch Tasks.
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
  gulp.watch(CONFIG.watchDirectory.es6,['js_babel']);
  gulp.watch(CONFIG.watchDirectory.html,['htmllint']);
  gulp.watch(CONFIG.watchDirectory.js,['js_lint']);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });

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
 * Deploy Task
 */
gulp.task('deploy', ()=>{
  notifier.notify({ title: 'Deploy', message: new Date(), sound: 'Glass' });

  let _target = CONFIG.deployDirectory.slice();

  return gulp.src(_target)
    .pipe(ignore.include({isFile: true}))
    .pipe(gulp.dest(CONFIG.outputDirectory.release));
});

/**
 * Default Task
 */
gulp.task('default', (callback)=>{
  return runSequence(['js_babel','sass'],['htmllint','js_lint'],'watch',callback);
});

/**
 * Release Task
 */
gulp.task('release', (callback)=>{
  return runSequence(['js_babel','sass'],['htmllint','js_lint'],'js_min','deploy',callback);
});
