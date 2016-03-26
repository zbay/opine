var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var exec = require('child_process').exec;

gulp.task('default', function() {
  var bundler = watchify(browserify({
    entries: ['./src/App.jsx'],
    transform: [reactify],
    extensions: ['.jsx', '.scss'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  
gulp.src('src/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/css/'));

  function build(file) {
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('public/js/main.js'))
      .pipe(gulp.dest('./'));
  };
  
  function serve(){
    console.log("serving");
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  exec('mongod --smallfiles', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  }
  
  build();
  serve();
  bundler.on('update', build);
});