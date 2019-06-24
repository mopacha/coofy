"use strict";

const render = require('koa-art-template');

const path = require('path');

module.exports = async (app, appConfig) => {
  const root = path.join(process.cwd(), './src/view');
  render(app, {
    root,
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production',
    imports: {
      staticDomain: appConfig.staticDomain,
      staticUrl: appConfig.staticUrl
    }
  });
  app.context.logger.info('view initialized');
};