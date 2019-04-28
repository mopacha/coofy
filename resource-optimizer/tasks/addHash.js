const gulp = require('gulp')
const RevAll = require('gulp-rev-all')
module.exports = config => {
	
	const REV_OPTIONS = {
		hashLength: 8,
		dontRenameFile:['.art'],
		dontUpdateReference: ['.art']
	}
	gulp.task('addHash', gulp.series('build', function () {
    return gulp
      .src([`${config.STATIC_BUILD_PATH}/**`])
			.pipe(RevAll.revision(REV_OPTIONS))
			.pipe(gulp.dest('build/rev/static'))
  }))
}
