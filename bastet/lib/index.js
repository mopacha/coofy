"use strict";

const logger = require('./utils/logger')('koafy/index.js');

const path = require('path');

const address = require('ip').address();

const print = require('./utils/print');

const symbols = require('log-symbols');

const chalk = require('chalk');

const getConfig = filePath => {
  logger.debug('get config from', filePath);
  let config;

  try {
    config = require(path.join(process.cwd(), filePath));
  } catch (e) {
    logger.error(`get config file: ${path} failed`);
    config = {};
  }

  return config;
};

const create = options => {
  const coolConfig = require('./config/coolConfig');

  const appConfig = getConfig(`${options.baseDir}/${coolConfig.appConfigPath}`);
  const routesPath = path.join(process.cwd(), `${options.baseDir}/${coolConfig.routesPath}`);

  const app = require('./app')(appConfig, routesPath);

  return app;
};

const start = (options = {
  baseDir: './src'
}) => {
  const app = create(options);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    print.bastet();
    console.log(symbols.success, chalk.green(`\n${process.env.NODE_ENV} server on: http://${address}:${port}`));
    console.log(symbols.info, chalk.green('等待 webpack 编译中，请稍候......\n'));
  });
};

const router = require('./decorator/router');

module.exports = {
  start,
  router
};