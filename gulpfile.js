var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    csswring = require('csswring'),
    autoprefixer = require('autoprefixer'),
    refresh = require('gulp-refresh'),
    jshint = require('gulp-jshint');

var srcStyles = [
    'src/css/**/*.scss'
];
var srcJs = [
    '!src/js/vendor/**/*.js',
    'src/js/**/*.js'
];
var srcPaths = srcStyles.concat(srcJs);
srcPaths.push('src/**/*.html');

gulp.task('styles', function () {
    var processors = [
        csswring,
        autoprefixer
    ];

    return gulp.src(srcStyles)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/public/css/'));
});

gulp.task('jshint', function () {
    return gulp.src(srcJs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(refresh());
});

gulp.task('reload', function () {
    return gulp.src(srcPaths)
        .pipe(refresh())
});

gulp.task('watch:styles', function () {
    gulp.watch('**/*.scss', ['styles']);
});

gulp.task('watch', function () {
    refresh.listen();
    refresh.options.quiet = true;

    gulp.watch(srcPaths, ['jshint', 'styles', 'reload']);
});