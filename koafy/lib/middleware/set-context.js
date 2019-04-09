"use strict";

let logger = require('../utils/logger')('koafy-run');

logger.level = 'debug';

module.exports = async app => {
  app.context.logger = logger;
  app.context.logger.info('set-context initialized');
};