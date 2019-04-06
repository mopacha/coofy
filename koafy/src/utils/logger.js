const log4js = require('log4js')

module.exports = (name = '@coofy/koafy-web') => log4js.getLogger(name)