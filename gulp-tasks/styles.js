import gulp from 'gulp';
import gulpif from 'gulp-if';

import groupmedia from 'gulp-group-css-media-queries';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';
import postcss from 'gulp-postcss';
import nested from 'postcss-nested';
import cssImport from 'postcss-import';
import cssNext from 'postcss-preset-env';
import cssMixin from 'postcss-mixins';
import cssGlobImport from 'postcss-easy-import';
import cssUtil from 'postcss-utilities';
import sassVar from 'postcss-simple-vars';
import { paths } from '../gulpfile.babel';

const { argv } = yargs;
const production = !!argv.production;
const plugins = [
  cssGlobImport(),
  cssMixin(),
  cssUtil(),
  sassVar(),
  nested,
  autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 1%'],
  }),
  cssNext({
    stage: 1,
    features: {
      'nesting-rules': false,
    },
  }),
];

gulp.task('styles', () => gulp.src(paths.styles.src)

  .pipe(gulpif(!production, sourcemaps.init()))
  .pipe(postcss(plugins))
  .pipe(groupmedia())
  .pipe(gulpif(!production, sourcemaps.write('./maps/')))
  .pipe(gulp.dest(paths.styles.dist))
  .pipe(browsersync.stream()));
