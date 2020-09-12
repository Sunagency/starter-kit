const gulp = require('gulp');
const critical = require('critical').stream;

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
  return gulp
    .src('dist/*.html')
    .pipe(
      critical({
        base: 'dist/',
        inline: true,
        css: ['dist/styles/main.css'],
      })
    )
    .pipe(gulp.dest('dist'));
});
