import Api from './Api'

export default {
  cookie () {
    return Api.get('/csrf-cookie')
  }
}
