var gulp=require("gulp"),imageResize=require("gulp-image-resize"),rename=require("gulp-rename"),browserSync=require("browser-sync").create(),eslint=require("gulp-eslint"),jasmine=require("gulp-jasmine-phantom"),debug=require("gulp-debug"),concat=require("gulp-concat"),sass=require("gulp-sass"),autoprefixer=require("gulp-autoprefixer"),uglifyes=require("uglify-es"),composer=require("gulp-uglify/composer"),uglify=composer(uglifyes,console),sourcemaps=require("gulp-sourcemaps");const imagemin=require("gulp-imagemin"),imageminPngquant=require("imagemin-pngquant");gulp.task("build",["generate-images","copy-html","styles","scripts"]),gulp.task("copy-html",function(){gulp.src(["**/*.html","!node_modules/**/*","!server/**/*","!dist/**/*"]).pipe(gulp.dest("dist"))}),gulp.task("watch:html",function(){gulp.watch(["**/*.html","!node_modules/**/*","!server/**/*","!dist/**/*"],["copy-html"])}),gulp.task("generate-images",function(){gulp.src("img/**/*.{jpg,png}").pipe(imageResize({width:350})).pipe(imagemin({progressive:!0,use:[imageminPngquant()]})).pipe(rename(function(e){e.basename+="-small"})).pipe(gulp.dest("dist/img")),gulp.src("img/**/*.{jpg,png}").pipe(imageResize({width:640})).pipe(imagemin({progressive:!0,use:[imageminPngquant()]})).pipe(rename(function(e){e.basename+="-medium"})).pipe(gulp.dest("dist/img")),gulp.src("img/**/*.{jpg,png}").pipe(imagemin({progressive:!0,use:[imageminPngquant()]})).pipe(gulp.dest("dist/img"))}),gulp.task("minify",function(){gulp.src(["**/*.js","!spec/**/*.js","!node_modules/**/*","!server/**/*","!dist/**/*"]).pipe(sourcemaps.init()).pipe(uglify().on("error",function(e){console.log(e)})).pipe(sourcemaps.write()).pipe(gulp.dest("dist"))}),gulp.task("lint",function(){return gulp.src(["**/*.js","!node_modules/**/*","!server/**/*","!dist/**/*"]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failOnError())}),gulp.task("scripts",["lint","minify"]),gulp.task("watch:js",function(){gulp.watch(["**/*.js","!node_modules/**/*","!server/**/*","!dist/**/*"],["scripts"])}),gulp.task("styles",function(){gulp.src("sass/**/main.scss").pipe(sass({outputStyle:"compressed"}).on("error",sass.logError)).pipe(autoprefixer({browsers:["last 2 versions","ie 8","ie 9"]})).pipe(gulp.dest("dist/css"))}),gulp.task("watch:css",function(){gulp.watch("sass/**/*.scss",["styles"])}),gulp.task("tests",function(){gulp.src(["spec/**/*.js"]).pipe(debug()).pipe(jasmine({verbose:!0,integration:!0,vendor:["js/**/*.js"]}))}),gulp.task("default",["build","watch:html","watch:css","watch:js"],function(){browserSync.init({server:{baseDir:"./dist"},serveStaticOptions:{extensions:["html","css","js"]},port:8e3}),gulp.watch(["dist/**/*"]).on("change",browserSync.reload)});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1bHBmaWxlLmpzIl0sIm5hbWVzIjpbImd1bHAiLCJyZXF1aXJlIiwiaW1hZ2VSZXNpemUiLCJyZW5hbWUiLCJicm93c2VyU3luYyIsImNyZWF0ZSIsImVzbGludCIsImphc21pbmUiLCJkZWJ1ZyIsImNvbmNhdCIsInNhc3MiLCJhdXRvcHJlZml4ZXIiLCJ1Z2xpZnllcyIsImNvbXBvc2VyIiwidWdsaWZ5IiwiY29uc29sZSIsInNvdXJjZW1hcHMiLCJpbWFnZW1pbiIsImltYWdlbWluUG5ncXVhbnQiLCJ0YXNrIiwic3JjIiwicGlwZSIsImRlc3QiLCJ3YXRjaCIsIndpZHRoIiwicHJvZ3Jlc3NpdmUiLCJ1c2UiLCJwYXRoIiwiYmFzZW5hbWUiLCJpbml0Iiwib24iLCJlIiwibG9nIiwid3JpdGUiLCJmb3JtYXQiLCJmYWlsT25FcnJvciIsIm91dHB1dFN0eWxlIiwibG9nRXJyb3IiLCJicm93c2VycyIsInZlcmJvc2UiLCJpbnRlZ3JhdGlvbiIsInZlbmRvciIsInNlcnZlciIsImJhc2VEaXIiLCJzZXJ2ZVN0YXRpY09wdGlvbnMiLCJleHRlbnNpb25zIiwicG9ydCIsInJlbG9hZCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsS0FBT0MsUUFBUSxRQUNmQyxZQUFjRCxRQUFRLHFCQUN0QkUsT0FBU0YsUUFBUSxlQUNqQkcsWUFBY0gsUUFBUSxnQkFBZ0JJLFNBQ3RDQyxPQUFTTCxRQUFRLGVBQ2pCTSxRQUFVTixRQUFRLHdCQUNsQk8sTUFBUVAsUUFBUSxjQUNoQlEsT0FBU1IsUUFBUSxlQUNqQlMsS0FBT1QsUUFBUSxhQUNmVSxhQUFlVixRQUFRLHFCQUN2QlcsU0FBV1gsUUFBUSxhQUNuQlksU0FBV1osUUFBUSx3QkFDbkJhLE9BQVNELFNBQVNELFNBQVVHLFNBQzVCQyxXQUFhZixRQUFRLG1CQUN6QixNQUFNZ0IsU0FBV2hCLFFBQVEsaUJBQ25CaUIsaUJBQW1CakIsUUFBUSxxQkFFakNELEtBQUttQixLQUFLLFNBQVUsa0JBQW1CLFlBQWEsU0FBVSxZQUU5RG5CLEtBQUttQixLQUFLLFlBQWEsV0FDbkJuQixLQUFLb0IsS0FBSyxZQUFhLHFCQUFzQixlQUFlLGVBQ3ZEQyxLQUFLckIsS0FBS3NCLEtBQUssV0FFeEJ0QixLQUFLbUIsS0FBSyxhQUFjLFdBQ3BCbkIsS0FBS3VCLE9BQ0QsWUFDQSxxQkFBc0IsZUFBZSxlQUNyQyxnQkFFUnZCLEtBQUttQixLQUFLLGtCQUFtQixXQUN6Qm5CLEtBQUtvQixJQUFJLHNCQUNKQyxLQUFLbkIsYUFDRnNCLE1BQU8sT0FFVkgsS0FBS0osVUFDRlEsYUFBYSxFQUNiQyxLQUFNUix1QkFFVEcsS0FBS2xCLE9BQU8sU0FBVXdCLEdBQ25CQSxFQUFLQyxVQUFZLFlBRXBCUCxLQUFLckIsS0FBS3NCLEtBQUssYUFDcEJ0QixLQUFLb0IsSUFBSSxzQkFDSkMsS0FBS25CLGFBQ0ZzQixNQUFPLE9BRVZILEtBQUtKLFVBQ0ZRLGFBQWEsRUFDYkMsS0FBTVIsdUJBRVRHLEtBQUtsQixPQUFPLFNBQVV3QixHQUNuQkEsRUFBS0MsVUFBWSxhQUVwQlAsS0FBS3JCLEtBQUtzQixLQUFLLGFBQ3BCdEIsS0FBS29CLElBQUksc0JBQ0pDLEtBQUtKLFVBQ0ZRLGFBQWEsRUFDYkMsS0FBTVIsdUJBRVRHLEtBQUtyQixLQUFLc0IsS0FBSyxlQUV4QnRCLEtBQUttQixLQUFLLFNBQVUsV0FDaEJuQixLQUFLb0IsS0FBSyxVQUFVLGdCQUFnQixxQkFBc0IsZUFBZSxlQUNwRUMsS0FBS0wsV0FBV2EsUUFFaEJSLEtBQUtQLFNBQVNnQixHQUFHLFFBQVMsU0FBU0MsR0FDaENoQixRQUFRaUIsSUFBSUQsTUFFZlYsS0FBS0wsV0FBV2lCLFNBQ2hCWixLQUFLckIsS0FBS3NCLEtBQUssV0FFeEJ0QixLQUFLbUIsS0FBSyxPQUFRLFdBQ2QsT0FBT25CLEtBQUtvQixLQUFLLFVBQVcscUJBQXNCLGVBQWUsZUFDNURDLEtBQUtmLFVBQ0xlLEtBQUtmLE9BQU80QixVQUNaYixLQUFLZixPQUFPNkIsaUJBRXJCbkMsS0FBS21CLEtBQUssV0FBWSxPQUFRLFdBQzlCbkIsS0FBS21CLEtBQUssV0FBWSxXQUNsQm5CLEtBQUt1QixPQUNELFVBQ0EscUJBQXNCLGVBQWUsZUFDckMsY0FHUnZCLEtBQUttQixLQUFLLFNBQVUsV0FDaEJuQixLQUFLb0IsSUFBSSxxQkFDSkMsS0FBS1gsTUFDRjBCLFlBQWUsZUFDaEJOLEdBQUcsUUFBU3BCLEtBQUsyQixXQUNuQmhCLEtBQUtWLGNBQ0YyQixVQUFXLGtCQUFtQixPQUFRLFdBRXpDakIsS0FBS3JCLEtBQUtzQixLQUFLLGVBRXhCdEIsS0FBS21CLEtBQUssWUFBYSxXQUNuQm5CLEtBQUt1QixNQUFNLGtCQUFtQixhQUdsQ3ZCLEtBQUttQixLQUFLLFFBQVMsV0FFZm5CLEtBQUtvQixLQUFLLGlCQUNMQyxLQUFLYixTQUNMYSxLQUFLZCxTQUNGZ0MsU0FBUyxFQUNUQyxhQUFhLEVBQ2JDLFFBQVMsbUJBTXJCekMsS0FBS21CLEtBQUssV0FBWSxRQUFRLGFBQWMsWUFBYSxZQUFhLFdBQ2xFZixZQUFZeUIsTUFDUmEsUUFDSUMsUUFBUyxVQUViQyxvQkFDSUMsWUFBYSxPQUFPLE1BQU0sT0FFOUJDLEtBQU0sTUFFVjlDLEtBQUt1QixPQUFPLGNBQ1BPLEdBQUcsU0FBVTFCLFlBQVkyQyIsImZpbGUiOiJndWxwZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBndWxwID0gcmVxdWlyZSgnZ3VscCcpO1xyXG52YXIgaW1hZ2VSZXNpemUgPSByZXF1aXJlKCdndWxwLWltYWdlLXJlc2l6ZScpO1xyXG52YXIgcmVuYW1lID0gcmVxdWlyZSgnZ3VscC1yZW5hbWUnKTtcclxudmFyIGJyb3dzZXJTeW5jID0gcmVxdWlyZSgnYnJvd3Nlci1zeW5jJykuY3JlYXRlKCk7XHJcbnZhciBlc2xpbnQgPSByZXF1aXJlKCdndWxwLWVzbGludCcpO1xyXG52YXIgamFzbWluZSA9IHJlcXVpcmUoJ2d1bHAtamFzbWluZS1waGFudG9tJyk7XHJcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2d1bHAtZGVidWcnKTtcclxudmFyIGNvbmNhdCA9IHJlcXVpcmUoJ2d1bHAtY29uY2F0Jyk7XHJcbnZhciBzYXNzID0gcmVxdWlyZSgnZ3VscC1zYXNzJyk7XHJcbnZhciBhdXRvcHJlZml4ZXIgPSByZXF1aXJlKCdndWxwLWF1dG9wcmVmaXhlcicpO1xyXG52YXIgdWdsaWZ5ZXMgPSByZXF1aXJlKCd1Z2xpZnktZXMnKTtcclxudmFyIGNvbXBvc2VyID0gcmVxdWlyZSgnZ3VscC11Z2xpZnkvY29tcG9zZXInKTtcclxudmFyIHVnbGlmeSA9IGNvbXBvc2VyKHVnbGlmeWVzLCBjb25zb2xlKTtcclxudmFyIHNvdXJjZW1hcHMgPSByZXF1aXJlKCdndWxwLXNvdXJjZW1hcHMnKTtcclxuY29uc3QgaW1hZ2VtaW4gPSByZXF1aXJlKCdndWxwLWltYWdlbWluJyk7XHJcbmNvbnN0IGltYWdlbWluUG5ncXVhbnQgPSByZXF1aXJlKCdpbWFnZW1pbi1wbmdxdWFudCcpO1xyXG5cclxuZ3VscC50YXNrKCdidWlsZCcsIFsnZ2VuZXJhdGUtaW1hZ2VzJywgJ2NvcHktaHRtbCcsICdzdHlsZXMnLCAnc2NyaXB0cyddKTtcclxuXHJcbmd1bHAudGFzaygnY29weS1odG1sJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ3VscC5zcmMoWycqKi8qLmh0bWwnLCAnIW5vZGVfbW9kdWxlcy8qKi8qJywgJyFzZXJ2ZXIvKiovKicsJyFkaXN0LyoqLyonXSlcclxuICAgICAgICAucGlwZShndWxwLmRlc3QoJ2Rpc3QnKSk7XHJcbn0pO1xyXG5ndWxwLnRhc2soJ3dhdGNoOmh0bWwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBndWxwLndhdGNoKFtcclxuICAgICAgICAnKiovKi5odG1sJyxcclxuICAgICAgICAnIW5vZGVfbW9kdWxlcy8qKi8qJywgJyFzZXJ2ZXIvKiovKicsJyFkaXN0LyoqLyonXHJcbiAgICBdLCBbJ2NvcHktaHRtbCddKTtcclxufSk7XHJcbmd1bHAudGFzaygnZ2VuZXJhdGUtaW1hZ2VzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ3VscC5zcmMoJ2ltZy8qKi8qLntqcGcscG5nfScpXHJcbiAgICAgICAgLnBpcGUoaW1hZ2VSZXNpemUoe1xyXG4gICAgICAgICAgICB3aWR0aDogMzUwXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgLnBpcGUoaW1hZ2VtaW4oe1xyXG4gICAgICAgICAgICBwcm9ncmVzc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgdXNlOiBbaW1hZ2VtaW5QbmdxdWFudCgpXVxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIC5waXBlKHJlbmFtZShmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgICAgICAgICBwYXRoLmJhc2VuYW1lICs9ICctc21hbGwnO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIC5waXBlKGd1bHAuZGVzdCgnZGlzdC9pbWcnKSk7XHJcbiAgICBndWxwLnNyYygnaW1nLyoqLyoue2pwZyxwbmd9JylcclxuICAgICAgICAucGlwZShpbWFnZVJlc2l6ZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDBcclxuICAgICAgICB9KSlcclxuICAgICAgICAucGlwZShpbWFnZW1pbih7XHJcbiAgICAgICAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB1c2U6IFtpbWFnZW1pblBuZ3F1YW50KCldXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgLnBpcGUocmVuYW1lKGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHBhdGguYmFzZW5hbWUgKz0gJy1tZWRpdW0nO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIC5waXBlKGd1bHAuZGVzdCgnZGlzdC9pbWcnKSk7XHJcbiAgICBndWxwLnNyYygnaW1nLyoqLyoue2pwZyxwbmd9JylcclxuICAgICAgICAucGlwZShpbWFnZW1pbih7XHJcbiAgICAgICAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB1c2U6IFtpbWFnZW1pblBuZ3F1YW50KCldXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgLnBpcGUoZ3VscC5kZXN0KCdkaXN0L2ltZycpKTtcclxufSk7XHJcbmd1bHAudGFzaygnbWluaWZ5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ3VscC5zcmMoWycqKi8qLmpzJywnIXNwZWMvKiovKi5qcycsJyFub2RlX21vZHVsZXMvKiovKicsICchc2VydmVyLyoqLyonLCchZGlzdC8qKi8qJ10pXHJcbiAgICAgICAgLnBpcGUoc291cmNlbWFwcy5pbml0KCkpICAgIFxyXG4gICAgICAgIC8vLnBpcGUoY29uY2F0KCdtYWluLmpzJykpXHJcbiAgICAgICAgLnBpcGUodWdsaWZ5KCkub24oJ2Vycm9yJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIC5waXBlKHNvdXJjZW1hcHMud3JpdGUoKSlcclxuICAgICAgICAucGlwZShndWxwLmRlc3QoJ2Rpc3QnKSk7XHJcbn0pO1xyXG5ndWxwLnRhc2soJ2xpbnQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ3VscC5zcmMoWycqKi8qLmpzJywgJyFub2RlX21vZHVsZXMvKiovKicsICchc2VydmVyLyoqLyonLCchZGlzdC8qKi8qJ10pXHJcbiAgICAgICAgLnBpcGUoZXNsaW50KCkpXHJcbiAgICAgICAgLnBpcGUoZXNsaW50LmZvcm1hdCgpKVxyXG4gICAgICAgIC5waXBlKGVzbGludC5mYWlsT25FcnJvcigpKTtcclxufSk7XHJcbmd1bHAudGFzaygnc2NyaXB0cycsIFsnbGludCcsICdtaW5pZnknXSk7XHJcbmd1bHAudGFzaygnd2F0Y2g6anMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBndWxwLndhdGNoKFtcclxuICAgICAgICAnKiovKi5qcycsXHJcbiAgICAgICAgJyFub2RlX21vZHVsZXMvKiovKicsICchc2VydmVyLyoqLyonLCchZGlzdC8qKi8qJ1xyXG4gICAgXSwgWydzY3JpcHRzJ10pO1xyXG59KTtcclxuXHJcbmd1bHAudGFzaygnc3R5bGVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ3VscC5zcmMoJ3Nhc3MvKiovbWFpbi5zY3NzJylcclxuICAgICAgICAucGlwZShzYXNzKHtcclxuICAgICAgICAgICAgJ291dHB1dFN0eWxlJzogJ2NvbXByZXNzZWQnXHJcbiAgICAgICAgfSkub24oJ2Vycm9yJywgc2Fzcy5sb2dFcnJvcikpXHJcbiAgICAgICAgLnBpcGUoYXV0b3ByZWZpeGVyKHtcclxuICAgICAgICAgICAgYnJvd3NlcnM6IFsnbGFzdCAyIHZlcnNpb25zJywgJ2llIDgnLCAnaWUgOSddXHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgLnBpcGUoZ3VscC5kZXN0KCdkaXN0L2NzcycpKTtcclxufSk7XHJcbmd1bHAudGFzaygnd2F0Y2g6Y3NzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZ3VscC53YXRjaCgnc2Fzcy8qKi8qLnNjc3MnLCBbJ3N0eWxlcyddKTtcclxufSk7XHJcblxyXG5ndWxwLnRhc2soJ3Rlc3RzJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGd1bHAuc3JjKFsnc3BlYy8qKi8qLmpzJ10pXHJcbiAgICAgICAgLnBpcGUoZGVidWcoKSlcclxuICAgICAgICAucGlwZShqYXNtaW5lKHtcclxuICAgICAgICAgICAgdmVyYm9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZWdyYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIHZlbmRvcjogWydqcy8qKi8qLmpzJ11cclxuICAgICAgICB9KSk7XHJcblxyXG59KTtcclxuXHJcbi8vIFN0YXRpYyBzZXJ2ZXJcclxuZ3VscC50YXNrKCdkZWZhdWx0JywgWydidWlsZCcsJ3dhdGNoOmh0bWwnLCAnd2F0Y2g6Y3NzJywgJ3dhdGNoOmpzJ10sIGZ1bmN0aW9uICgpIHtcclxuICAgIGJyb3dzZXJTeW5jLmluaXQoe1xyXG4gICAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgICAgICBiYXNlRGlyOiAnLi9kaXN0J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmVTdGF0aWNPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnaHRtbCcsJ2NzcycsJ2pzJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvcnQ6IDgwMDBcclxuICAgIH0pO1xyXG4gICAgZ3VscC53YXRjaChbJ2Rpc3QvKiovKicgXSlcclxuICAgICAgICAub24oJ2NoYW5nZScsIGJyb3dzZXJTeW5jLnJlbG9hZCk7XHJcbn0pOyJdfQ==
