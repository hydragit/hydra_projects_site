var gulp         = require('gulp'),
    pug          = require('gulp-pug');
    browserify   = require('gulp-browserify');
    uglify       = require('gulp-uglify');
    gulpif       = require('gulp-if');
    sass         = require('gulp-sass');
    http         = require('http');
    ecstatic     = require('ecstatic');
    browserSync  = require('browser-sync').create();


var env = process.env.NODE_ENV || 'development';
var outputDir = './';
var inputDir = './pre/';

// Simple Server + watching *.js files
gulp.task('http', function(){
  http.createServer(
    ecstatic({ root: outputDir })
  ).listen(8080);

  console.log('Listening on :8080');
  gulp.watch(inputDir + 'js/**/*.js', function() {
    gulp.run('js');
  });
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: outputDir
    });
    gulp.watch(outputDir + "gulpfile.js").on('change', browserSync.reload);
    gulp.watch(outputDir + "css/**/*.css").on('change', browserSync.reload);
    gulp.watch(outputDir + "**/*.html").on('change', browserSync.reload);
    gulp.watch(outputDir + "js/**/*.js").on('change', browserSync.reload);
});


gulp.task('sass', function() {
	var config = {};
	if (env === 'development') {
		config.sourceComments = 'map';
	}
	if (env === 'production') {
		config.outputStyle = 'compressed';
	}
	return gulp.src(inputDir + 'sass/main.scss')
	.pipe(sass(config))
	.pipe(gulp.dest(outputDir + 'css'))
  .pipe(browserSync.stream());
});



gulp.task('js', function() {
	return gulp.src(inputDir + 'js/**/*.js')
	.pipe(browserify( { debug: env === 'development'} ))
	.pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + 'js'))
   .pipe(browserSync.stream());

});



gulp.task('pug', function() {
	return gulp.src(inputDir + 'templates/**/*.pug')
	.pipe(pug( { pretty: true } ))
	.pipe(gulp.dest(outputDir))
  .pipe(browserSync.stream());

});

gulp.task('watch', function() {
	gulp.watch(inputDir + 'templates/**/*.pug', ['pug']);
  gulp.watch(inputDir + 'js/**/*.js', ['js']);
  gulp.watch(inputDir + 'sass/**/*.scss', ['sass']);

});



gulp.task('default', ['watch', 'serve', 'pug', 'js', 'sass' ,'http']);
