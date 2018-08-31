// write your code here
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

gulp.task('reload', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
});gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080"
    });
});
gulp.task('build:js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload()
        .pipe(browserSync.stream()))
});
gulp.task('build:css', function(){
    return gulp.src('src/css/*.css')
           .pipe(concat('styles.css'))
           .pipe(gulp.dest('dist'))
           .pipe(livereload()
           .pipe(browserSync.stream()));
});
gulp.task('copy', function() {
    return gulp.src('src/assets/*.png')
        .pipe(gulp.dest('dist/assets'))
        .pipe(livereload()
        .pipe(browserSync.stream()));
});
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./src/css/*.css', ['build:css']);
    gulp.watch('./src/js/*.js', ['build:js']);
    gulp.watch('./src/assets/*.png', ['copy']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});
gulp.task('serve', function() {
    return nodemon({
        script: 'server/index.js',
        env: {
        NODE_ENV: 'development'
        },
        livereload: true
    });
});
gulp.task('default', ['build:js', 'build:css', 'copy', 'watch', 'serve', 'reload']);

module.exports = gulp;
