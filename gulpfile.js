const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rollup = require('gulp-rollup'),
    includePaths = require('rollup-plugin-includepaths'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv;


var __production = false;
if (argv.production || argv.prod) {
     __production = true;
}

const includePathOptions = {
    include: {
        'rhino': './src/engine/index.js'
    },
    paths: ['./src/engine', './node_modules'],
    external: [],
    extensions: ['.js']
};

gulp.task('html', function () {
    return gulp.src(['src/templates/**/*.html'])
        .pipe(gulp.dest('./www/templates'))
        .pipe(connect.reload())
});

gulp.task('index', function () {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('./www'))
        .pipe(connect.reload())
});

gulp.task('images', function () {
    return gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('./www/img'))
        .pipe(connect.reload())
});

gulp.task('script', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: './src/js/index.js',
            allowRealFiles: true,
            plugins: [includePaths(includePathOptions)]
        }))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulpif(__production, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/js'))
        .pipe(connect.reload())
});

gulp.task('engineJs', function () {
    return gulp.src(['src/engine/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: './src/engine/index.js'
        }))
        .pipe(babel({
            presets: ['es2015'],
            plugins: [
                ["transform-es2015-modules-commonjs"]
            ]
        }))
        .pipe(concat('framework.js'))
        .pipe(gulpif(__production, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/js'))
        .pipe(connect.reload())
});


gulp.task('engineSass', function () {
    return gulp.src('./src/engine/rihno.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/css'))
        .pipe(connect.reload())
});

gulp.task('framework', ['engineSass', 'engineJs']);

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/css'))
        .pipe(connect.reload());
});

gulp.task('default', ['html', 'sass', 'script', 'index', 'images']);


gulp.task('watch', function () {

    watch('src/**/*', batch(function (events, done) {
        gulp.start('default', done);
    }));

});


gulp.task('server', function () {

    connect.server({
        port: 8000,
        root: 'www',
        livereload: true
    });

});

gulp.task('serve', ['default', 'server', 'watch']);