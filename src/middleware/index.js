import store from '../store'
import User from '@/apis/User'

export default {
	async admin (callback) {
		if (store.getters.user === null || store.getters.user.length <= 0) {
	        await User.me().then((res) => {

		    	store.commit('SET_USER', res.data)

		    	if (store.getters.user.type === 'admin') {
		    		store.commit('SET_LOGIN_STATUS', true)
		    		callback(true)
		    	} else {
		    		store.commit('SET_LOGIN_STATUS', false)	
		    		callback(false)
		    	} 

		    })
		    .catch((err) => {

	      	    if (err.response.status === 401 || err.response.status === 403) {
	      	    	store.commit('SET_LOGIN_STATUS', false)
	      	    	return callback(false)
	      	    } else {
	      	    	store.commit('SET_LOGIN_STATUS', false)
	      	    	store.commit('SET_APP_LOAD_RETRY', true)
	      	    	return callback('retry')	      
	      	    }
		    })
		}
		else if (store.getters.user.type === 'admin') {
	      	store.commit('SET_LOGIN_STATUS', true)
	      	callback(true)
	    } else {
		    store.commit('SET_LOGIN_STATUS', false)
		    callback(false)
	    }
	}
}
