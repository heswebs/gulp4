const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')

//compile scss into css
function style(){
    // 1. where is my css file 
    return gulp.src('./scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: false
        }))
    // 2. pass file through css compiler
        .pipe(sass().on('error', sass.logError))
        .pipe(sass())
    // 3. where to save the compiled css
        .pipe(gulp.dest('./css'))
    // 4. time to browser sync
        .pipe(browserSync.stream())
}

// time to set up watch
function watch(){
    browserSync.init({
        server: {
            baseDir:'./'
        }
    })
    // watch the changes for scss, html and js
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./**/*.html').on('change', browserSync.reload)
    gulp.watch('./js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.watch = watch