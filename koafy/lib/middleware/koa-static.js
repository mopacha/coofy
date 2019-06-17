"use strict";

const path = require('path');

const serve = require('koa-static');

const staticPath = './public';
/**
 * 静态文件
 */

module.exports = async app => {
  app.use(serve(path.join(process.cwd(), staticPath)));
  app.context.logger.info('koa-static initialized');
};