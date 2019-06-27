const logger = require('./logger')('bastet/index.js')
const path = require('path')

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

module.exports = getConfig