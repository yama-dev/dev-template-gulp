/**
 * IMPORT MODULES
 */
import CONFIG from '../dev/config';
import { src, dest } from 'gulp';
import uglify         from 'gulp-uglify';
import rename         from 'gulp-rename';

/**
 * Minify Task Min
 */
let taskJsMin = () => {
  let _target = CONFIG.watchIgnoreDirectory.js.slice();
  _target.unshift(CONFIG.watchDirectory.js);

  return src(_target)
    .pipe(uglify({ output: { ascii_only: true } }))
    .pipe(dest(CONFIG.outputDirectory.dev));
};

export default taskJsMin;
