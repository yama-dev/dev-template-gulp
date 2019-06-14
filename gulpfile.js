/*!
 * DEV TEMPLATE GULP
 * Version 0.9.2
 * Repository https://github.com/yama-dev/dev-template-gulp
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

const pkg = require('./package.json');
console.log('-'.repeat(38) + '\n'+pkg.name + ' version:' + pkg.version + '\n'+'-'.repeat(38));

/**
 * 環境設定
 */
let CONFIG_USER = {}, CONFIG_PATH = {}, CONFIG = {};

try {
  CONFIG_USER = require('./.config.json');
} catch (e) {
}

CONFIG_PATH = {
  source      : 'src/',
  sourceBuild : '',
  release     : 'release/'
};

if(CONFIG_USER.inputDirectory){
  CONFIG_PATH.source = CONFIG_USER.inputDirectory;
}
if(CONFIG_USER.outputDirectory){
  CONFIG_PATH.sourceBuild = CONFIG_USER.outputDirectory;
} else {
  CONFIG_PATH.sourceBuild = CONFIG_PATH.source;
}

CONFIG = {
  outputDirectory: {
    dev     : CONFIG_PATH.sourceBuild,
    release : CONFIG_PATH.release
  },
  watchDirectory: {
    html    : CONFIG_PATH.sourceBuild + '**/*.html',
    ejs     : CONFIG_PATH.source + '**/*.ejs',
    pug     : CONFIG_PATH.source + '**/*.pug',
    php     : CONFIG_PATH.sourceBuild + '**/*.php',
    css     : CONFIG_PATH.sourceBuild + '**/*.css',
    sass    : CONFIG_PATH.source + '**/*.scss',
    js      : CONFIG_PATH.sourceBuild + '**/*.js',
    es7     : CONFIG_PATH.source + '**/*.es7',
    es6     : CONFIG_PATH.source + '**/*.es6',
    es      : CONFIG_PATH.source + '**/*.es'
  },
  watchIgnoreDirectory: {
    html : [
      '!' + CONFIG_PATH.source + '**/wp/**/*.html',
      '!' + CONFIG_PATH.source + '**/vender/**/*.html',
      '!' + CONFIG_PATH.source + '**/vendor/**/*.html',
      '!' + CONFIG_PATH.source + '**/inc/**/*.html',
      '!' + CONFIG_PATH.source + '**/include/**/*.html',
      '!' + CONFIG_PATH.source + '**/ssi/**/*.html',
      '!' + CONFIG_PATH.source + '_**/*.html'
    ],
    ejs : [
      '!' + CONFIG_PATH.source + '**/_*.ejs'
    ],
    pug : [
      '!' + CONFIG_PATH.source + '**/_*.pug'
    ],
    sass : [
      '!' + CONFIG_PATH.source + '**/wp/**/*.scss',
      '!' + CONFIG_PATH.source + '**/vender/**/*.scss',
      '!' + CONFIG_PATH.source + '**/vendor/**/*.scss',
      '!' + CONFIG_PATH.source + '**/lib/**/*.scss',
      '!' + CONFIG_PATH.source + '**/libs/**/*.scss'
    ],
    js : [
      '!' + CONFIG_PATH.source + '**/wp/**/*.js',
      '!' + CONFIG_PATH.source + '**/vender/**/*.js',
      '!' + CONFIG_PATH.source + '**/vendor/**/*.js',
      '!' + CONFIG_PATH.source + '**/lib/**/*.js',
      '!' + CONFIG_PATH.source + '**/libs/**/*.js',
      '!' + CONFIG_PATH.source + '**/*.min.js',
    ]
  },
  deployDirectory: [
    CONFIG_PATH.source + '**/*',
    '!' + CONFIG_PATH.source + '_*/**',
    '!' + CONFIG_PATH.source + 'vender/**',
    '!' + CONFIG_PATH.source + 'vendor/**',
    '!' + CONFIG_PATH.source + '**/*.ejs',
    '!' + CONFIG_PATH.source + '**/*.pug',
    '!' + CONFIG_PATH.source + '**/_*.css',
    '!' + CONFIG_PATH.source + '**/*.scss',
    '!' + CONFIG_PATH.source + '**/*.es6',
    '!' + CONFIG_PATH.source + '**/*.es'
  ]
};

