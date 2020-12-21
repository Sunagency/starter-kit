
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import yargs from 'yargs';
import { paths } from '../gulpfile.babel';

const { argv } = yargs;
const production = !!argv.production;

gulp.task('images', () => gulp.src(paths.images.src)
  .pipe(gulpif(production, imagemin([
    imageminPngquant({
      speed: 5,
      quality: [0.6, 0.8],
    }),
    imageminZopfli({
      more: true,
    }),
    imageminMozjpeg({
      progressive: true,
      quality: 90,
    }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { removeUnusedNS: false },
        { removeUselessStrokeAndFill: false },
        { cleanupIDs: false },
        { removeComments: true },
        { removeEmptyAttrs: true },
        { removeEmptyText: true },
        { collapseGroups: true },
      ],
    }),
  ])))
  .pipe(gulp.dest(paths.images.dist))
  .pipe(debug({
    title: 'Images',
  }))
  .on('end', browsersync.reload));
