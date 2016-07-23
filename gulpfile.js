var gulp = require("gulp");
// var browserify = require("browserify");
// var browserSync = require("browser-sync");
var del = require("del");
//var babelify = require("babelify");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
// var gutil = require("gulp-util");
// var watchify = require("watchify");
var nodemon = require("gulp-nodemon");

// const b = watchify(browserify({
//     plugin: [watchify],
//     debug: true,
//     cache: {},
//     packageCache: {}
// }));
// b.transform(babelify);

gulp.task('greet', function () {
    console.log('Gulp started! Hello and good luck with your app :)');
});

// gulp.task("javascript", function() {
//     function rebundle() {
//         const bundle = b.bundle()
//             .pipe(source("app.js"))
//             .pipe(buffer())
//             .on("error", gutil.log)
//             .pipe(gulp.dest("./build/"))
//             .pipe(browserSync.reload({
//                 stream: true,
//                 once: true
//             }));

//         return bundle;
//     }

//     b.on("update", rebundle);
//     return rebundle();
//});

gulp.task("css", function() {
    const stream = gulp.src("scss/style.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer({
            browsers: ["last 2 version"]
        })]))
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.reload({
            stream: true
        }));
    return stream;
});

//gulp.task("browser-sync", ["server"], function() {
//    browserSync.init({
//        port: process.env.PORT || 8080,
 //       proxy: "http://localhost:8000"
//    });
//});

gulp.task("server", ["build"], function(cb) {
    nodemon({script: "./src/server.js", env: {"NODE_ENV": "production"}})
        .on("start", function() {
            cb();
        });
});

 gulp.task("clean", function(cb) {
     del(["build"], cb);
 });

gulp.task("build", ["css"], function(cb) {
    cb();
});

gulp.task("default", ["greet", "build", "server"], function() {
    gulp.watch("/scss/*.scss", ["css"]);
});
gulp.task('heroku:production', function(){
  runSeq('greet', 'clean', 'build', 'server')
});
