import axios from 'axios'
class http {
	constructor(options) {
		this.baseUrl = options.baseUrl || ''
		this.timeout = options.timeout || 10000
		this.headers = options.headers = Object.assign(
			{ 'Content-Type': 'application/json;charset=utf-8' },
			options.headers
		)
	}
	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			timeout: this.timeout,
			headers: this.headers
		}
		return config
	}

	interceptors(instance, url) {
		instance.interceptors.request.use(
			config => {
				return config
			},
			error => {
				return Promise.reject(error)
			}
		)
		instance.interceptors.response.use(
			res => {
				const { data } = res
				return data
			},
			error => {
				return Promise.reject(error.response)
			}
		)
	}
	request(options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options)
		this.interceptors(instance, options.url)
		return instance(options)
	}
	ask(options) {
		return this.request(options)
	}
}
export default http
