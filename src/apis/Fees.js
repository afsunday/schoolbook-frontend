import Api from './Api'
// import * as axtoken from './axtoken'

// const cancelToken = axtoken.CancelToken
// const source = axtoken.source

export default {

    all (form) {
        return Api.post('/admin/fees', form /*, { cancelToken: source.token }*/)
    },

    // fetch fee heads
    heads () {
    	return Api.post('admin/feeheads' /*, { cancelToken: source.token } */)
    },

    feeInvoices (form) {
        return Api.get(`admin/fees/${form.feeId}/invoices?page=${form.page}` /*, {cancelToken: source.token  }*/)
    },

    feeInfo (feeId) {
        return Api.get(`admin/fees/${feeId}/info`/*, { cancelToken: source.token }*/)
    }   
}