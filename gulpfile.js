var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');

var fuentesJS = ['js/functions.js','js/scripts.js']

//  comentamos xq vamos a usar bootrap 
// gulp.task('sass', function() {
//   gulp.src('scss/app.scss')
//     .pipe(autoprefixer()
//     )
//     .pipe(sass({
//       includePaths: ['scss']
//     }))
//     .pipe(gulp.dest('app/css'));
// });

gulp.task('sass', function() {
  var archivosSASS, archivosCSS;

      archivosSASS = gulp.src('scss/app.scss')
        .pipe(autoprefixer())
        .pipe(sass({
          includePaths:['scss']
        }));

        archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');

        return merge(archivosSASS, archivosCSS)
              .pipe(concat('app.css'))
              .pipe(gulp.dest('app/css'));
});

gulp.task('js',function(){
  gulp.src(fuentesJS)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream:true}))
});

// Task para importar archivos q usa bootstrap a nuestra app
gulp.task('moverFuentes', function(){
  gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
  .pipe(gulp.dest('app/fonts'))
});




// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html"], {
    server: {
      baseDir: 'app'
    }
  });

});

gulp.task('watch', ['sass', 'serve','js','moverFuentes'], function() {
  gulp.watch(["scss/*.scss"], ['sass']);
  gulp.watch(["js/*.js"], ['js']);
});

gulp.task('default',['watch']);