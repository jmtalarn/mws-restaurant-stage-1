const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine-phantom');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminSvgo = require('imagemin-svgo');
const inlineCss = require('gulp-inline-css');
const webp = require('gulp-webp');

gulp.task('build', ['generate-images', 'generate-app-icon', 'styles', 'copy-html','copy-json', 'scripts']);

gulp.task('copy-html',['styles'], function () {
    gulp.src(['src/**/*.html'])
    //.pipe(inlineCss())
        .pipe(gulp.dest('dist'));
});
gulp.task('copy-json', function () {
    gulp.src(['src/**/*.json'])
        .pipe(gulp.dest('dist'));
});
gulp.task('watch:html', function () {
    gulp.watch([
        'src/**/*.html',
        'src/**/*.json',
        '!node_modules/**/*', '!server/**/*', '!dist/**/*'
    ], ['copy-html']);
});
gulp.task('generate-app-icon', function () {
    gulp.src('src/img/icon/udacity-icon.png')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('src/img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 48
        }))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-1x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('src/img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 96
        }))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-2x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
    gulp.src('src/img/icon/udacity-icon.png')
        .pipe(imageResize({
            width: 48
        }))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [imageminPngquant()]
        }))
        .pipe(rename(function (path) {
            path.basename += '-4x';
        }))
        .pipe(gulp.dest('dist/img/icon'));
});
gulp.task('generate-images', function () {
    gulp.src(['src/img/**/*.{jpg,png}', '!src/img/icon/**/*'])
        .pipe(imageResize({
            width: 350
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant(), imageminJpegtran()]
        }))
        .pipe(webp())
        .pipe(rename(function (path) {
            path.basename += '-small';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src(['src/img/**/*.{jpg,png}', '!src/img/icon/**/*'])
        .pipe(imageResize({
            width: 640
        }))
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant(), imageminJpegtran()]
        }))
        .pipe(webp())
        .pipe(rename(function (path) {
            path.basename += '-medium';
        }))
        .pipe(gulp.dest('dist/img'));
    gulp.src(['src/img/**/*.{jpg,png}', '!src/img/icon/**/*'])
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant(), imageminJpegtran()]
        }))
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
    gulp.src(['src/img/**/*.svg'])
        .pipe(imagemin({
            use: [
                imageminSvgo({
                    plugins: [{
                        removeViewBox: false
                    }]
                })
            ]
        }))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('minify', function () {
    gulp.src(['src/**/*.js'])
        .pipe(sourcemaps.init())
        //.pipe(concat('main.js'))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});
gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
gulp.task('scripts', ['minify']);
gulp.task('watch:js', function () {
    gulp.watch([
        'src/**/*.js'
    ], ['scripts']);
});

gulp.task('styles', function () {
    return gulp.src(['src/sass/**/main.scss'])
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('watch:css', function () {
    gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('tests', ['lint'], function () {

    gulp.src(['spec/**/*.js'])
        .pipe(debug())
        .pipe(jasmine({
            verbose: true,
            integration: true,
            vendor: ['src/js/**/*.js']
        }));

});

// Static server
gulp.task('watch', ['build', 'watch:html', 'watch:css', 'watch:js'], function () {
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

gulp.task('default', ['watch']);

