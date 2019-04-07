
const mproxy = require('./mi-proxy/index')

module.exports = async (app, appConfig) => {

 //prxoy config  with app.config.js
 let proxys = appConfig.proxys || {}

 for (let key in proxys){
 	if(proxys[key]) {
 		const {
 			baseUrl,
 			patterns
 		} = proxys[key]

	  app.use(mproxy({baseUrl, patterns}))
	  app.context.logger.info('proxy initialized')
 	}
 }
}
