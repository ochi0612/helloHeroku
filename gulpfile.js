// gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var themeDir = '';

// 以下を追記
gulp.task('sass', function () {
    return gulp.src(themeDir + '/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest(themeDir));
});

gulp.task('default', ['sass'], function () {
    gulp.watch(themeDir + '/sass/*.scss', ['sass']);
});