import Api from './Api'

export default {

    all () {
        return Api.get('/session_terms')
    }   
}
