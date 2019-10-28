// gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var themeDir = '';

// 以下を追記
gulp.task('sass', function () {
    return gulp.src('sass/style.scss') // コンパイル後の読込先
        .pipe(sass())
        .pipe(gulp.dest('./')); // コンパイル結果のディレクトリ
});

gulp.task('default', ['sass'], function () {
    gulp.watch('sass/*.scss', ['sass']); // ファイルが更新されるたび動かす
});