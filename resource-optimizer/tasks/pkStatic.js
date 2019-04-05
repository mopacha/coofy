const gulp = require('gulp')
const RevAll = require('gulp-rev-all')
const path = require('path')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const pkg = require(path.resolve(process.cwd(), './package.json'))

module.exports = config => {
	const REV_OPTIONS = {
		hashLength: 8
	}

	gulp.task('min-script', function() {
		return gulp
			.src('dist/**/*.js')
			.pipe(terser())
			.pipe(gulp.dest('build/static/'))
	})

	gulp.task('min-css', function() {
		return gulp
			.src('dist/**/*.css')
			.pipe(
				cleanCSS({
					compatibility: 'ie7'
				})
			)
			.pipe(gulp.dest('build/static/'))
	})

	gulp.task('min-image', function() {
		return gulp.src('dist/**/*.{jpg,png,gif}').pipe(gulp.dest('build/static/'))
	})

	gulp.task(
		'pkStatic',
		gulp.series(
			gulp.parallel('min-script', 'min-css', 'min-image'),
			function() {
				return gulp
					.src(['build/static/**'])
					.pipe(RevAll.revision(REV_OPTIONS))
					.pipe(
						gulp.dest(
							`build/deploy/${pkg.name.replace(/-web$/, '') + '-static'}`
						)
					)
			}
		)
	)
}
