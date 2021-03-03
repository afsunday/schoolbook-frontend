import Api from './Api'

export default {

 classArms() {
    return Api.get('/class-arms')
  },

  allClass() {
  	return Api.get('/classes')
  }
}
