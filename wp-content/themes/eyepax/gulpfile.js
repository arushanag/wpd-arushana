// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
var tailwindcss = require('tailwindcss');

// File paths
const files = {
    scssPath: 'assets/scss/**/*.scss',
    slickPath: 'node_modules/slick-carousel/slick/slick.js',
    jsPath: 'assets/js/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {

    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([
            require('tailwindcss'),
            autoprefixer(),
            cssnano()
        ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('assets/dist/css')); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
            files.slickPath,
            files.jsPath
            //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('piw-bundle.js'))
        //.pipe(uglify())
        .pipe(dest('assets/dist/js'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    watch([files.scssPath, files.jsPath],
        //{interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
        )
    );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);