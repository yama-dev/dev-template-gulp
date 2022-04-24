let _env = {
  sourcemaps: null,

  htmlLint: true,
  htmlMin: null,

  php: false,

  jsLint: true,
  jsMin: false,
  hide: false,
  obfuscator: false,
  obfuscatorMax: false,

  cssMin: null, // https://github.com/cssnano/cssnano
  cssSortPropaty: null, // https://github.com/Siilwyn/css-declaration-sorter
  cssMergeMediaQuery: null, // https://github.com/SassNinja/postcss-combine-media-query
  cssCascade: null,
};

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

export let CONFIG_ENV = _env;
