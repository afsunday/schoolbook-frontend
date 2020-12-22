import Api from '@/apis/Api'
import Csrf from '@/apis/Csrf'
import User from '@/apis/User'

const state = {
  user: ''
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
  },

  getAuthUser ({ commit }) {
    User.auth()
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((err) => {
      })
  }

}

const mutations = {
  SET_USER: (state, user) => (state.user = user)
}

export default {
  state,
  getters,
  actions,
  mutations
}
