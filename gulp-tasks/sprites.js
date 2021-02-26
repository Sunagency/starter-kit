/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import svg from 'gulp-svg-sprite';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import { paths } from '../gulpfile.babel';

gulp.task('sprites', () => gulp.src(paths.sprites.src)
  .pipe(svg({
    shape: {
      dest: 'intermediate-svg',
    },
    mode: {
      stack: {
        sprite: '../sprite.svg',
      },
    },
  }))
  .pipe(gulp.dest(paths.sprites.dist))
  .pipe(debug({
    title: 'Sprites',
  }))
  .on('end', browsersync.reload));
