const webpack = require('webpack')
const { getCoolConfig } = require('../config/coolConfig')

function requireWepackConfig(preset) {
	return require('../config/' + preset + '/WebpackConfig')
}

const statOptions = {
	colors: true,
	chunks: false
}

const build = () => {
	const env = 'production'
	const coolConfig = getCoolConfig(env)
	const WebpackConfig = requireWepackConfig(coolConfig.preset)

	coolConfig.webpackConfig = coolConfig.webpack(WebpackConfig[env](env))

	WebpackConfig.pkProduction(coolConfig)
	webpack(coolConfig.webpackConfig, function(err, stat) {
		if (err) {
			console.log(err)
		} else {
			console.log(stat.toString(statOptions))
		}
	})
}

build()
