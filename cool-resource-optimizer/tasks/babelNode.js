const gulp = require('gulp')
const babel = require('gulp-babel')
const nodeBabel = require('../config/nodeBabel')

module.exports = config => {
	gulp.task('pkView', function(){
		return gulp
			.src(['src/view/**'], {
				base: './'
			})
			.pipe(gulp.dest('build/node'))
	})

	gulp.task('babelNode', gulp.series('pkView', function(){
		return gulp
		.src(
			[
				'src/**/*.js',
				'config/**/*.js',
				'!src/static/**/*.js',
				'!src/@cool/**/*.js'
			],
			{
				base: './'
			}
		)
		.pipe(babel(nodeBabel.get()))
		.pipe(gulp.dest('build/node'))
	}))
}
