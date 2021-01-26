import Api from '@/apis/Api'
import Csrf from '@/apis/Csrf'
import User from '@/apis/User'

const state = {
    user: '',
    appLoadRetry:false,
    appReady: false,
    loggedIn: false,
}

const getters = {
    user (state) {
        return state.user
    }
}

const actions = {
    async login ({ commit }, form) {
        await Csrf.cookie()
        return Api.post('/login', form)
    }
}

const mutations = {
  SET_USER: (state, user) => (state.user = user),
  SET_LOGIN_STATUS: (state, bool) => (state.loggedIn = bool),
  SET_APP_LOAD_RETRY: (state, bool) => (state.appLoadRetry = bool),
  SET_APP_READY: (state, bool) => (state.appReady = bool)
}

export default {
  state,
  getters,
  actions,
  mutations
}
