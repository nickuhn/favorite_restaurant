'use strict';

var gulp   = require('gulp');
var mocha  = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');

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

gulp.task('copy', function() {
  return gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.html', 'app/**/*.css'], ['copy'])
});

gulp.task('build', ['webpack:dev', 'copy', 'watch']);
gulp.task('default', ['build']);
