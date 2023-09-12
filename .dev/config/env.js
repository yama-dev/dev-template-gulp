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

  source: 'src/',
  sourceBuild: '',
};

// .config.jsonのデータを取得
let _user = {};
try {
  _user = fs.readFileSync('./.config.json', 'utf8');
  _user = JSON.parse(String(_user));
} catch (e) {
  console.log('[dev-template] not use .config.json');
}

// 全データをマージ
let _env = {
  ..._env_default,
  ..._user,
};

// 入力フォルダと出力フォルダを調整
if(_user.inputDirectory){
  _env.source = _user.inputDirectory;
  _env.sourceBuild = _user.inputDirectory;
}
if(_user.outputDirectory){
  _env.sourceBuild = _user.outputDirectory;
}

// CLIのパラメータを調整
const ARGV = process.argv.slice(2);
ARGV.map((item,i)=>{
  if(/--/.test(item)){
    let _item = item.replace('--','');
    if(ARGV[i+1]){
      if(!/--/.test(ARGV[i+1])) _env[_item] = ARGV[i+1];
      else _env[_item] = true;
      let _env_item = _env[_item] === 'false' ? false : _env[_item];
      if(_env_item === 'true') _env_item = true;
      _env[_item] = _env_item;
    } else {
      _env[_item] = true;
    }
  }
});

if(!_env.sourceBuild){
  _env.sourceBuild = _env.source;
}

export let CONFIG_USER = _user;
export let CONFIG_ENV = _env;
