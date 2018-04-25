var gulp = require('gulp');
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
var sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');

gulp.task('build', ['generate-images', 'generate-app-icon', 'copy-html', 'styles', 'scripts']);

gulp.task('copy-html', function () {
    gulp.src(['**/*.html', '**/*.json', '!node_modules/**/*', '!server/**/*', '!dist/**/*'])
        .pipe(gulp.dest('dist'));
});
gulp.task('watch:html', function () {
    gulp.watch([
        '**/*.html',
        '**/*.json',
        '!node_modules/**/*', '!server/**/*', '!dist/**/*'
    ], ['copy-html']);
});
gulp.task('generate-app-icon', function () {
    gulp.src('img/icon/udacity-icon.png')
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant(),imageminJpegtran()]
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 48
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-1x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 96
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-2x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 48
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-4x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
});
gulp.task('generate-images', function () {
    gulp.src(['img/**/*.{jpg,png}', '!img/icon/**/*'])
        .pipe(imageResize({
            width: 350
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-small';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src(['img/**/*.{jpg,png}', '!img/icon/**/*'])
        .pipe(imageResize({
            width: 640
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-medium';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src(['img/**/*.{jpg,png}', '!img/icon/**/*'])
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src(['img/**/*.svg'])
        .pipe(gulp.dest('dist/img'));
});
gulp.task('minify', function () {
    gulp.src(['**/*.js', '!gulpfile.js','!spec/**/*.js', '!node_modules/**/*', '!server/**/*', '!dist/**/*'])
        .pipe(sourcemaps.init())
        //.pipe(concat('main.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});
gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**/*', '!server/**/*', '!dist/**/*'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('scripts', ['lint', 'minify']);
gulp.task('watch:js', function () {
    gulp.watch([
        '**/*.js',
        '!node_modules/**/*', '!server/**/*', '!dist/**/*'
    ], ['scripts']);
});

gulp.task('styles', function () {
    gulp.src(['sass/**/main.scss'])
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
gulp.task('default', ['build', 'watch:html', 'watch:css', 'watch:js'], function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        serveStaticOptions: {
            extensions: ['html', 'css', 'js']
        },
        port: 8000
    });
    gulp.watch(['dist/**/*'])
        .on('change', browserSync.reload);
});