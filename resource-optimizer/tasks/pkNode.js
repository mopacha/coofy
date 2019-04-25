const gulp = require('gulp')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))

module.exports = config => {
  const DEST = `build/deploy/${pkg.name.replace(/-web$/, '') + '-node'}`
  gulp.task('copyMudules', function () {
    return gulp
      .src(['node_modules/**'], {
        base: './'
      })
      .pipe(gulp.dest(DEST))
  })

  gulp.task('copyView', function () {
    return gulp
      .src(['build/rev/static/src/view/**'], {
        base: 'build/rev/static/'
      })
      .pipe(gulp.dest(DEST))
  })

  gulp.task('copyConfig', function () {
    return gulp
      .src(['package.json', 'process.json'], {
        base: './'
      })
      .pipe(gulp.dest(DEST))
	})

	gulp.task('src', function () {
    return gulp
      .src(['build/rev/node/**'])
      .pipe(gulp.dest(DEST))
  })

  gulp.task(
    'pkNode',
    gulp.parallel('copyView', 'copyMudules', 'copyConfig', 'src')
  )
}
