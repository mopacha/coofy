"use strict";

const setContext = require('./set-context');

const logger = require('./logger');

const koaBody = require('./koa-body');

const koaStatic = require('./koa-static');

const view = require('./view');

const proxy = require('./proxy');

const router = require('./router');

const webpack = require('./webpack');

module.exports = {
  setContext,
  logger,
  koaBody,
  koaStatic,
  view,
  proxy,
  webpack,
  router
};