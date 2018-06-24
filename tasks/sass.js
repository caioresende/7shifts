'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps')
var importCss = require('gulp-import-css');
var moduleImporter = require('sass-module-importer');
var browserSync = require('browser-sync');
var vars = require('./variables');

module.exports = function () {
  return gulp
    .src(vars.paths.dev.css)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        importer: moduleImporter(),
        outputStyle: 'expanded',
        indentWidth: 2
      })
      .on('error', sass.logError)
    )
    .pipe(importCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/stylesheets'))
    .pipe(browserSync.reload({ stream: true}));
};
