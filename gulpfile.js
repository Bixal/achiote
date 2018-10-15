var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('autoprefixer'),
    notify      = require('gulp-notify'),
    postcss     = require('gulp-postcss'),
    imagemin    = require('gulp-imagemin'),
    iconfont    = require('gulp-iconfont'),
    iconfontCSS = require('gulp-iconfont-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssnano     = require('gulp-cssnano');
    // babel
    // sass linting
    // js linting

// Prefix with project code
var fontName = 'icons';

gulp.task('scss', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>"
    }))
    .pipe(cssnano({zindex: false}))
    .pipe(sourcemaps.write())
    .pipe(postcss([ prefix({ browsers: ['last 2 versions'], cascade: false }) ]))
    .pipe(gulp.dest('css'));
});

gulp.task('optimize-images', function() {
  gulp.src('./images/**/*', {base: '.'})
    .pipe(imagemin());
});

gulp.task('iconfont', function() {
  gulp.src(['./images/icons/*.svg'])
    .pipe(iconfontCSS({
      fontName: fontName,
      path: './scss/templates/icons.scss',
      targetPath: '../scss/global/_icons.scss',
      fontPath: '../fonts/',
    }))
    .pipe(iconfont({
      fontName: fontName,
      // Remove woff2 if you get an ext error on compile
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest('./fonts/'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('icons', ['optimize-images', 'iconfont', 'scss']);
gulp.task('build', ['icons']);
gulp.task('default', ['scss', 'watch']);