/**
 * IMPORT MODULES
 */
const gulp           = require('gulp');

const htmlhint       = require('gulp-htmlhint');
const htmlmin        = require('gulp-htmlmin');
const ejs            = require('gulp-ejs');
const pug            = require('gulp-pug');

const sass           = require('gulp-sass');
sass.compiler        = require('node-sass');
const postcss        = require('gulp-postcss');
const pixrem         = require('pixrem');
const postcssOpacity = require('postcss-opacity');
const autoprefixer   = require('autoprefixer');
const cssMqpacker    = require('css-mqpacker');
const cssnano        = require('cssnano');
const cssSorter      = require('css-declaration-sorter');

const babel          = require('gulp-babel');
const eslint         = require('gulp-eslint');
const uglify         = require('gulp-uglify');

const rename         = require('gulp-rename');
const cache          = require('gulp-cached');
const progeny        = require('gulp-progeny');
const plumber        = require('gulp-plumber');
const ignore         = require('gulp-ignore');

const notifier       = require('node-notifier');
const browserSync    = require('browser-sync').create();
const runSequence    = require('run-sequence');
runSequence.options.ignoreUndefinedTasks = true;
const streamUtil     = require('@yama-dev/gulp-stream-util');

/**
 * Set Add Task
 */
const argv = process.argv.slice(2);
let param = new Object();
param['--htmllint'] = true;
param['--jslint'] = true;
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
let taskListAdd = [];
if(param['--htmlmin'] && param['--htmlmin'] != 'false' && param['--htmlmin'] != 'null') taskListAdd.push('html_min');
if(param['--htmllint'] && param['--htmllint'] != 'false' && param['--htmllint'] != 'null') taskListAdd.push('html_lint');
if(param['--jsmin'] && param['--jsmin'] != 'false' && param['--jsmin'] != 'null') taskListAdd.push('js_min');
if(param['--jslint'] && param['--jslint'] != 'false' && param['--jslint'] != 'null') taskListAdd.push('js_lint');
if(CONFIG_USER.outputDirectory) taskListAdd.push('copy');

/**
 * Ejs Task
 */
gulp.task('ejs', function buildHTML(){
  let _target = CONFIG.watchIgnoreDirectory.ejs.slice();
  _target.unshift(CONFIG.watchDirectory.ejs);

  let _config_ejs_data = {};
  if(CONFIG_USER.ejs) _config_ejs_data = { ejs: CONFIG_USER.ejs };

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'EJS エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(streamUtil(function(){
      if(CONFIG_USER.ejs){
        let _current_data = _config_ejs_data.ejs.pages.find(item => item.slug == this.dir);
        if(_current_data) _config_ejs_data.ejs.current = _current_data;
      }
    }))
    .pipe(ejs(_config_ejs_data, {}, { ext: '' }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Pug Task
 */
gulp.task('pug', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.pug.slice();
  _target.unshift(CONFIG.watchDirectory.pug);

  let _config_pug = {
    pretty: true
  };

  return gulp.src(_target)
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
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Sass Task
 */
gulp.task('sass', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.sass.slice();
  _target.unshift(CONFIG.watchDirectory.sass);

  const _config_sass = {
    outputStyle: 'expanded', //nested, compact, compressed, expanded.
    indentType: 'space',
    indentWidth: 2,
    precision: 3
  };
  let _config_postcss = [
    cssSorter({order: 'concentric-css'}),
    autoprefixer(),
    cssMqpacker(),
    pixrem(),
    postcssOpacity()
  ];
  if(param['--cssmin']) _config_postcss.push( cssnano({autoprefixer: false}) );

  return gulp.src(_target)
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
    .pipe(sass(_config_sass).on('error', sass.logError))
    .pipe(postcss(_config_postcss))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * HtmlLint Task
 */
gulp.task('html_lint', ()=>{

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

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error) {
        notifier.notify({ title: 'HTML LINT エラー', message: error.message });
        this.emit('end');
      }
    }))
    .pipe(htmlhint(_config_htmllist))
    .pipe(htmlhint.reporter());
});

/**
 * Minify Task */
