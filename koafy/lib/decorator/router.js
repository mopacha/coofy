"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = exports.setRouter = exports.Route = void 0;

var _path = require("path");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _glob = _interopRequireDefault(require("glob"));

var _ramda = _interopRequireDefault(require("ramda"));

const pathPrefix = Symbol('pathPrefix');
const routeMap = [];

const resolvePath = _ramda.default.unless(_ramda.default.startsWith('/'), _ramda.default.curryN(2, _ramda.default.concat)('/'));

const changeToArr = _ramda.default.unless(_ramda.default.is(Array), _ramda.default.of);

class Route {
  constructor(app, routesPath) {
    this.app = app;
    this.router = new _koaRouter.default();
    this.routesPath = routesPath;
  }

  init() {
    const {
      app,
      router,
      routesPath
    } = this;

    _glob.default.sync((0, _path.resolve)(routesPath, './*.js')).forEach(require);

    _ramda.default.forEach(({
      target,
      method,
      path,
      callback
    }) => {
      const prefix = resolvePath(target[pathPrefix]);
      router[method](prefix + path, ...callback);
    })(routeMap);

    app.use(router.routes());
    app.use(router.allowedMethods());
  }

}

exports.Route = Route;

const setRouter = method => path => (target, key, descriptor) => {
  routeMap.push({
    target,
    method,
    path: resolvePath(path),
    callback: changeToArr(target[key])
  });
  return descriptor;
};

exports.setRouter = setRouter;

const Controller = path => target => target.prototype[pathPrefix] = path;

exports.Controller = Controller;
const Get = setRouter('get');
exports.Get = Get;
const Post = setRouter('post');
exports.Post = Post;
const Put = setRouter('put');
exports.Put = Put;
const Delete = setRouter('delete');
exports.Delete = Delete;