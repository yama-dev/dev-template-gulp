let _env = {
  sourcemaps: false,

  htmlLint: true,

  php: false,

  jsLint: true,
  jsMin: false,
  hide: false,
  obfuscator: false,
  obfuscatorMax: false,

  cssMin: false, // https://github.com/cssnano/cssnano
  cssSortPropaty: true, // https://github.com/Siilwyn/css-declaration-sorter
  cssMergeMediaQuery: true, // https://github.com/SassNinja/postcss-combine-media-query
};

const ARGV = process.argv.slice(2);
ARGV.map((item,i)=>{
  if(/--/.test(item)){
    let _item = item.replace('--','');
    if(ARGV[i+1]){
      if(!/--/.test(ARGV[i+1])) _env[_item] = ARGV[i+1];
      else _env[_item] = true;
      _env[_item] = _env[_item] === 'false' ? false : _env[_item];
    } else {
      _env[_item] = true;
    }
  }
});

export let CONFIG_ENV = _env;
