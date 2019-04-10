const inquirer = require('inquirer')
const download = require('@coofy/download-git')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const os = require('os')
const path = require('path')
const fs = require('fs')

const init = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'projectName',
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
				name: 'description',
				message: 'Please enter the project description.'
			}
		])
		.then(answers => {
			const spinner = ora('Load init tempalte...')
			spinner.start()
			const projectName = answers.projectName

			download('mopacha/koa-vue-web#v1.0.0', projectName, err => {
				if (err) {
					spinner.fail()
					console.log(symbols.error, chalk.red(err))
				} else {
					spinner.succeed()

					console.log(symbols.success, chalk.green('Project init success'))
				}
			})
		})
}

init()
