

const asker = require('@coofy/asker')
const matcher = require('@coofy/matcher')

module.exports = options=> {
	return async (ctx, next) {
	  const { baseUrl, patterns} = options
		const {url, method, host, headers, body} = ctx.request
		// check if proxy
		if(matcher(url)) {
			asker.post({ ctx, baseURL, url, method: method.toLowerCase(), data: body })
		} else {
			next()
		}
	}
}