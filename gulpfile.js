var gulp = require('gulp'),
    pug = require('gulp-pug');


gulp.task('pug', function() {

	return gulp.src('pre/templates/**/*pug')
	.pipe(pug( { pretty: true } ))
	.pipe(gulp.dest('./'));

});    


gulp.task('default', function() {

});