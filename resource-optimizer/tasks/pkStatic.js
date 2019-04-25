const gulp = require('gulp')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))

module.exports = config => {
	gulp.task(
		'pkStatic',
		gulp.series('addHash', function() {
			return gulp
				.src(['build/rev/static/**', '!build/rev/static/src/**'])
				.pipe(
					gulp.dest(`build/deploy/${pkg.name.replace(/-web$/, '') + '-static'}`)
				)
		})
	)
}
