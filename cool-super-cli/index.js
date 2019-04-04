const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')
const path = require('path')
const debug = require('debug')('cool')
const CoolConfig = require('./lib/CoolConfig')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

let WebpackConfig

const statOptions = {
  colors: true,
  chunks: false
}

function printLogo () {
  console.log(
    chalk.blue(
      figlet.textSync('cooL', {
        font: 'larry 3d', // or slant
        horizontalLayout: 'full',
        verticalLayout: 'full'
      })
    )
  )
}

function requireWepackConfig (preset) {
  WebpackConfig = require('./config/' + preset + '/WebpackConfig')
}

function getCoolConfig (coolConfigPath, env) {
  let config
  try {
    config = require(path.join(process.cwd(), coolConfigPath))
  } catch (e) {
    console.log('读取cool.config.js 失败')
    debug('read cool.config.js error', e)
    config = {}
  }
  config = Object.assign(CoolConfig.get(), config)
  requireWepackConfig(config.preset)

  config.webpackConfig = config.webpack(WebpackConfig[env](env))
  return config
}

// 定义版本和参数选项
program.version('2.0.2', '-v, --version').on('--help', () => printLogo())

program
	.command('start')
	.description('start running your project')
  .option('-c --config [config]', 'cool配置文件', './cool.config.js')
  .action(cmd => {
		printLogo()
    debug('cool start')
    const coolConfig = getCoolConfig(cmd.config, 'development')
    WebpackConfig.pkDevelopment(coolConfig)

    console.log(`DevServer on http://127.0.0.1:${coolConfig.devServer.port}`)

    const compiler = webpack(coolConfig.webpackConfig)

    const server = new WebpackDevServer(compiler, {
      stats: statOptions,
      hot: coolConfig.devServer.hot,
      publicPath: coolConfig.devServer.publicPath,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      disableHostCheck: true
    })
    server.listen(coolConfig.devServer.port, '127.0.0.1', function () {})
  })

program
	.command('build')
	.description('start building your project')
  .option('-c --config [config]', 'cool配置文件', './cool.config.js')
  .action(function (cmd) {
		printLogo()
    const coolConfig = getCoolConfig(cmd.config, 'production')
    WebpackConfig.pkProduction(coolConfig)

    webpack(coolConfig.webpackConfig, function (err, stat) {
      if (err) {
        console.log(err)
      } else {
        console.log(stat.toString(statOptions))
      }
    })
  })

program.parse(process.argv)
