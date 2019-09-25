var gulp = require('gulp');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var pugInheritance = require('yellfy-pug-inheritance');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var nib = require('nib');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
var inlineCss = require('inline-css');
var each = require('gulp-each');

var public = 'dist';
var src = 'resources/src';
var email = 'email';

var public_m = 'dist/mobile';
var src_m = 'resources/src_m';

var reload = browserSync.reload;
// Компилятор Стилей
gulp.task('stylus', function() {
  return gulp.src(src+'/css/*.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib()],
      'include css': true,
      compress: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src+'/css/plugins/'))
    .pipe(browserSync.stream());
});

gulp.task('stylus mobile', function() {
    return gulp.src(src_m+'/css/*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [nib()],
            'include css': true,
            compress: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src_m+'/css/plugins/'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    return gulp.src([
        src+'/css/plugins/main.css'
    ])
        .pipe(autoprefixer({
            browsers: ["last 8 version", "> 1%", "ie 8"],
            cascade: false
        }))
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(public+'/css/'));
});

gulp.task('minify-css mobile', function() {
    return gulp.src([
        src_m+'/css/plugins/slick.css',
        src_m+'/css/plugins/slick-theme.css',
        src_m+'/css/plugins/remodal.css',
        src_m+'/css/plugins/remodal-default-theme.css',
        src_m+'/css/plugins/main.css'
    ])
        .pipe(autoprefixer({
            browsers: ["last 8 version", "> 1%", "ie 8"],
            cascade: false
        }))
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(public_m+'/css/'));
});

gulp.task('concat-js', function() {
    return gulp.src([
        src+'/js/header.js',
        src+'/js/jQuery.js',
        
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(src+'/js/main/'))
});

gulp.task('concat-js mobile', function() {
    return gulp.src([
        src_m+'/js/slick.min.js',
        src_m+'/js/remodal.min.js',
        src_m+'/js/jQuery.tab.js',
        src_m+'/js/layout.js'
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(src_m+'/js/main/'))
});

gulp.task('minify-js', function() {
    return gulp.src(src+'/js/main/main.js')
        .pipe(minify({
            ext:{
                source: '',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(public+'/js/'))
        .pipe(browserSync.stream());
});

gulp.task('minify-js mobile', function() {
    return gulp.src(src_m+'/js/main/main.js')
        .pipe(minify({
            ext:{
                source: '',
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest(public_m+'/js/'))
        .pipe(browserSync.stream());
});

let pugInheritanceCache = {};
// Watch Task
gulp.task('watch', () => {
    global.watch = true;
    browserSync.init([public+'/css/*.css', public+'/*.html'], {
        server: "./"+public+"/"
    });
    gulp.watch([src+'/css/**/*.styl'], gulp.series('stylus', 'minify-css'));
    gulp.watch([src+'/pug/**/*.pug'], gulp.series('pug'))
        .on('all', (event, filepath) => {
        global.changedTempalteFile = filepath.replace(/\\/g, '/');
    });
    gulp.watch([src+'/js/*.js'], gulp.series('concat-js', 'minify-js'));
    gulp.watch(public+"/*.html").on("change", reload);
});

gulp.task('watch mobile', () => {
    global.watch = true;
    browserSync.init([public_m+'/css/*.css', public_m+'/*.html'], {
        server: "./"+public_m+"/"
    });
    gulp.watch([src_m+'/css/**/*.styl'], gulp.series('stylus mobile', 'minify-css mobile'));
    gulp.watch([src_m+'/pug/**/*.pug'], gulp.series('pug mobile'))
        .on('all', (event, filepath) => {
        global.changedTempalteFile = filepath.replace(/\\/g, '/');
    });
    gulp.watch([src_m+'/js/*.js'], gulp.series('concat-js mobile', 'minify-js mobile'));
    gulp.watch(public_m+"/*.html").on("change", reload);
});

// Генерация Pug проверка того что изменилось
function pugFilter(file, inheritance) {
    const filepath = src+`/pug/${file.relative}`;
    if (inheritance.checkDependency(filepath, global.changedTempalteFile)) {
        console.log(`Compiling: ${filepath}`);
        return true;
    }
    return false;
}

function pugFilter_m(file, inheritance) {
    const filepath = src_m+`/pug/${file.relative}`;
    if (inheritance.checkDependency(filepath, global.changedTempalteFile)) {
        console.log(`Compiling: ${filepath}`);
        return true;
    }
    return false;
}
// Генерация Pug
gulp.task('pug', () => {
    return new Promise((resolve, reject) => {
        const changedFile = global.changedTempalteFile;
        const options = {
            changedFile,
            treeCache: pugInheritanceCache
        };

        pugInheritance.updateTree(src+'/pug', options).then((inheritance) => {
            // Save cache for secondary compilationswatch
            pugInheritanceCache = inheritance.tree;

            return gulp.src(src+'/pug/*.pug')
                .pipe(gulpif(global.watch, filter((file) => pugFilter(file, inheritance))))
                .pipe(plumber())
                .pipe(pug({ pretty: true }))
                .pipe(gulp.dest(public))
                .on('error', console.log)
                .on('end', resolve);
        });
    });
});

gulp.task('pug mobile', () => {
    return new Promise((resolve, reject) => {
        const changedFile = global.changedTempalteFile;
        const options = {
            changedFile,
            treeCache: pugInheritanceCache
        };

        pugInheritance.updateTree(src_m+'/pug', options).then((inheritance) => {
            // Save cache for secondary compilationswatch
            pugInheritanceCache = inheritance.tree;

            return gulp.src(src_m+'/pug/*.pug')
                .pipe(gulpif(global.watch, filter((file) => pugFilter_m(file, inheritance))))
                .pipe(plumber())
                .pipe(pug({ pretty: true }))
                .pipe(gulp.dest(public_m))
                .on('error', console.log)
                .on('end', resolve);
        });
    });
});

gulp.task('copy:images', () => {
    return gulp.src(src + '/images/**/*').pipe(gulp.dest(public + '/images'));
});

gulp.task('default', gulp.series('copy:images','pug', 'stylus', 'minify-css', 'concat-js', 'minify-js', 'watch'));

gulp.task('mobile', gulp.series('pug mobile', 'stylus mobile', 'minify-css mobile', 'concat-js mobile', 'minify-js mobile', 'watch mobile'));

gulp.task('dist', gulp.series('pug', 'stylus', 'minify-css', 'concat-js', 'minify-js'));

gulp.task('dist-mobile', gulp.series('pug mobile', 'stylus mobile', 'minify-css mobile', 'concat-js mobile', 'minify-js mobile'));

gulp.task('dist-all', gulp.series('pug', 'stylus', 'minify-css', 'concat-js', 'minify-js', 'pug mobile', 'stylus mobile', 'minify-css mobile', 'concat-js mobile', 'minify-js mobile'));

gulp.task('email', function () {
    return gulp.src(email+'/html/*.html')
        .pipe(each(function (content, file, callback) {
            var html = content;
            inlineCss(html, {url: 'file://' + file.path, preserveMediaQueries: true, removeStyleTags:true})
                .then(function(html) { callback(null, html); });
        }))
        .pipe(gulp.dest(public+'/email/'));
});