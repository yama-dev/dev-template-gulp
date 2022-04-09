import fs from 'fs';

let _user = {}, _path = {};

try {
  _user = fs.readFileSync('./.config.json', 'utf8');
  _user = JSON.parse(String(_user));
} catch (e) {
  console.log('[dev-template] not use .config.json');
}

_path = {
  source      : 'src/',
  sourceBuild : '', // コンパイルデータが出力されるフォルダ
  release     : 'release/'
};

if(_user.inputDirectory){
  _path.source = _user.inputDirectory;
}

if(_user.outputDirectory){
  _path.sourceBuild = _user.outputDirectory;
} else {
  _path.sourceBuild = _path.source;
}

export let CONFIG_USER = _user;
export let CONFIG_PATH = _path;
