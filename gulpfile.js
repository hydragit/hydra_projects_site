var gulp       = require('gulp'),
    pug        = require('gulp-pug');
    browserify = require('gulp-browserify');
    uglify     = require('gulp-uglify');
    gulpif     = require('gulp-if');
    sass       = require('gulp-sass');


var env = process.env.NODE_ENV || 'development';
var outputDir = './';
var inputDir = './pre/';

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
	.pipe(gulp.dest(outputDir + './css'));
});



gulp.task('js', function() {
	return gulp.src(inputDir + 'js/**/*.js')
	.pipe(browserify( { debug: env === 'development'} ))
	.pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + './js'));

});



gulp.task('pug', function() {
	return gulp.src(inputDir + 'templates/**/*.pug')
	.pipe(pug( { pretty: true } ))	
	.pipe(gulp.dest(outputDir));

});    


gulp.task('default', function() {});