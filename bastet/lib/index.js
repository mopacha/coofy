"use strict";

const path = require('path');

const getConfig = require('./utils/getConfig');

const ENV = process.env.NODE_ENV;

const start = (options = {
  baseDir: './src'
}) => {
  const bastetConfig = require('./config');

  const appConfig = getConfig(`${options.baseDir}/${bastetConfig.appConfigPath}`);
  const routesPath = path.join(process.cwd(), `${options.baseDir}/${bastetConfig.routesPath}`);

  if (ENV === 'development') {
    require('./server/index.dev')(appConfig, routesPath);
  } else {
    require('./server/index.prod')(appConfig, routesPath);
  }
};

const router = require('./decorator/router');

module.exports = {
  start,
  router
};