const koa = require('koa')
const mi = require('./middleware/index')

module.exports = (appConfig, routesPath) => {
	const app = new koa()
	mi.setContext(app)
	mi.logger(app)
	mi.koaStatic(app)
	mi.koaBody(app)
	mi.view(app, appConfig)
	//透传
	mi.proxy(app, appConfig)

	if (process.env.NODE_ENV === 'development') {
		mi.webpack(app)
	}

	mi.router(app, routesPath)
	return app
}
