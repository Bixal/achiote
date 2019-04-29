var gulp = require('gulp'),
  sass = require('gulp-sass'),
  eslint = require('gulp-eslint'),
  scsslint = require('gulp-sass-lint'),
  cache = require('gulp-cached'),
  prefix = require('autoprefixer'),
  notify = require('gulp-notify'),
  postcss = require('gulp-postcss'),
  imagemin = require('gulp-imagemin'),
  iconfont = require('gulp-iconfont'),
  iconfontCSS = require('gulp-iconfont-css'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  plumber = require('gulp-plumber'),
  sassGlob = require('gulp-sass-glob'),
  babel = require('gulp-babel'),
  stylemark = require('stylemark'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  beeper = require('beeper'),
  pa11y = require('pa11y'),
  runTimestamp = Math.round(Date.now() / 1000);

// Prefix with project code
var fontName = 'icons';

var project_url = 'your-project-url';

// Paths
var paths = {
  styles: ['scss/**/*.scss'],
  styleguide: ['styleguide/src/**/*'],
  scripts: ['js/*.js'],
  images: {
    src: './images/**/*',
    svg: './images/icons/*.svg'
  }
};

gulp.task('scss', () => {
  return gulp
    .src('scss/styles.scss')
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'Gulp error in ' + err.plugin,
            message: err.toString()
          })(err);
          beeper();
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(cssnano({ zindex: false }))
    .pipe(
      postcss([
        prefix({
          browsers: ['last 3 versions'],
          cascade: false
        })
      ])
    )
    .pipe(sourcemaps.write('../css/maps'))
    .pipe(gulp.dest('css'))
    .pipe(reload({ stream: true }));
});

gulp.task('scsslint', () => {
  return gulp
    .src(paths.styles)
    .pipe(
      scsslint({
        options: {
          configFile: 'sass-lint.yml'
        }
      })
    )
    .pipe(scsslint.format())
    .pipe(scsslint.failOnError());
});

gulp.task('styleguide', async done => {
  stylemark({
    // Markdown files
    input: 'styleguide/src',
    output: 'styleguide/dist',
    configPath: 'stylemark.yml'
  });
  browserSync.reload();
  done();
});

gulp.task('optimize-images', () => {
  return gulp.src(paths.images.src, { base: '.' }).pipe(imagemin());
});

gulp.task('iconfont', () => {
  return gulp
    .src(paths.images.svg)
    .pipe(
      iconfontCSS({
        fontName: fontName,
        path: './scss/templates/icons.scss',
        targetPath: '../scss/global/_icons.scss',
        fontPath: '../fonts/',
        cacheBuster: runTimestamp
      })
    )
    .pipe(
      iconfont({
        fontName: fontName,
        // Remove woff2 if you get an ext error on compile
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
        fontHeight: 1001,
        prependUnicode: true,
        timestamp: runTimestamp
      })
    )
    .pipe(gulp.dest('./fonts/'));
});

gulp.task('eslint', () => {
  return gulp
    .src(paths.scripts)
    .pipe(
      eslint({
        parser: 'babel-eslint',
        rules: {
          'no-mutable-exports': 0
        },
        globals: ['jQuery', '$'],
        envs: ['browser']
      })
    )
    .pipe(eslint.format());
});

gulp.task('scripts', () => {
  return gulp
    .src(paths.scripts)
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: 'Gulp error in ' + err.plugin,
            message: err.toString()
          })(err);
          beeper();
        }
      })
    )
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('js/dist'))
    .pipe(reload({ stream: true }));
});

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    proxy: {
      // Update this with your project's local url
      target: project_url
    }
  });
});

// Accessibility testing
gulp.task('test-accessibility', () => {
  return pa11y(project_url, {
    standard: 'Section508',
    userAgent: 'A11Y TESTS',
    timeout: 4000
  }).then(results => {
    results.issues.length ? log(results) : log('Congrats, no issues found!');
  });
});

gulp.task('build-styles', gulp.series('scss', 'scsslint', 'styleguide'));
gulp.task('build-scripts', gulp.series('scripts', 'eslint'));
gulp.task(
  'build-icons',
  gulp.series('optimize-images', 'iconfont', 'build-styles')
);

gulp.task('watch', () => {
  gulp.watch(paths.styles, gulp.series('build-styles')).on('change', reload);
  gulp.watch(paths.scripts, gulp.series('build-scripts')).on('change', reload);
  gulp
    .watch(paths.styleguide, gulp.series('build-styles'))
    .on('change', reload);
});

gulp.task(
  'build',
  gulp.parallel('build-styles', 'build-scripts', 'build-icons')
);

gulp.task('default', gulp.parallel('build-styles', 'browser-sync', 'watch'));
