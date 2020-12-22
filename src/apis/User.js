import Api from './Api'
import Csrf from './Csrf'

export default {
  async logout () {
    await Csrf.cookie()

    return Api.post('/destroy')
  },

  me () {
    return Api.get('/user')
  }
}
