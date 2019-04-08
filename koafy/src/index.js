const logger = require('./utils/logger')('koafy/index.js')
const path = require('path')
const address = require('ip').address()
const printLogo = require('./utils/printLogo')

const getConfig = filePath => {
	logger.info('get config from', filePath)
	let config
	try {
		config = require(path.join(process.cwd(), filePath))
	} catch (e) {
		logger.error(`get config file: ${path} failed`)
		config = {}
	}
	return config
}

const create = options => {
	const coolConfig = require('./config/coolConfig')
	const appConfig = getConfig(`${options.baseDir}/${coolConfig.appConfigPath}`)
	const app = require('./app')(appConfig)
	return app
}

const start = (options = { baseDir: './src' }) => {
	const app = create(options)
	const port = process.env.PORT || 3000

	app.listen(port, () => {
		app.context.logger.info(`mode: ${process.env.NODE_ENV}`)
		printLogo()
		console.log(`server on: http://${address}:${port}`)
	})
}

module.exports = {
	start
}
