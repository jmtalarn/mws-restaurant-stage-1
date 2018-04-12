var gulp = require('gulp');
var serve = require('gulp-serve');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['generate-images', 'styles', 'lint', 'serve']);

gulp.task('serve', serve({
    port: 8000
}));

gulp.task('generate-images', function () {
    gulp.src('img-src/**/*.{jpg,png}')
        .pipe(imageResize({
            width: 350
        }))
        .pipe(rename(function (path) {
            path.basename += '-small';
        }))
        .pipe(gulp.dest('img'));
    gulp.src('img-src/**/*.{jpg,png}')
        .pipe(imageResize({
            width: 640
        }))
        .pipe(rename(function (path) {
            path.basename += '-medium';
        }))
        .pipe(gulp.dest('img'));
    gulp.src('img-src/**/*.{jpg,png}')
        .pipe(gulp.dest('img'));
});

gulp.task('lint', function () {
    return gulp.src([ '**/*.js', '!node_modules/**/*' ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('watch:js', function () {
    gulp.watch([
        '**/*.js',
        '!node_modules/**/*'
    ], ['lint'])
});

gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest('./css'));
})
gulp.task('watch:css', function () {
    gulp.watch('sass/**/*.scss', ['styles'])
});

// Static server
gulp.task('watch', ['watch:css', 'watch:js'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 8000
    });
    gulp.watch(['**/*.html', '**/*.js', '**/*.css','!node_modules/**/*.*'])
        .on('change', browserSync.reload);
});