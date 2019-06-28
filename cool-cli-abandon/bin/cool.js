#!/usr/bin/env node

const chalk = require('chalk')
const { printHelp, printLogo, printVersion } = require('../utils/print')
const runScript = require('../utils/runScript');
const command = process.argv[2]
const args = process.argv.slice(3)

const handle = command => {
	runScript(`../commands/${command}`, args)
}

const execute = () => {
	switch (command) {
		case 'start':
		case 'build':
		case 'init':
			handle(command)
			break
		case undefined:
		case '--help':
		case '-h':
			printLogo()
			printHelp()
			break
		case '--version':
		case '-v':
		case '-V':
			printVersion()
			break
		default:
			console.log(
				chalk.red(`the command ${chalk.underline.bold(command)} can not support`)
			)
			printHelp()
	}
}

execute()
