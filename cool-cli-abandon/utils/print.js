const chalk = require('chalk')
const figlet = require('figlet')
const packageConfig = require('../package.json')
const { version, description } = packageConfig

const printLogo = () => {
	console.log(
		chalk.blue(
			figlet.textSync('cooL', {
				font: 'Slant',
				horizontalLayout: 'full',
				verticalLayout: 'full'
			})
		)
	)
}

const printVersion = () => {
	console.log(`Version: ${version}`)
}

const printHelp = () => {
	console.log(
		`Usage:  cool-cli [command] [options]

${description}
Version: ${version}

Options:
	-V, --version  output the version number
	-h, --help     output usage information

Commands:
	start          start dev server
	build          build project with webpack4
	init           init project
`
	)
}

module.exports = {
	printLogo,
	printVersion,
	printHelp
}
