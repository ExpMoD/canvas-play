let browserSync = require('browser-sync'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    stylus = require('gulp-stylus'),
    pug = require('gulp-pug'),
    config = require('./config'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber')


gulp.task('pug', () => (
    gulp.src(config.dir.src + '/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.dir.src))
        .pipe(browserSync.stream())
));


gulp.task('stylus', () => (
    gulp.src(config.dir.src + '/stylus/**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cssbeautify({
            indent: '    '
        }))
        .pipe(gulp.dest(config.dir.src + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
));


gulp.task('jsLibs', () => (
    gulp.src(config.getJsLibs())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dir.src + '/js'))
        .pipe(browserSync.stream())
));


gulp.task('cssLibs', () => (
    gulp.src(config.getCssLibs())
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(config.dir.src + '/css'))
        .pipe(browserSync.stream())
));


gulp.task('browserSync', gulp.series('pug', 'stylus', 'jsLibs', 'cssLibs', () => {
    browserSync({
        server: {
            baseDir: config.dir.src
        },
        notify: false
    })
}));


gulp.task('watch', () => {
    gulp.watch(config.dir.src + '/**/*.pug', gulp.series('pug'));
    gulp.watch(config.dir.src + '/stylus/**/*.styl', gulp.series('stylus'));
    gulp.watch(config.dir.src + '/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('browserSync', 'watch'));