"use strict";

const logger = require('./utils/logger')('koafy/index.js');

const path = require('path');

const address = require('ip').address();

const printLogo = require('./utils/printLogo');

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
    app.context.logger.info(`mode: ${process.env.NODE_ENV}`);
    printLogo();
    console.log(`server on: http://${address}:${port}`);
  });
};

const router = require('./decorator/router');

module.exports = {
  start,
  router
};