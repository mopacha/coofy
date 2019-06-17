

const setContext = require('./set-context')
const logger = require('./logger')
const koaBody = require('./koa-body')
const koaStatic = require('./koa-static')
const view = require('./view')
const proxy =require('./proxy')
const router = require('./router')

module.exports = {
  setContext,
  logger,
  koaBody,
  koaStatic,
  view,
  proxy,
  router
}
