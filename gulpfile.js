var gulp = require('gulp');
var serve = require('gulp-serve');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var uglify = composer(uglifyes, console);


gulp.task('default', ['generate-images', 'copy-html', 'styles', 'scripts', 'tests', 'serve']);

gulp.task('serve', serve({
    baseDir: './dist',
    port: 8000
}));

gulp.task('copy-html', function () {
    gulp.src(['**/*.html', '!node_modules/**/*'])
        .pipe(gulp.dest('dist'));
});
gulp.task('generate-images', function () {
    gulp.src('img/**/*.{jpg,png}')
        .pipe(imageResize({
            width: 350
        }))
        .pipe(rename(function (path) {
            path.basename += '-small';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src('img/**/*.{jpg,png}')
        .pipe(imageResize({
            width: 640
        }))
        .pipe(rename(function (path) {
            path.basename += '-medium';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src('img/**/*.{jpg,png}')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('minify', function () {
    gulp.src(['js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('minify-sw', function(){
    gulp.src(['./sw.js'])
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**/*'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('scripts', ['lint', 'minify', 'minify-sw']);
gulp.task('watch:js', function () {
    gulp.watch([
        '**/*.js',
        '!node_modules/**/*'
    ], ['scripts']);
});

gulp.task('styles', function () {
    gulp.src('sass/**/main.scss')
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('watch:css', function () {
    gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('tests', function () {

    gulp.src(['spec/**/*.js'])
        .pipe(debug())
        .pipe(jasmine({
            verbose: true,
            integration: true,
            vendor: ['js/**/*.js']
        }));

});

// Static server
gulp.task('watch', ['tests', 'watch:css', 'watch:js'], function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 8000
    });
    gulp.watch(['**/*.html', '**/*.js', '**/*.css', '!node_modules/**/*.*'], ['copy-html'])
        .on('change', browserSync.reload);
});