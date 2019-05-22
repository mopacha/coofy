

let logger = require('../utils/logger')('koafy/mi')

module.exports = async app => {
  app.context.logger = logger
  app.context.logger.info('set-context initialized')
}
