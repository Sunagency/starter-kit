import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulp from 'gulp';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';
import { paths } from '../gulpfile.babel';

const webpackConfig = require('../webpack.config.js');

const { argv } = yargs;
const production = !!argv.production;

webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

gulp.task('scripts', () => gulp.src(paths.scripts.src)
  .pipe(webpackStream(webpackConfig), webpack)
  .pipe(gulp.dest(paths.scripts.dist))
  .pipe(debug({
    title: 'JS files',
  }))
  .on('end', browsersync.reload));
