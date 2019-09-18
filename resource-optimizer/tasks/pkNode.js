const gulp = require('gulp')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const zip = require('gulp-zip')
const rename = require('gulp-rename')

module.exports = config => {
	const zipName = pkg.name.replace(/-web$/, '') + '-node'
	const REV = 'build/rev/node'

	gulp.task('copyMudules', function() {
		return gulp
			.src(['node_modules/**/**', '!node_modules/*gulp*/**'], {
				base: '.'
			})
			.pipe(gulp.dest(REV))
	})

	gulp.task('copyView', function() {
		return gulp
			.src(['build/rev/static/src/view/**'], {
				base: 'build/rev/static/'
			})
			.pipe(gulp.dest(REV))
	})

	gulp.task('copyConfig', function() {
		return gulp
			.src(['package.json', 'process.json', 'config/**/*.json'], {
				base: './'
			})
			.pipe(gulp.dest(REV))
	})

	gulp.task('copyStatic', function() {
		return gulp
		.src(['public/**'], {
			base: './'
		})
		.pipe(gulp.dest(REV))
	})

	gulp.task('copy', gulp.parallel('copyMudules', 'copyView', 'copyConfig', 'copyStatic'))


	gulp.task(
		'pkNode',
		gulp.series('copy', function() {
			return gulp
				.src([`${REV}/**`])
				.pipe(
					rename(function(path) {
						path.dirname = `${zipName}/${path.dirname}`
					})
				)
				.pipe(zip(zipName + '.zip'))
				.pipe(gulp.dest(`build/deploy`))
		})
	)
}
