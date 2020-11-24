/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import { exec } from 'child_process';

/**
 * Php Task
 */
let taskPhp = (done)=>{

  // Set php server.
  let _config = {};
  _config = {
    php: false,
    bin: 'php',
    host: '127.0.0.1',
    port: '3333',
    baseDir: CONFIG.outputDirectory.dev
  };
  if(CONFIG.user.php) _config.php = CONFIG.user.php;
  if(CONFIG.env.php) _config.php = CONFIG.env.php;

  // BOOT.
  if(_config.php){
    const stdout = exec(`${_config.bin} -S ${_config.host}:${_config.port} -t ${_config.baseDir}`, (err, stdout, stderr) => {
      if (err) { console.log('[dev-template] '+err); }
      done();
    });
  } else {
    console.log('[dev-template] PHP Server. Boot failure.');
    done();
  }
};

export default taskPhp;
