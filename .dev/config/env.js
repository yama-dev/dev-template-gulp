import fs from 'fs';

/**
 * @typedef _envType
 * @property {boolean | null} sourcemaps
 * @property {boolean | null} htmlLint
 * @property {boolean | null} htmlMin
 * @property {boolean} php
 * @property {boolean} jsLint
 * @property {boolean} jsMin
 * @property {boolean} hide
 * @property {boolean} obfuscator
 * @property {boolean} obfuscatorMax
 * @property {boolean} cssMin
 * @property {boolean} cssSortPropaty
 * @property {boolean} cssMergeMediaQuery
 * @property {boolean} cssCascade
 *
 * @property {boolean} twig
 * @property {boolean} silent
 * @property {boolean} webpack
 * @property {string}  webpackConfig
 *
 * @property {string} proxy
 * @property {string} host
 * @property {string} startPath
 *
 * @property {object} ejs
 *
 * @property {boolean} develop
 * @property {boolean} production
 *
 * @property {string} config
 *
 * @property {string} source
 * @property {string} sourceBuild
 */

/**
 * @type {_envType} _env_default
 */
let _env_default = {
  sourcemaps: false,

  htmlLint: true,
  htmlMin: false,

  php: false,

  jsLint: true,
  jsMin: false,
  hide: false,
  obfuscator: false,
  obfuscatorMax: false,

  cssMin: false, // https://github.com/cssnano/cssnano
  cssSortPropaty: false, // https://github.com/Siilwyn/css-declaration-sorter
  cssMergeMediaQuery: false, // https://github.com/SassNinja/postcss-combine-media-query
  cssCascade: false,

  twig: false,
  silent: false,
  webpack: false,
  webpackConfig: '',

  proxy: '',
  host: '',
  startPath: '',

  ejs: {},

  develop: true,
  production: false,

  config: './.config.json',

  source: 'src/',
  sourceBuild: '',
};

let _env_stdin = {};
// CLIのパラメータを調整
const ARGV = process.argv.slice(2);
ARGV.map((item,i)=>{
  if(/--/.test(item)){
    let _item = item.replace('--','');
    if(ARGV[i+1]){
      if(!/--/.test(ARGV[i+1])) _env_stdin[_item] = ARGV[i+1];
      else _env_stdin[_item] = true;
      let _env_item = _env_stdin[_item] === 'false' ? false : _env_stdin[_item];
      if(_env_item === 'true') _env_item = true;
      _env_stdin[_item] = _env_item;
    } else {
      _env_stdin[_item] = true;
    }
  }
});

// .config.jsonのデータを取得
let _user = {};
try {
  let _config_file = _env_stdin.config ? _env_stdin.config : _env_default.config;
  _user = fs.readFileSync(_config_file, 'utf8');
  _user = JSON.parse(String(_user));
  console.log('[dev-template] use .config.json');
} catch (e) {
  console.log('[dev-template] not use .config.json');
}

// 入力フォルダと出力フォルダを調整
if(_user.inputDirectory){
  _user.source = _user.inputDirectory;
}
if(_user.outputDirectory){
  _user.sourceBuild = _user.outputDirectory;
}

// 設定をマージ
let _env = {
  ..._env_default,
  ..._user,
  ..._env_stdin,
};

if(!_env_stdin.sourceBuild && !_user.sourceBuild){
  _env.sourceBuild = _env.source.replace(/\/$/,'')+'/';
}

// 末尾を調整
if(_env.source){
  _env.source = _env.source.replace(/\/$/,'')+'/';
}
if(_env.sourceBuild){
  _env.sourceBuild = _env.sourceBuild.replace(/\/$/,'')+'/';
}

export let CONFIG_USER = _user;
export let CONFIG_ENV = _env;
