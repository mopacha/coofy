"use strict";

const koa = require('koa');

const serve = require('koa-static');

const KoaBody = require('koa-body');

const render = require('koa-art-template');

const path = require('path');

const symbols = require('log-symbols');

const chalk = require('chalk');

const address = require('ip').address();

const print = require('../utils/print');

const {
  Route
} = require('../decorator/router');

const logger = require('../utils/logger')('bastet/mi');

const mi = require('../middleware/index');

const staticPath = './public';
const root = path.join(process.cwd(), './src/view');

const startKoa = (appConfig, routesPath) => {
  const app = new koa();
  app.context.logger = logger;
  logger.info('start server ......');
  app.use(mi.miLog());
  app.use(serve(path.join(process.cwd(), staticPath)));
  app.use(KoaBody());
  render(app, {
    root,
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production',
    imports: {
      staticDomain: appConfig.staticDomain,
      staticUrl: appConfig.staticUrl
    }
  });
  let proxys = appConfig.proxys || {};

  for (let key in proxys) {
    if (proxys[key]) {
      const {
        baseUrl,
        patterns
      } = proxys[key];
      app.use(mi.miProxy({
        baseUrl,
        patterns
      }));
      logger.info(`proxy: { baseUrl: ${baseUrl}, patterns:${JSON.stringify(patterns)}}`);
    }
  }

  new Route(app, routesPath).init();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    print.bastet();
    console.log(symbols.success, chalk.green(`${process.env.NODE_ENV} server on: http://${address}:${port}`));
  });
};

module.exports = startKoa;