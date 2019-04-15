"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = exports.Route = void 0;

const KoaRouter = require('koa-router');

const glob = require('glob');

const R = require('ramda');

const path = require('path');

const pathPrefix = Symbol('pathPrefix');
const routeMap = [];
const resolvePath = R.unless(R.startsWith('/'), R.curryN(2, R.concat)('/'));
const changeToArr = R.unless(R.is(Array), R.of);

class Route {
  constructor(app, routesPath) {
    this.app = app;
    this.router = new KoaRouter();
    this.routesPath = routesPath;
  }

  init() {
    const {
      app,
      router,
      routesPath
    } = this;
    glob.sync(path.resolve(routesPath, './**/*.js')).map(file => {
      require(file);
    });
    R.forEach(({
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

const Controller = path => target => {
  target.prototype[pathPrefix] = path;
};

exports.Controller = Controller;
const Get = setRouter('get');
exports.Get = Get;
const Post = setRouter('post');
exports.Post = Post;
const Put = setRouter('put');
exports.Put = Put;
const Delete = setRouter('delete');
exports.Delete = Delete;