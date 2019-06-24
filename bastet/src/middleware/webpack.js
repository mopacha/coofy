

const koaWebpack = require('koa-webpack')
const webpackConfig = require('@coofy/webpack').vspa(process.env.NODE_ENV)

module.exports = async app => {
   await koaWebpack({
    config: webpackConfig,
    devMiddleware: {
      stats: 'minimal'
    }
  }).then(middleware => {
    app.use(middleware)
    app.context.logger.info('webpack.... ')
  })
}



