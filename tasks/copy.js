'use strict';
var gulp = require('gulp');
var vars = require('./variables');

module.exports = function () {
  return gulp
    .src(vars.paths.dev.html)
    .pipe(gulp.dest(vars.paths.prod.html));
};
