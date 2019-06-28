const webpack = require('webpack')
const chalk = require('chalk')
const symbols = require('log-symbols')
const statOptions = {
	colors: true,
	chunks: false
}

const build = () => {
	const env = 'production'
	const webpackConfig = require('@coofy/webpack').vspa(env)
	console.log(symbols.info, chalk.green('webpack compiling, please wait......'))
	webpack(webpackConfig, function(err, stat) {
		if (err) {
			console.log(err)
		} else {
			console.log(stat.toString(statOptions)+'\n')
			console.log(symbols.success, chalk.green('webpack compiling  success'))
		}
	})
}

build()
