'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
 
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', notify.onError(function(error) {
            return "Error";
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});


gulp.task('sass:watch', ['sass'], function () {
    livereload.listen();
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});