import axios from 'axios'
import Nprogress from 'nprogress'
import store from '../store'

const Api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

Api.defaults.withCredentials = true

Api.interceptors.request.use(config => {
  Nprogress.start()
    let cancelSource = axios.CancelToken.source()

    // Set cancel token on this request
    config.cancelToken = cancelSource.token

    // Add to vuex to make cancellation available from anywhere
    store.commit('general/ADD_CANCEL_TOKEN', cancelSource)

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