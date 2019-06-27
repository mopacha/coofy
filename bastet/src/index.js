const logger = require('./utils/logger')('bastet/index.js')
const path = require('path')
const ENV = process.env.NODE_ENV

const getConfig = filePath => {
	logger.debug('get config from', filePath)
	let config
	try {
		config = require(path.join(process.cwd(), filePath))
	} catch (e) {
		logger.error(`get config file: ${path} failed`)
		config = {}
	}
	return config
}

const start = (options = { baseDir: './src' }) => {
	const coolConfig = require('./config/coolConfig')
	const appConfig = getConfig(`${options.baseDir}/${coolConfig.appConfigPath}`)
	const routesPath = path.join(process.cwd(), `${options.baseDir}/${coolConfig.routesPath}`)
	if(ENV === 'development') {
		require('./server/index.dev')(appConfig, routesPath)
	} else {
		require('./server/index.prod')(appConfig, routesPath)
	}
}

const router = require('./decorator/router')

module.exports = {
	start,
	router
}
