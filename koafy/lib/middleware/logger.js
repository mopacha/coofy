"use strict";

const miLog = require('./mi-log/index');

module.exports = async app => {
  app.use(miLog());
  app.context.logger.info('Logger initialized');
};