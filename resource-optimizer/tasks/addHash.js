const gulp = require('gulp')
const RevAll = require('gulp-rev-all')
let Tool = require('gulp-rev-all/tool')
let Path = require('path')
module.exports = config => {
	const REV_OPTIONS = {
		hashLength: 8,
		dontRenameFile: ['.art', '.woff','.ttf'],
		dontUpdateReference:  ['.art', '.woff','.ttf'],
		referenceToRegexs: function referenceToRegexs(reference) {
			let nonFileNameChar = '[^a-zA-Z0-9\\.\\-\\_\\/]'
			let qoutes = '\'|"'
			let escapedRefPathBase = Tool.path_without_ext(reference.path).replace(
				/([^0-9a-z])/gi,
				'\\$1'
			)
			let escapedRefPathExt = Path.extname(reference.path).replace(
				/([^0-9a-z])/gi,
				'\\$1'
			)

			let regExp,
				regExps = []
			let isJSReference = reference.path.match(/\.js$/)

			// Extensionless javascript file references has to to be qouted
			// if (isJSReference) {
			//   regExp =
			//     "(" + qoutes + ")(" + escapedRefPathBase + ")()(" + qoutes + "|$)";
			//   regExps.push(new RegExp(regExp, "g"));
			// }

			// Expect left and right sides of the reference to be a non-filename type character, escape special regex chars
			regExp =
				'(' +
				nonFileNameChar +
				')(' +
				escapedRefPathBase +
				')(' +
				escapedRefPathExt +
				')(' +
				nonFileNameChar +
				'|$)'
			regExps.push(new RegExp(regExp, 'g'))

			return regExps
		}
	}
	gulp.task(
		'addHash',
		gulp.series('build', function() {
			return gulp
				.src([`${config.STATIC_BUILD_PATH}/**`])
				.pipe(RevAll.revision(REV_OPTIONS))
				.pipe(gulp.dest('build/rev/static'))
		})
	)
}
