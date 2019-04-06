const koa = require('koa')
const mi = require('./middleware/index')

module.exports = (appConfig)=> {
	const app = new koa()
	mi.setContext(app)
	mi.logger(app)
	mi.koaBody(app)
	mi.view(app, appConfig)
	mi.router(app)
	
	return app
}