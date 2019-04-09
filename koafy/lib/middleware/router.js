"use strict";

const path = require('path');

const koaRouter = require('koa-router');

const readDirSync = require('../utils/read-dirsync');

let allPartRouter = [];

module.exports = async app => {
  const basename = path.basename(module.filename);
  const router = koaRouter({
    prefix: '/'
  }); // 遍历所有路由 

  readDirSync(path.join(process.cwd(), './src/router'), function (fileName, isDirectory, dirPath) {
    const isJsFile = dirPath.indexOf('.') !== 0 && fileName !== basename && dirPath.slice(-3) === '.js';

    if (!isDirectory && isJsFile) {
      const partRouter = require(dirPath);

      allPartRouter = allPartRouter.concat(partRouter);
    }
  });
  allPartRouter.forEach(function (item) {
    router[item.method || 'get'](`${item.path}`, item.ctrl);
  });
  app.use(router.routes(), router.allowedMethods());
  app.context.logger.info('router initialized');
};