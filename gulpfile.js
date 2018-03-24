const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass and inject into the browser

gulp.task('sass', function() {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

//move js
gulp.task('js', function() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'nod_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

// watch saas & server

gulp.task('serve', ['sass'], function() {
  browserSync.init({ server: './src' });
  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
    ['sass']
  );
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

//move fonts awesome
gulp.task('fonts', function() {
  return gulp
    .src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('fa', function() {
  return gulp
    .src(['node_modules/font-awesome/fonts/css/font-awesome.min.css'])
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
