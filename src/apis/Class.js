import Api from './Api'

export default {

  classes() {
    return Api.get('/classes')
  }

  classWithArms() {
  	return Api.get('/class')
  }
}
