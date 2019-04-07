

const setContext = require('./set-context')
const logger = require('./logger')
const koaBody = require('./koa-body')
const view = require('./view')
const proxy =require('./proxy')
const router = require('./router')

module.exports = {
  setContext,
  logger,
  koaBody,
  view,
  proxy,
  router
}
