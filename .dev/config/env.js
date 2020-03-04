let _env = {
  htmllint: true,
  jslint: true
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
