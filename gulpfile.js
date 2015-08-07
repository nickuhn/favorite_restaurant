'use strict';

var gulp   = require('gulp');
var mocha  = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('test', function() {
  return gulp.src('test/*.js')
             .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function() {
  return gulp.src(['*js', 'routes/*js', 'models/*js'])
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma_tests/entry.js')
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma_tests/'));
});


gulp.task('copy', function() {
  return gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.html', 'app/**/*.css'], ['copy'])
});

gulp.task('karmatest', function(done)  {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build', ['webpack:dev', 'webpack:test', 'copy', 'watch']);
gulp.task('default', ['build']);
