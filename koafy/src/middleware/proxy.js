const mproxy = require('./mi-proxy/index')

module.exports = async (app, appConfig) => {
	let proxys = appConfig.proxys || {}

	for (let key in proxys) {
		if (proxys[key]) {
			const { baseUrl, patterns } = proxys[key]
			app.use(mproxy({ baseUrl, patterns }))
			app.context.logger.info(`proxy: { baseUrl: ${baseUrl}, patterns:${JSON.stringify(patterns)}}`)
		}
	}
}
