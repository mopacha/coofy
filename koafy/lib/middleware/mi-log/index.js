"use strict";

const log4js = require('log4js');

const config = require('@coofy/config');

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

const access = require('./access');

const log4jsConf = config.log4js;

module.exports = () => {
  let contextLogger = {};
  let appName = config.appName;
  const logger = log4js.getLogger(appName);
  return async (ctx, next) => {
    const start = Date.now();
    log4js.configure(log4jsConf);
    methods.forEach(method => {
      contextLogger[method] = msg => {
        logger[method](access(ctx, msg, {}));
      };
    });
    ctx.log = contextLogger;
    await next();
    const responseTime = Date.now() - start;
    logger.info(access(ctx, {
      responseTime: `响应时间为:${responseTime / 1000}s`
    }, {}));
  };
};