const gulp = require('gulp')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')

module.exports = config => {
	const DEST = config.STATIC_BUILD_PATH

	gulp.task('min-script', function() {
		return gulp
			.src('dist/**/*.js')
			.pipe(terser())
			.pipe(gulp.dest(DEST))
	})

	gulp.task('min-css', function() {
		return gulp
			.src('dist/**/*.css')
			.pipe(
				cleanCSS({
					compatibility: 'ie7'
				})
			)
			.pipe(gulp.dest(DEST))
	})

	gulp.task('min-image', function() {
		return gulp.src('dist/**/*.{jpg,png,gif}').pipe(gulp.dest(DEST))
	})

	gulp.task('min-fonts', function() {
		return gulp.src('dist/**/*.{woff2,eot,ttf,otf}').pipe(gulp.dest(DEST))
	})

	gulp.task('copy-view', function() {
		return gulp
			.src('src/view/**', {
				base: './'
			})
			.pipe(gulp.dest(DEST))
	})

	gulp.task(
		'build',
		gulp.parallel(
			'min-script',
			'min-css',
			'min-image',
			'min-fonts',
			'copy-view'
		)
	)
}
