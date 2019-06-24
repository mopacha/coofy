const { Route } = require('../decorator/router')

module.exports = async (app, routesPath) => {
	const instance = new Route(app, routesPath)

	instance.init()
	app.context.logger.info('router initialized')
}
