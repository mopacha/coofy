let logger = require('log4js').getLogger('cool-env')
let INSERT_REGEX = /\${([^}]+)}/g

function figureOut (key, envJSON) {
  let val = envJSON[key]
  if (!val) {
    return ''
  } else if (INSERT_REGEX.test(val)) {
    return (envJSON[key] = val.replace(INSERT_REGEX, function (unused, key) {
      logger.debug(key)
      return figureOut(key, envJSON)
    }))
  } else {
    return val
  }
}

module.exports = envJSON => {
  if (!envJSON) {
    return envJSON
  }
  for (let key in envJSON) {
    if (envJSON.hasOwnProperty(key)) {
      figureOut(key, envJSON)
      logger.debug(`${key}: ${envJSON[key]}`)
    }
  }
  return envJSON
}
