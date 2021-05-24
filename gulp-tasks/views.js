import gulp from 'gulp';
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
      arr: [1, 2, 3, 4, 5],
    },
  }))
  .pipe(gulp.dest(paths.views.dist))
  .pipe(browsersync.stream()));
