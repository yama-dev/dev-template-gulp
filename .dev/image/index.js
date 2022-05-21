/**
 * IMPORT MODULES
 */
// import path from 'path';
import CONFIG        from '../config/index.js';
import { src, dest } from 'gulp';
import imagemin      from 'gulp-imagemin';
import ignore        from 'gulp-ignore';
import prompt        from 'gulp-prompt';

/**
 * Image Minify Task
 */
let taskImageMin = ()=>{
  let _target = CONFIG.imageMinDirectory.slice();

  let _output_dir = '';
  let _output_quality_jpg = '';
  let _output_optimizationLevel_png = '';
  let _output_optimizationLevel_gif = '';

  console.log('-'.repeat(38) + '\nImage Minify Task\n filetype: jpg, jpeg, png, gif, svg\n'+'-'.repeat(38));

  return src('./package.json')
    .pipe(prompt.prompt([
      {
        type: 'input',
        name: 'dir',
        message: 'Please output directory name.',
        default: `image_min_${Date.now()}`,
      },
      {
        type: 'input',
        name: 'quality',
        message: 'Please `jpg` quality. (0-100)',
        default: 75,
        validate: function(val){
          if(val > 100 || 0 > val){
            return false;
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'level_png',
        message: 'Please `png` optimization-level. (0-7)',
        default: 5,
        validate: function(val){
          if(val > 7 || 0 > val){
            return false;
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'level_gif',
        message: 'Please `gif` optimization-level. (1-3)',
        default: 1,
        validate: function(val){
          if(val > 3 || 1 > val){
            return false;
          }
          return true;
        }
      }
    ], function(res){
      if(res.dir) _output_dir = res.dir;
      if(res.quality) _output_quality_jpg = res.quality;
      if(res.level_png) _output_optimizationLevel_png = res.level_png;
      if(res.level_gif) _output_optimizationLevel_gif = res.level_gif;
      if(!res.dir) return false;
      return src(_target)
        .pipe(imagemin([
          imagemin.gifsicle({
            interlaced: true,
            optimizationLevel: _output_optimizationLevel_gif,
          }),
          imagemin.mozjpeg({
            quality: _output_quality_jpg,
            progressive: true,
          }),
          imagemin.optipng({
            optimizationLevel: _output_optimizationLevel_png,
          }),
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: true
              },
              {
                cleanupIDs: false
              }
            ]
          })
        ],{
          verbose: true
        }))
        .pipe(ignore.include({isFile: true}))
        .pipe(dest(_output_dir));
    }));
};

export default taskImageMin;
