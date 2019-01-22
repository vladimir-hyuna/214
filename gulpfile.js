var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css')
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var path = {

    build: {
        js: 'js/',
        css: 'css/'
    },

    src: {
        js: 'src/js/app.js',
        scss: 'src/scss/app.scss',
        html: '*.html',
        img: 'images/*'
    },

    watch: {
        js: 'src/js/*.js',
        scss: 'src/scss/*.scss',
        html: '*.html',
        img: 'images/*'
    },

    clean: './build'
};

var sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

gulp.task('js:build', function () {
     gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('scss:build', function () {
     gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
        	includePaths: sassPaths
        }))
        .pipe(prefixer({
        	browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('html:watch', function () {
    gulp.src(path.src.html)
    .pipe(browserSync.stream());
});

gulp.task('img:build', function () {
    gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(browserSync.stream());
});

gulp.task('build', [
    'js:build',
    'scss:build',
    'html:watch',
    'img:build'
]);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.src.scss);
    gulp.watch(path.src.js);
    gulp.watch(path.src.html);
    gulp.watch(path.src.img);
});

gulp.task('watch', function(){
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:watch');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('default', ['build', 'watch', 'browser-sync']);