// gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');  //プラグインの定義
var themeDir = '';

// 以下を追記
gulp.task('sass', function () {
    return gulp.src('lib/sass/style.scss') // コンパイル後の読込先
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    }))  //autoprefixerの実行
    .pipe(gulp.dest('./')) // コンパイル結果のディレクトリ
});

gulp.task('default', ['sass'], function () {
    gulp.watch('lib/sass/*.scss', ['sass']); // ファイルが更新されるたび動かす
});