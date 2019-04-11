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
				type: 'list',
				name: 'config',
				message: 'Config the existed project only ?',
				default: 'no',
				choices: ['yes', 'no'],
				validate: input => {
					if (input.lowerCase !== 'yes' && input.lowerCase !== 'no') {
						return console.log(symbols.error, chalk.red('Please input yes/no !.'))
					} else {
						return true
					}
				}
			},
			{
				type: 'input',
				name: 'cname',
				message: 'Please enter the config project name.',
				when: function(answers) {
					return answers.config === 'yes'
				},
				validate: function(input) {
					if (!input.length > 0) {
						return console.log(
							symbols.error,
							chalk.red('Please enter the config project name.')
						)
					} else {
						return true
					}
				}
			},

			{
				type: 'input',
				name: 'name',
				message: 'Please enter the new project name.',
				default: 'cool-web',
				when: function(answers) {
					return answers.config === 'no'
				},
				validate: function(input) {
					if (!input.length > 0) {
						return console.log(
							symbols.error,
							chalk.red('Please enter the project name.')
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
				choices: ['Vue-PC', 'Vue-H5', 'React']
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
			const spinner = ora(
				`${answers.config === 'no' ? 'Load tempalte' : 'Config project'}`
			)
			spinner.start()
			const {
				config,
				description,
				staticServerPort,
				nodeServerPort
			} = answers

			const name = answers.config === 'no' ? answers.name : answers.cname

			const staticConextPath = `${name.replace(/-web$/, '') + '-static'}`

			const meta = {
				name,
				description,
				staticServerPort,
				nodeServerPort,
				staticConextPath
			}

			if (config === 'yes') {
				spinner.succeed()
				rewriteFiles(meta)
			} else {
				download('mopacha/koa-vue-web#v1.0.0', name, err => {
					if (err) {
						spinner.fail()
						console.log(symbols.error, chalk.red(err))
					} else {
						spinner.succeed()
						rewriteFiles(meta)
					}
				})
			}
		})
}

function rewriteFiles(meta) {
	const root = `${process.cwd()}/${meta.name}`

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

init()
