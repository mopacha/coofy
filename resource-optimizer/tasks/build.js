const gulp = require('gulp')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const Each = require('gulp-each')

function getP2Rev(p, type) {
  const addExtra = type === 'css' ? '.css' : '.js'
  let revp = p
  const p2reg = /(\d+:")([^\d:,"]*)(",*)/gim
  if (p2reg.test(revp)) {
    revp = revp.replace(p2reg, '$1$2' + `${addExtra}` + '$3')
  }
  return revp
}

function getRev(text, type) {
  let regRev = type === 'css' ? /\+".css"/gim : /\+".js"/gim
  let newText = text.replace(regRev, '')
  const reg = /(\(\{)(\d+:".*",*)(\}.*\)$)/gim
  if (reg.test(newText)) {
    const p2 = RegExp.$2
    let revp = getP2Rev(p2, type)
    newText = newText.replace(reg, '$1' + revp + '$3')
  }
  return newText
}

function revContent(content) {
  let newContent = content
  let regCss = /\(\{[^({]*\.css"/gim
  let regJs = /\(\{[^({]*\.js"/gim
  if (regCss.test(content)) {
    const matchCss = content.match(regCss)[0]
    const replaced = getRev(matchCss, 'css')
    newContent = content.replace(regCss, replaced)
  }
  if (regJs.test(content)) {
    const matchJs = content.match(regJs)[0]
    const replaced = getRev(matchJs, 'js')
    newContent = newContent.replace(regJs, replaced)
  }
  return newContent
}

module.exports = config => {
  const DEST = config.STATIC_BUILD_PATH

  gulp.task('re-content', function () {
    return gulp
      .src(['dist/**/runtime*.js'])
      .pipe(
        Each(function (content, file, callback) {
          const newContent = revContent(content)
          callback(null, newContent)
        })
      )
      .pipe(terser())
      .pipe(gulp.dest(DEST))
  })

  gulp.task('min-script', function () {
    return gulp
      .src(['dist/**/*.js', '!dist/**/runtime*.js'])
      .pipe(terser())
      .pipe(gulp.dest(DEST))
  })

  gulp.task('min-css', function () {
    return gulp
      .src('dist/**/*.css')
      .pipe(
        cleanCSS({
          compatibility: 'ie7'
        })
      )
      .pipe(gulp.dest(DEST))
  })

  gulp.task('min-image', function () {
    return gulp.src('dist/**/*.{jpg,png,gif}').pipe(gulp.dest(DEST))
  })

  gulp.task('min-fonts', function () {
    return gulp.src('dist/**/*.{woff2,eot,ttf,otf}').pipe(gulp.dest(DEST))
  })

  gulp.task('copy-view', function () {
    return gulp
      .src('src/view/**', {
        base: './'
      })
      .pipe(gulp.dest(DEST))
  })

  gulp.task(
    'build',
    gulp.parallel(
      'min-script',
      'min-css',
      'min-image',
      'min-fonts',
      'copy-view',
      're-content'
    )
  )
}
