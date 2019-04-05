const gulp = require('gulp')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))

module.exports = config => {
  const DEST = `build/deploy/${pkg.name.replace(/-web$/, '') + '-node'}`
  gulp.task('pkMudules', function () {
    return gulp
      .src(['node_modules/**'], {
        base: './'
      })
      .pipe(gulp.dest(DEST))
	})
	

  gulp.task('pkNode', gulp.series('pkMudules', function () {
    return gulp
      .src(['build/node/**', 'package.json', 'process.json'])
      .pipe(gulp.dest(DEST))
  }))
}
