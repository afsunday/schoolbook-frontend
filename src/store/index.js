import { createStore } from 'vuex'
import auth from './modules/auth'
import general from './modules/general'
import studentFeeStore from './modules/student/studentFeeStore'

export default createStore({
	modules: {
		general,
		auth,
		studentFeeStore
	}
})


