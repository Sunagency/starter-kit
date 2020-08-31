
import gulp from 'gulp';

const requireDir = require('require-dir');

const paths = {
  views: {
    src: [
      './src/views/**/*.html',
      './src/views/pages/*.html',
    ],
    dist: './dist/',
    watch: [
      './src/blocks/**/*.html',
      './src/views/**/*.html',
    ],
  },
  styles: {
    src: './src/styles/main.css',
    dist: './dist/styles/',
    watch: [
      './src/blocks/**/*.css',
      './src/styles/**/*.css',
    ],
  },
  scripts: {
    src: './src/js/index.js',
    dist: './dist/js/',
    watch: [
      './src/blocks/**/*.js',
      './src/js/**/*.js',
    ],
  },
  images: {
    src: [
      './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
      '!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}',
    ],
    dist: './dist/img/',
    watch: './src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
  },
  sprites: {
    src: './src/img/svg/*.svg',
    dist: './dist/img/sprites/',
    watch: './src/img/svg/*.svg',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2}',
    dist: './dist/fonts/',
    watch: './src/fonts/**/*.{woff,woff2}',
  },
  favicons: {
    src: './src/img/favicon/*.{jpg,jpeg,png,gif}',
    dist: './dist/img/favicons/',
  },
};

requireDir('./gulp-tasks/');

export { paths };

export const development = gulp.series('clean',
  gulp.parallel(['views', 'styles', 'scripts', 'images', 'sprites', 'fonts', 'favicons']),
  gulp.parallel('serve'));

export const prod = gulp.series('clean',
  gulp.series(['views', 'styles', 'scripts', 'images', 'sprites', 'fonts', 'favicons']));

export default development;