gulp.task('html_min', ()=>{
  const _config_htmlmin = {
    collapseWhitespace: true,
    preserveLineBreaks: true
  };

  let _target = CONFIG.watchIgnoreDirectory.html.slice();
  _target.unshift(CONFIG.watchDirectory.html);

  return gulp.src(_target)
    .pipe(htmlmin(_config_htmlmin))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Js Task
 */
gulp.task('js_babel', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.es6);
  _target.unshift(CONFIG.watchDirectory.es);

  return gulp.src(_target)
    .pipe(plumber({
      errorHandler(error){
        notifier.notify({ title: 'BABEL コンパイル エラー', message: error.message });
      }
    }))
    .pipe(babel())
    .on('error', function(e) {
      console.log('>>> ERROR', e);
      this.emit('end');
    })
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Js Task
 */
gulp.task('js_lint', ()=>{
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.js);

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
  _target.unshift(CONFIG.watchDirectory.js);

  return gulp.src(_target)
    .pipe(uglify({ output: { ascii_only: true } }))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
});

/**
 * Watch Task
 */
gulp.task('watch',['server'], ()=>{

  // Set Watch Tasks.
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
  gulp.watch(CONFIG.watchDirectory.es6,['js_babel']);
  gulp.watch(CONFIG.watchDirectory.es,['js_babel']);
  gulp.watch(CONFIG.watchDirectory.ejs,['ejs']);
  gulp.watch(CONFIG.watchDirectory.pug,['pug']);

  notifier.notify({ title: 'Start Gulp', message: new Date(), sound: 'Glass' });

});

/**
 * Server Task
 */
gulp.task('server', ()=>{

  // Set BrowserSync server.
  let _config_bs = {};
  if(param['--proxy']){
    _config_bs = {
      proxy: param['--proxy'],
      reloadDelay: 300
    };
  } else {
    _config_bs = {
      reloadDelay: 300,
      server: {
        baseDir: CONFIG.outputDirectory.dev
      }
    };
  }
  if(CONFIG_USER.host){
    _config_bs.host = CONFIG_USER.host;
  }
  browserSync.init(_config_bs);

  // COPY.
  if(CONFIG_USER.outputDirectory){
    let _target = CONFIG.deployDirectory.slice();
    gulp.watch(_target,['copy']);
  }

  // HTML.
  let _target_html = CONFIG.watchIgnoreDirectory.html.slice();
  _target_html.unshift(CONFIG.watchDirectory.html);
  if(taskListAdd.find(item => item =='html_min')){
    gulp.watch(_target_html,['html_min']);
  } else {
    if(taskListAdd.find(item => item =='html_lint')){
      gulp.watch(_target_html,['html_lint']);
    }
    gulp.watch(_target_html, browserSync.reload);
  }

  // PHP.
  gulp.watch(CONFIG.watchDirectory.php, browserSync.reload);

  // JS.
  if(taskListAdd.find(item => item =='js_min')){
    gulp.watch(CONFIG.watchDirectory.js,['js_min']);
  } else {
    if(taskListAdd.find(item => item =='js_lint')){
      gulp.watch(CONFIG.watchDirectory.js,['js_lint']);
    }
  }
  gulp.watch(CONFIG.watchDirectory.js, browserSync.reload);

  // CSS.
  gulp.watch(CONFIG.watchDirectory.css, (file)=>{
    gulp.src(file.path).pipe(browserSync.stream());
  });

  if(CONFIG_USER.outputDirectory){
    browserSync.reload();
  }

});

/**
 * Copy Task
 */
gulp.task('copy', ()=>{
  notifier.notify({ title: 'Copy', message: new Date(), sound: 'Glass' });

  let _target = CONFIG.deployDirectory.slice();

  return gulp.src(_target)
    .pipe(ignore.include({isFile: true}))
    .pipe(gulp.dest(CONFIG.outputDirectory.dev));
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
  if(!taskListAdd.length){
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], 'watch', callback);
  } else {
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], taskListAdd, 'watch', callback);
  }
});

/**
 * Release Task
 */
gulp.task('release', (callback)=>{
  if(!taskListAdd.length){
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], 'deploy', callback);
  } else {
    return runSequence(['ejs', 'pug', 'sass', 'js_babel'], taskListAdd, 'deploy', callback);
  }
});

