// =============================================
// Project Settings
// edit these variables to suit your project
// **this and the options object are the only sections you should need to edit
// =============================================
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var chalk = require('chalk')
var project = {
    src: 'src',
    dist: 'dist',
    styles: 'src/scss',
    stylesExtension: '.scss',
    script: 'script',
    scriptExtension: '.js',
    img: 'img'
};


// =============================================
// Project Options
// edit these variables to suit your project
// **this and the project object are the only sections you should need to edit
// =============================================

var option = {
    autoprefixer: [ 'last 2 versions' ],
    cssNano: {
        // http://cssnano.co/optimisations/
        zindex: false,
        reduceIdents: false,
        mergeIdents: false,
        discardUnused: false
    },
    imageOptimisation: {
        optimizationLevel: 3,   // (Between 0 - 7)
        progressive: true,      // JPG
        interlaced: true        // GIF
    }
};


// =============================================
// NPM Modules
// =============================================

var gulp = require('gulp' ),
    $ = {
        util:               require( 'gulp-util' ),
        del:                require( 'del' ),
        changed:            require( 'gulp-changed' ),
        imageMin:           require( 'gulp-imagemin' ),
        sass:               require( 'gulp-sass' ),
        autoPrefixer:       require( 'gulp-autoprefixer' ),
        clipEmptyFiles:     require( 'gulp-clip-empty-files' ),
        combineMq:          require( 'gulp-combine-mq' ),
        cssNano:            require( 'gulp-cssnano' ),
        uglify:             require( 'gulp-uglify' ),
        sourcemaps:         require( 'gulp-sourcemaps' ),
        runSequence:        require( 'run-sequence' )
    };


// =============================================
// Environment Variables
// =============================================

var environment = {
    development: $.util.env.dev,
    production: $.util.env.production
};

gulp.task('hello', function() {
    console.log(chalk.green.bold('Hello! It time to GULP'));
});

// =============================================
// IMG `gulp img`
// compresses images
// =============================================

gulp.task( 'img', function() {
    return gulp.src( project.src + '/' + project.img + '/**/*' )
        .pipe( $.changed( project.dist + '/' + project.img ) )
        .pipe( environment.production ? $.imageMin( option.imageOptimisation ) : $.util.noop() )
        .pipe( gulp.dest( project.dist + '/' + project.img ) );
} );


// =============================================
// SCRIPT `gulp script`
// compiles script, Jshint, Minify if `--production`
// =============================================

gulp.task( 'script', function() {
    return gulp.src( project.src + '/' + project.script + '/**/*' + project.scriptExtension )
        .pipe( environment.production ? $.uglify() : $.util.noop() )
        .pipe( gulp.dest( project.dist + '/' + project.script ) );
} );


// =============================================
// STYLES `gulp styles`
// compiles scss to css, autoprefixer, combines media queries and minifies if `--production`
// =============================================

gulp.task( 'styles', function() {
    return gulp.src( project.src + '/' + project.styles + '/**/*' + project.stylesExtension )
        .pipe( $.clipEmptyFiles() )
        .pipe( environment.development ? $.sourcemaps.init() : $.util.noop() )
        .pipe( ! environment.production ? $.sass.sync().on( 'error', $.sass.logError ) : $.util.noop() )
        .pipe( environment.production ? $.sass.sync() : $.util.noop() )
        .pipe( $.autoPrefixer( option.autoprefixer ) )
        .pipe( environment.development ? $.sourcemaps.write() : $.util.noop() )
        .pipe( environment.production ? $.combineMq() : $.util.noop() )
        .pipe( environment.production ? $.cssNano( option.cssNano ) : $.util.noop() )
        .pipe( gulp.dest( project.dist + '/' + project.styles ) )
    .pipe(browserSync.reload({
        stream: true
    }));
} );


// =============================================
// Clean `gulp` clean
// destroys the build directory
// =============================================

gulp.task( 'clean', function( cb ) {
    return $.del( [ project.dist ], cb );
} );


// =============================================
// Build `gulp build`
// builds all assets, also has `--production` option to build production ready assets
// =============================================

gulp.task( 'build', function( cb ) {
    $.runSequence( 'clean', [ 'img', 'styles' ], cb );
} );
// =============================================
// Nodemon to run the server.js file
// watches files and runs defined task on change
// =============================================
gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: './src/server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
// =============================================
// Watch `gulp watch`
// watches files and runs defined task on change
// =============================================

gulp.task( 'watch', function( cb ) {
    gulp.watch( project.src + '/' + project.img + '/**/*', [ 'img' ] );
 //   gulp.watch( project.src + '/' + project.script + '/**/*' + project.scriptExtension, [ 'script' ] );
    gulp.watch( project.src + '/' + project.styles + '/**/*' + project.stylesExtension, [ 'styles' ] );
} );

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: env.port
    });
});



// =============================================
// Default `gulp`
// runs build task, Runs watch tasks
// =============================================

gulp.task( 'default', function( cb ) {
    $.runSequence( 'hello', 'build', 'browser-sync', 'watch',  cb );
} );
