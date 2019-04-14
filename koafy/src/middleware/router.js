import { Route } from '../decorator/router'

export const router = (app, routesPath) => {
  const instance = new Route(app, routesPath)

  instance.init()
  app.context.logger.info('router initialized')
}