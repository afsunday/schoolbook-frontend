import store from '../store'
import User from '@/apis/User'

export default {
	async authed(callback) {
		if (store.getters.user === null || store.getters.user.length <= 0) {
	        await User.me().then((res) => {
		    	store.commit('SET_USER', res.data)

		    	return callback(true)
		    })
		    .catch((err) => {
	      	    if (err.response.status > 400 && err.response.status < 500) {
	      	    	return callback(false)
	      	    } else {
	      	    	store.commit('SET_APP_LOAD_RETRY', true)
	      	    	return callback('retry')	      
	      	    }
		    })
		} else {
			callback(true)
		}
	}
}
