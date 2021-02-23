import { createStore } from 'vuex'
import auth from './modules/auth'
import general from './modules/general'

import adminSubjectStore from './modules/admin/adminSubjectStore'
import adminStudentStore from './modules/admin/adminStudentStore'


export default createStore({
	modules: {
		general,
		auth,

		adminSubjectStore,
		adminStudentStore
	}
})


