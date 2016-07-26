var gulp = require("gulp"),
    server = require( 'gulp-develop-server' ),
    jshint = require("gulp-jshint"),
    livereload = require( 'gulp-livereload' ),
    chalk = require('chalk');
var port     = process.env.PORT || 8080;

var options = {
    path: './src/server.js'
};

var serverFiles = [
    './src/apps/routes.js',
    './src/resources/js/*.js',
    './src/views/*.ejs'
];

gulp.task("lint", function() {
    gulp.src("./src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('watch', function() {
    gulp.watch("./src/**/*.js", ["lint"]);
});

// run server
gulp.task( 'server:start', function() {
  console.log(chalk.green('Webserver running! WOOT'));
    server.listen( options, livereload.listen );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ serverFiles ], server.restart );
});

// If server scripts change, restart the server and then livereload.
gulp.task( 'default', [ 'lint', 'server:start' ], function() {
console.log(chalk.blue(('Gulp default tasks running...')));
    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }

    gulp.watch( serverFiles ).on( 'change', restart );
});
