const KoaBody = require('koa-body')
module.exports = async app => {
  app.use(KoaBody())
  app.context.logger.info('koa-body initialized')
}
