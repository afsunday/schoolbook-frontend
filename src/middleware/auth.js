import store from '../store'
import User from '@/apis/User'

export default {
  admin (callback) {
    if (store.getters.user === null || store.getters.user.length <= 0) {
      User.me()
	      .then((res) => {
		    	store.commit('SET_USER', res.data)

		    	if (store.getters.user.type === 'admin') {
		      	    return callback(true, 'admin')
		      	}

		      	return callback(false, store.getters.user.type)
	      })
	      .catch((err) => {
	      	    if(err.response.status === 401) {
		      	    return callback(false, err.response.status)
	      	    }

	      	    return callback(false, err.response.status)

	      })
    } else if (store.getters.user.type === 'admin') {
      	  return callback(true, 'admin')
    } else {
      return callback(false, store.getters.user.type)
    }
  }
}
