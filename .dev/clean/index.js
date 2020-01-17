/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import del from 'del';

/**
 * Clean Task
 */
let taskClean = (cd) => {
  let _target = CONFIG.cleanDirectory;

  return del(_target, cd);
};

export default taskClean;
