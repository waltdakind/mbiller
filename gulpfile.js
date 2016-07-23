import gulp from "gulp";
import browserify from "browserify";
import browserSync from "browser-sync";
import del from "del";
import babelify from "babelify";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import gutil from "gulp-util";
import watchify from "watchify";
import nodemon from "gulp-nodemon";

const b = watchify(browserify({
    plugin: [watchify],
    debug: true,
    cache: {},
    packageCache: {}
}));
b.transform(babelify);

gulp.task('greet', function () {
    console.log('Gulp started! Hello and good luck with your app :)');
});

gulp.task("javascript", function() {
    function rebundle() {
        const bundle = b.bundle()
            .pipe(source("app.js"))
            .pipe(buffer())
            .on("error", gutil.log)
            .pipe(gulp.dest("./build/"))
            .pipe(browserSync.reload({
                stream: true,
                once: true
            }));

        return bundle;
    }

    b.on("update", rebundle);
    return rebundle();
});

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

gulp.task("browser-sync", ["server"], function() {
    browserSync.init({
        port: 3000,
        proxy: "http://localhost:8000"
    });
});

gulp.task("server", ["build"], function(cb) {
    nodemon({script: "index.js", env: {"NODE_ENV": "development"}})
        .on("start", function() {
            cb();
        });
});

gulp.task("clean", function(cb) {
    del(["build"], cb);
});

gulp.task("build", ["javascript", "css"], function(cb) {
    cb();
});

gulp.task("default", ["greet", "build", "server", "browser-sync"], function() {
    gulp.watch("scss/*.scss", ["css"]);
});