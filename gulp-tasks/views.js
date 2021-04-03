import gulp from 'gulp';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';
import browsersync from 'browser-sync';
import yargs from 'yargs';
import include from 'gulp-file-include';
import { paths } from '../gulpfile.babel';

const { argv } = yargs;
const production = !!argv.production;

gulp.task('views', () => gulp.src(paths.views.src)
  .pipe(include({
    prefix: '@@',
    basepath: '@file',
    context: {
      arr: ['test1', 'test2'],
    },
  }))
  .pipe(gulpif(production, replace('.css', '.min.css')))
  .pipe(gulpif(production, replace('.js', '.min.js')))
  .pipe(gulp.dest(paths.views.dist))
  .pipe(browsersync.stream()));
