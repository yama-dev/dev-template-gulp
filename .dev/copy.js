/**
 * IMPORT MODULES
 */
import CONFIG        from './config';
import { src, dest } from 'gulp';
import ignore        from 'gulp-ignore';

/**
 * Copy Task
 */
let taskCopy = ()=>{
  let _target = CONFIG.deployDirectory.slice();

  return src(_target)
    .pipe(ignore.include({isFile: true}))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

export default taskCopy;
