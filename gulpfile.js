const gulp = require("gulp");
const sass = require("gulp-sass");
const scss_location = 'src/style/main.scss';

// a function to generate the css with sass
const css = function() {
    return gulp.src(scss_location)
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest('./src/site/_includes/layouts/css'));
};

// Task to generate css from sass
gulp.task('css', css);

// Task to watch files.
gulp.task('watch', function () {
    gulp.watch(scss_location, css);
})