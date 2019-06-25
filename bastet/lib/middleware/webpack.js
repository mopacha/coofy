"use strict";

const koaWebpack = require('koa-webpack');

const webpackConfig = require('@coofy/webpack').vspa(process.env.NODE_ENV);

module.exports = async app => {
  if (process.env.NODE_ENV === 'development') {
    koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        stats: 'minimal',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
      hotClient: {
        logLevel: 'silent',
        allEntries: true
      }
    }).then(middleware => {
      app.use(middleware);
    });
  }
};