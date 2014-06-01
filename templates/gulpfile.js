var gulp = require('gulp')
  , gutil = require('gulp-util')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , paths;

paths = {
  css:    'src/css/*.css', 
  libs:   [],
  js:     ['src/js/**/*.js'],
  build:   './build/'
};

gulp.task('clean', function () {
  gulp.src(paths.build, {read: false})
    .pipe(clean({force: true}))
    .on('error', gutil.log);
});

gulp.task('uglify', ['lint'], function () {
  var srcs = [paths.libs[0], paths.js[0]];

  gulp.src(srcs)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.build))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.build));
});

gulp.task('minifycss', function () {
 gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.build))
    .on('error', gutil.log);
});

gulp.task('processhtml', function() {
  gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.build))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', function() {
  gulp.src('build/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.build))
    .on('error', gutil.log);
});

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(['./src/index.html', paths.css, paths.js], ['html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['clean', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);

