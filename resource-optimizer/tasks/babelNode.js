const gulp = require('gulp')

const babel = require('gulp-babel')
const nodeBabel = require('../config/nodeBabel')

module.exports = config => {
  gulp.task('babelNode', function () {
    return gulp
      .src(['src/**/*.js', 'config/**/*.js', '!src/static/**/*.js'], {
        base: './'
      })
      .pipe(babel(nodeBabel.get()))
      .pipe(gulp.dest('build/rev/node'))
  })
}
