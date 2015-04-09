// Regular NPM dependencies
var argv = require('minimist')(process.argv.slice(2));
var del = require('del');
var fs = require('fs');
var path = require('path');

// Gulp dependencies
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var favicons = require('favicons');
var ghPages = require('gh-pages');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var swPrecache = require('sw-precache');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var CONFIG = {
  is_release: !!argv.release
};


gulp.task('clean', function() {
  del.sync(['./dist']);
});


gulp.task('copy-js-libs', function () {
    return gulp.src('./lib/**/*.js')
        .pipe(gulp.dest('./dist/js/lib'));
});


gulp.task('favicons', ['build-html'], function (done) {
  favicons({
    files: {
      src: 'src/img/logo.png',
      dest: 'dist',
      html: './dist/index.html'
    },
    icons: {
      android: true,
      apple: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: true,
      windows: false,
      yandex: false
    },
    settings: {
      background: '#000000',
      appName: 'Shapez',
      appDescription: 'Shape drawing game for kids',
      developer: 'Euan Goddard',
      index: 'index.html',
      url: 'https://shapez.euans.space'
    }
  }, done);
});


gulp.task('build-js', function () {
    return gulp.src('./src/js/**/*.es6')
        .pipe(babel({
            modules: 'amd',
            moduleIds: true
        }))
        // .pipe(rename(function (path) {
        //     path.extname = ".js"
        // }))
        .pipe(concat('main.js'))
        .pipe(gulpif(CONFIG.is_release, uglify()))
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('sass', function () {
  var output_style = CONFIG.is_release ? 'compressed' : 'expanded';

  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: output_style
    }))
    .pipe(autoprefixer({browsers: [
        'last 2 versions'
    ]}))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('build-html', ['build-js', 'copy-js-libs', 'sass'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src([
    './dist/css/**/*.css'
  ], {read: false});

  return target.pipe(inject(sources, {ignorePath: '/dist/'}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('serve', function () {
  return gulp.src('./dist')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      port: 8000,
      directoryListing: false
    }));
});


gulp.task('generate-service-worker', ['build'], function (callback) {
  var rootDir = 'dist';

  swPrecache({
    staticFileGlobs: [rootDir + '/**/*.{js,html,css}'],
    stripPrefix: rootDir
  }, function(error, swFileContents) {
    if (error) {
      return callback(error);
    }
    fs.writeFile(path.join(rootDir, 'service-worker.js'), swFileContents, callback);
  });
});

gulp.task('gh-pages', ['generate-service-worker', 'build', 'favicons'], function (callback) {
  fs.writeFileSync(path.join(__dirname, 'dist', 'CNAME'), 'shapez.euans.space');
  ghPages.publish(path.join(__dirname, 'dist'), callback);
});


gulp.task('build', ['build-html']);


gulp.task('watch', ['build'], function () {
    gulp.watch('./src/**/*', ['build']);
});


gulp.task('default', ['build']);
