/* eslint-disable no-return-await */
const axios = require('axios')

axios.interceptors.response.use(
	response => {
		return Promise.resolve(response)
	},
	error => {
		return Promise.reject(error.response)
	}
)

let Asker = {}
Asker.request = async options => {
	options.headers = Object.assign(
		{ 'Content-Type': 'application/json;charset=utf-8' },
		options.headers
	)
	return await axios(options)
		.then(function(res) {
			options.ctx.log.info(res.data)
			return res.data
		})
		.catch(function(res) {
			options.ctx.log.error(res.response.data)
			return { status: res.response.status, error: res.response.data }
		})
}

Asker.get = async options => {
	return await Asker.request(Object.assign({ method: 'get' }, options))
}

Asker.post = async options => {
	return await Asker.request(Object.assign({ method: 'post' }, options))
}

module.exports = Asker
