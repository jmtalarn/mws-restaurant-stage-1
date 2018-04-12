var gulp=require("gulp"),serve=require("gulp-serve"),imageResize=require("gulp-image-resize"),rename=require("gulp-rename"),browserSync=require("browser-sync").create(),eslint=require("gulp-eslint"),jasmine=require("gulp-jasmine-phantom"),debug=require("gulp-debug"),concat=require("gulp-concat"),uglify=require("gulp-uglify"),sass=require("gulp-sass"),autoprefixer=require("gulp-autoprefixer"),uglifyjs=require("uglify-es"),composer=require("gulp-uglify/composer"),pump=require("pump"),minify=composer(uglifyjs,console);gulp.task("default",["generate-images","copy-html","styles","scripts","tests","serve"]),gulp.task("serve",serve({baseDir:"./dist",port:8e3})),gulp.task("copy-html",function(){gulp.src(["**/*.html","!node_modules/**/*"]).pipe(gulp.dest("dist"))}),gulp.task("generate-images",function(){gulp.src("img/**/*.{jpg,png}").pipe(imageResize({width:350})).pipe(rename(function(e){e.basename+="-small"})).pipe(gulp.dest("dist/img")),gulp.src("img/**/*.{jpg,png}").pipe(imageResize({width:640})).pipe(rename(function(e){e.basename+="-medium"})).pipe(gulp.dest("dist/img")),gulp.src("img/**/*.{jpg,png}").pipe(gulp.dest("dist/img"))}),gulp.task("minify",function(e){pump([gulp.src(["**/*.js","!node_modules/**/*"]),minify({}),gulp.dest("dist")],e)}),gulp.task("lint",function(){return gulp.src(["**/*.js","!node_modules/**/*"]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failOnError())}),gulp.task("scripts",["lint","minify"]),gulp.task("watch:js",function(){gulp.watch(["**/*.js","!node_modules/**/*"],["scripts"])}),gulp.task("styles",function(){gulp.src("sass/**/main.scss").pipe(sass({outputStyle:"compressed"}).on("error",sass.logError)).pipe(autoprefixer({browsers:["last 2 versions","ie 8","ie 9"]})).pipe(gulp.dest("dist/css"))}),gulp.task("watch:css",function(){gulp.watch("sass/**/*.scss",["styles"])}),gulp.task("tests",function(){gulp.src(["spec/**/*.js"]).pipe(debug()).pipe(jasmine({verbose:!0,integration:!0,vendor:["js/**/*.js"]}))}),gulp.task("watch",["tests","watch:css","watch:js"],function(){browserSync.init({server:{baseDir:"./dist"},port:8e3}),gulp.watch(["**/*.html","**/*.js","**/*.css","!node_modules/**/*.*"],["copy-html"]).on("change",browserSync.reload)});