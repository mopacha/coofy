const { getCoolConfig } = require('../config/coolConfig')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

function requireWepackConfig(preset) {
	return require('../config/' + preset + '/WebpackConfig')
}

const start = () => {
	const env = 'development'
	const coolConfig = getCoolConfig(env)
	const WebpackConfig = requireWepackConfig(coolConfig.preset)
	coolConfig.webpackConfig = coolConfig.webpack(WebpackConfig[env](env))

	WebpackConfig.pkDevelopment(coolConfig)
	console.log(`DevServer on http://127.0.0.1:${coolConfig.devServer.port}`)
	const compiler = webpack(coolConfig.webpackConfig)
	const server = new WebpackDevServer(compiler, {
		stats: {
			colors: true,
			chunks: false
		},
		hot: coolConfig.devServer.hot,
		publicPath: coolConfig.devServer.publicPath,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		disableHostCheck: true
	})
	server.listen(coolConfig.devServer.port, '127.0.0.1', () => {})
}

start()
