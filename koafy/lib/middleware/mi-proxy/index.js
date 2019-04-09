"use strict";

const Asker = require('@coofy/asker');

const matcher = require('@coofy/matcher');

module.exports = options => {
  return async (ctx, next) => {
    const {
      baseUrl,
      patterns
    } = options;
    const {
      url,
      method,
      headers,
      body
    } = ctx.request;

    if (matcher.match(patterns, url)) {
      const data = await Asker.request({
        headers: {
          'Content-Type': headers['content-type'] || 'application/json;charset=utf-8',
          'user_id': headers['user_id'] || ''
        },
        ctx,
        baseURL: baseUrl,
        url,
        method: method.toLowerCase(),
        data: body
      });
      ctx.body = data;
    } else {
      await next();
    }
  };
};