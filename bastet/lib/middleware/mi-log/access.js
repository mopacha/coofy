"use strict";

module.exports = (ctx, message, commonInfo) => {
  const {
    url,
    method,
    host,
    headers
  } = ctx.request;
  const client = {
    url,
    method,
    host,
    message,
    referer: headers['referer'],
    userAgent: headers['user-agent']
  };
  return JSON.stringify(Object.assign(commonInfo, client));
};