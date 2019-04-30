const gulp = require('gulp')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const zip = require('gulp-zip')
const rename = require('gulp-rename')

module.exports = config => {
	const zipName = pkg.name.replace(/-web$/, '')+ '-static'

	gulp.task(
		'pkStatic',
		gulp.series('addHash', function() {
			return gulp
				.src(['build/rev/static/**', '!build/rev/static/src/**'])
				.pipe(rename(function (path) {
					path.dirname = `${zipName}/${path.dirname}`;
				}))
				.pipe(zip(zipName + '.zip'))
				.pipe(
					gulp.dest(`build/deploy`)
				)
		})
	)
}
