import axios from 'axios'
import Nprogress from 'nprogress'

const Api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

Api.defaults.withCredentials = true

Api.interceptors.request.use(config => {
  Nprogress.start()
  return config
})

Api.interceptors.response.use((response) => {
  Nprogress.done(true)
  return response
}, function (err) {
	// if(err.config && err.response && err.response.status >= 500) {
	// 	return Api.request({
	// 		method: err.config.method,
	// 		url: err.config.url,
	// 		params: err.config.params,
	// 		withCredentials: true
	// 	});
	// }
  Nprogress.done(true)
  return Promise.reject(err)
})

export default Api
