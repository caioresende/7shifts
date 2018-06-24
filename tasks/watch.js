// tasks/watch.js

'use strict';

var gulp = require('gulp');

module.exports = function () {
  gulp.watch([
    'app/**/*.js',
    '!app/bundle.js',
    'app/**/*.html'
  ], ['bundle']);

  gulp.watch(
    'assets/**/*.scss',
    ['sass']);

    return;
};
