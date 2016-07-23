var gulp = require("gulp");
// var browserify = require("browserify");
// var browserSync = require("browser-sync");
var del = require("del");
//var babelify = require("babelify");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
//var source = require("vinyl-source-stream");
//var buffer = require("vinyl-buffer");
// var gutil = require("gulp-util");
// var watchify = require("watchify");
//var nodemon = require("gulp-nodemon");

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

var input = './src/scss/**/*.scss';
var output = './src/resources/css';

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));
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
gulp.task("heroku:production", "sass", function() {
    //gulp.watch("/scss/*.scss", ["css"]);
});

gulp.task("default", ["greet", "sass"], function() {
    //gulp.watch("/scss/*.scss", ["css"]);
});
