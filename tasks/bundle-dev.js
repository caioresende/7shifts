// tasks/bundle.js

'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var stringify = require('stringify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var ngannotate = require('browserify-ngannotate');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var vars = require('./variables');

var bundler = watchify(browserify(vars.paths.dev.js, Object.assign(watchify.args, {
  debug: true,
  fast: true

}))
  .transform(stringify, {
    appliesTo: { includeExtensions: ['.html'] },
    minify: false
  })
  .transform(ngannotate));
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler
    .bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
    .pipe(buffer())
    //
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ stream: true}));
}


module.exports = bundle;
