/**
 * IMPORT MODULES
 */
import CONFIG from '../config/index.js';
import { exec } from 'child_process';
// import fs from 'fs';

/**
 * Twig Task
 */
let taskTwig = (done)=>{

  // Set php-twig server.
  let _config = {};
  _config = {
    twig: false,
    bin: 'php',
    host: '127.0.0.1',
    port: '3333',
    router: '_twig/router.php'
  };
  if(CONFIG.user.twig) _config.twig = CONFIG.user.twig;
  if(CONFIG.env.twig) _config.twig = CONFIG.env.twig;

  // BOOT.
  if(_config.twig){
    const stdout = exec(`cd ${CONFIG.outputDirectory.dev} && ${_config.bin} -S ${_config.host}:${_config.port} ${_config.router}`, (err, stdout, stderr) => {
      if (err) { console.log('[dev-template] '+err); }
      done();
    });
  } else {
    console.log('[dev-template] Twig Server. Boot failure.');
    done();
  }
};

export default taskTwig;
