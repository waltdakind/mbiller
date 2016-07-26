var gulp = require("gulp");
var jshint = require("gulp-jshint");
var server = require('gulp-server-livereload');
var chalk = require('chalk');

gulp.task("lint", function() {
    gulp.src("./src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('watch', function() {
    gulp.watch("src/**/*.js", ["lint"]);
});

gulp.task('webserver', function() {
  console.log(chalk.green('Webserver running! WOOT'))
  gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task("default", ["lint", "watch", "webserver"], function() {
    console.log(chalk.blue(('Gulp default tasks running...')));
});
