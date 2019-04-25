const gulp = require('gulp')
const clean = require('gulp-clean')

module.exports = config => {
  gulp.task('clean', function () {
    return gulp.src([
      './build',
      './dist'
    ], { read: false, allowEmpty: true}).pipe(clean())
  })
}
