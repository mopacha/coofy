

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
const app = new koa()

const webpackServer = async() => {
    const WEBPACK_PORT = getConfig(bastetConfig.coolConfigPath).devServer.port || 9999
    const HOT = getConfig(bastetConfig.coolConfigPath).devServer.hot

    const middleware = await koaWebpack({
        config: webpackConfig,
        devMiddleware: {
            stats: 'minimal',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },
        hotClient: HOT ? {
            logLevel: 'silent',
            allEntries: true
        } : false
    })

    app.use(middleware)

    watchDir()
    app.listen(WEBPACK_PORT)
    console.log(symbols.info, chalk.green('webpack compiling, please wait......\n'))
}

const koaServer = (appConfig, routesPath) => {
    console.log(symbols.info, chalk.green('koa server begin to start......\n'))
    const KOA_PORT = process.env.PORT || 3000
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
        console.log(symbols.success, chalk.green(`server on: http://${address}:${KOA_PORT}`))
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


function watchDir() {
    let worker = cluster.fork();
    const watchConfig = {
        dir: [resolve('src'), resolve('cool.config.js'), resolve('public'), resolve('config')],
        options: {
            ignored: resolve('./src/static'),
            awaitWriteFinish: {
                stabilityThreshold: 500,
                pollInterval: 500
            },
        }
    };
    chokidar.watch(watchConfig.dir, watchConfig.options).on('change', filePath => {
        console.log(chalk.green(`**********************${filePath}**********************`))
        worker && worker.kill()

        worker = cluster.fork().on('listening', (address) => {
            console.log(symbols.success, chalk.green(`[master] listening: id ${worker.id}, pid:${worker.process.pid} ,address:http://127.0.0.1:${address.port}`))
        })
    })
}

module.exports = start