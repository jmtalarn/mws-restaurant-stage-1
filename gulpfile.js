var gulp = require('gulp');
var serve = require('gulp-serve');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

gulp.task('default', ['generate-images', 'serve']);

gulp.task('serve', serve({
    port: 8000
}));

gulp.task('generate-images', function () {
    gulp.src("img-src/**/*.{jpg,png}")
        .pipe(imageResize({
            width: 350
        }))
        .pipe(rename(function (path) {
            path.basename += "-small";
        }))
        .pipe(gulp.dest("img"));
    gulp.src("img-src/**/*.{jpg,png}")
        .pipe(imageResize({
            width: 640
        }))
        .pipe(rename(function (path) {
            path.basename += "-medium";
        }))
        .pipe(gulp.dest("img"));
    gulp.src("img-src/**/*.{jpg,png}")
        .pipe(gulp.dest("img"))
});