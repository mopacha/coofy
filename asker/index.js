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
		.catch(function(err) {
			let error = err || {}
			if (!err) {
				error.status = 500
			}
			const { status, data, statusText } = error
			const resError = {
				status,
				data,
				statusText
			}
			options.ctx.log.error(resError)
			return resError
		})
}

Asker.get = async options => {
	return Asker.request(Object.assign({ method: 'get' }, options))
}

Asker.post = async options => {
	return Asker.request(Object.assign({ method: 'post' }, options))
}

module.exports = Asker
