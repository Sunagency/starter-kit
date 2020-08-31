
import gulp from 'gulp';
import debug from 'gulp-debug';
import { paths } from '../gulpfile.babel';

gulp.task('gzip', () => gulp.src(paths.gzip.src)
  .pipe(gulp.dest(paths.gzip.dist))
  .pipe(debug({
    title: 'GZIP config',
  })));
