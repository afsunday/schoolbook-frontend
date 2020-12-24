import store from '../store'
import User from '@/apis/User'

export default {
	async admin (callback) {
		if (store.getters.user === null || store.getters.user.length <= 0) {
	        await User.me().then((res) => {

		    	store.commit('SET_USER', res.data)
		    	if (store.getters.user.type === 'admin') return callback(true)
		      	else return callback(false)
		    })
		    .catch((err) => {
	      	    if (err.response.status === 401) return callback(false)
	      	    else return callback(false)
		    })
		}
		else if (store.getters.user.type === 'admin') {
	      	return callback(true)
	    } else {
		    return callback(false)
	    }
	}
}
