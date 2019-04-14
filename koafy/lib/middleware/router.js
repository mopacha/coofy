"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _router = require("../decorator/router");

const router = (app, routesPath) => {
  const instance = new _router.Route(app, routesPath);
  instance.init();
  app.context.logger.info('router initialized');
};

exports.router = router;