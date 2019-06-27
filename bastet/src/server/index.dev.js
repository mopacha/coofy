

const koa = require('koa')
const serve = require('koa-static')
const KoaBody = require('koa-body')
const render = require('koa-art-template')
const koaWebpack = require('koa-webpack')
const path = require('path')
const symbols = require('log-symbols')
const chalk = require('chalk')
const address = require('ip').address()
const chokidar = require('chokidar')
const cluster = require('cluster')

const print = require('../utils/print')
const { Route } = require('../decorator/router')
const logger = require('../utils/logger')('bastet/mi')
const mi = require('../middleware/index')
const webpackConfig = require('@coofy/webpack').vspa(process.env.NODE_ENV)
const staticPath = './public'
const root = path.join(process.cwd(), './src/view')
const bastetConfig = require('../config/index')
const getConfig = require('../utils/getConfig')

const resolve = dir => {
    return path.join(process.cwd(), dir)
}

const WEBPACK_PORT = getConfig(bastetConfig.coolConfigPath).devServer.port || 9999
const KOA_PORT = process.env.PORT || 3000


const app = new koa()

const webpackServer = async () => {
    await registerWebpack()
    watchDir()
    app.listen(WEBPACK_PORT)
    console.log(symbols.info, chalk.green('等待 webpack 编译中，请稍候......\n'))
}

const koaServer = (appConfig, routesPath) => {
    console.log(symbols.info, chalk.green('koa服务启动中，请稍后......\n'))
    app.context.logger = logger
    app.use(mi.miLog())
    app.use(serve(path.join(process.cwd(), staticPath)))
    app.use(KoaBody())

    render(app, {
        root,
        extname: '.art',
        debug: process.env.NODE_ENV !== 'production',
        imports: {
            staticDomain: appConfig.staticDomain,
            staticUrl: appConfig.staticUrl
        }
    })

    let proxys = appConfig.proxys || {}
    for (let key in proxys) {
        if (proxys[key]) {
            const { baseUrl, patterns } = proxys[key]
            app.use(mi.miProxy({ baseUrl, patterns }))
            logger.info(
                `proxy: { baseUrl: ${baseUrl}, patterns:${JSON.stringify(patterns)}}`
            )
        }
    }

    new Route(app, routesPath).init()

    app.listen(KOA_PORT, () => {
        print.bastet()
        console.log(symbols.success, chalk.green(`${process.env.NODE_ENV} server on: http://${address}:${KOA_PORT}`))

    })
}


const start = (appConfig, routesPath) => {
    if (cluster.isMaster) {
        webpackServer()
    }

    if (cluster.isWorker) {
        koaServer(appConfig, routesPath)
    }
}


function registerWebpack() {
    return new Promise(resolve => {
        koaWebpack({
            config: webpackConfig,
            devMiddleware: {
                stats: 'minimal',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            },
            hotClient: {
                logLevel: 'silent',
                allEntries: true
            }
        }).then(middleware => {
            app.use(middleware)
            resolve()
        })
    })
}


function watchDir() {
    let worker = cluster.fork();
    const watchConfig = {
        dir: [resolve('src'), resolve('cool.config.js'), resolve('public'), resolve('config')],
        options: {
            ignored: resolve('./src/static'),
        }
    };
    chokidar.watch(watchConfig.dir, watchConfig.options).on('change', filePath => {

        console.log(chalk.green(`**********************${filePath}**********************`))
        worker && worker.kill()

        worker = cluster.fork().on('listening', (address) => {
            console.log(symbols.success, chalk.green(`[master] 监听: id ${worker.id}, pid:${worker.process.pid} ,地址:http://127.0.0.1:${address.port}`))
        })
    })
}



module.exports = start