const path = require('path')

const getCoolConfig = ()=> {
  let config
  try {
    config = require(path.join(process.cwd(), './cool.config.js'))
  } catch (e) {
    console.log('read cool.config.js fail')
    config = {}
  }
  return config
}

module.exports = getCoolConfig