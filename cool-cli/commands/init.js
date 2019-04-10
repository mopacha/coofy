const inquirer = require('inquirer')
const download = require('@coofy/download-git')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const fs = require('fs')

const template = require('art-template')

const init = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Please enter the projectName.',
				default: 'cool-web',
				validate: function(input) {
					if (!input.length > 0) {
						return console.log(
							symbols.error,
							chalk.red('Please enter the projectName.')
						)
					} else if (fs.existsSync(input)) {
						return console.log(
							symbols.error,
							chalk.red('Project has already exist, please change the name.')
						)
					} else {
						return true
					}
				}
			},
			{
				type: 'list',
				name: 'preset',
				message: 'Which preset do you want ?',
				choices: ['VUE', 'IE8']
			},
			{
				type: 'input',
				name: 'staticServerPort',
				message: 'Please enter the  staticServerPort.',
				default: 8686
			},
			{
				type: 'input',
				name: 'nodeServerPort',
				message: 'Please enter the  nodeServerPort.',
				default: 3000
			},
			{
				type: 'input',
				name: 'description',
				message: 'Please enter the project description.'
			}
		])
		.then(answers => {
			const spinner = ora('Load init tempalte...')
			spinner.start()
			const { name, description, staticServerPort, nodeServerPort } = answers

			const staticConextPath = `${name.replace(/-web$/, '') + '-static'}`

			download('mopacha/koa-vue-web#v1.0.0', name, err => {
				if (err) {
					spinner.fail()
					console.log(symbols.error, chalk.red(err))
				} else {
					spinner.succeed()

					const meta = {
						name,
						description,
						staticServerPort,
						nodeServerPort,
						staticConextPath
					}

					const root = `${process.cwd()}/${name}`

					const rewriteFiles = [
						`${root}/config/development.js`,
						`${root}/config/env-config.json`,
						`${root}/cool.config.js`,
						`${root}/process.json`,
						`${root}/package.json`
					]

					rewriteFiles.map(file => {
						const result = template(file, meta)
						fs.writeFileSync(file, result)
					})
					console.log(symbols.success, chalk.green('Project init success'))
				}
			})
		})
}

init()
