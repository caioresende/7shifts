// gulpfile.js

'use strict';

var gulp = require('gulp');

gulp.task('watch', require('./tasks/watch'));
gulp.task('bundle', require('./tasks/bundle'));
gulp.task('bundle-prod', require('./tasks/bundle-prod'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('sass-prod', require('./tasks/sass-prod'));
gulp.task('sync', require('./tasks/sync'));
gulp.task('copy-index', require('./tasks/copy'));

gulp.task('default', ['sass', 'bundle', 'watch', 'sync']);
gulp.task('buildProd', ['sass-prod', 'bundle-prod', 'copy-index']);
