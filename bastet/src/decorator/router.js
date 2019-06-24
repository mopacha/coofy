const KoaRouter = require('koa-router')
const glob = require('glob')
const R = require('ramda')
const path = require('path')

const pathPrefix = Symbol('pathPrefix')
const routeMap = []
const resolvePath = R.unless(R.startsWith('/'), R.curryN(2, R.concat)('/'))
const changeToArr = R.unless(R.is(Array), R.of)

export class Route {
	constructor(app, routesPath) {
		this.app = app
		this.router = new KoaRouter()
		this.routesPath = routesPath
	}
	init() {
		const { app, router, routesPath } = this
		glob.sync(path.resolve(routesPath, './**/*.js')).map(file => {
			require(file)
		})

		R.forEach(({ target, method, path, callback }) => {
			const prefix = resolvePath(target[pathPrefix])
			router[method](prefix + path, ...callback)
		})(routeMap)

		app.use(router.routes())
		app.use(router.allowedMethods())
	}
}

const setRouter = method => path => (target, key, descriptor) => {
	routeMap.push({
		target,
		method,
		path: resolvePath(path),
		callback: changeToArr(target[key])
	})
	return descriptor
}

export const Controller = path => target => {
	target.prototype[pathPrefix] = path
}

export const Get = setRouter('get')
export const Post = setRouter('post')
export const Put = setRouter('put')
export const Delete = setRouter('delete')
