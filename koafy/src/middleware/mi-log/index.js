const log4js = require('log4js')
const config = require('@coofy/config').log4js
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const access = require('./access')

module.exports = () => {
  let contextLogger = {}
  const logger = log4js.getLogger('koa-vue-web')
  return async (ctx, next) => {
    const start = Date.now()
    log4js.configure(config)
    methods.forEach(method => {
      contextLogger[method] = msg => {
        logger[method](access(ctx, msg, {}))
      }
    })
    ctx.log = contextLogger
    await next()
    const responseTime = Date.now() - start
    logger.info(
      access(
        ctx,
        {
          responseTime: `响应时间为${responseTime / 1000}s`
        },
        {}
      )
    )
  }
}
