import Api from './Api'

export default {

    all (form) {
        return Api.post('/admin/fees', form)
    },

    // fetch fee heads
    heads () {
    	return Api.post('admin/feeheads')
    },

    create (form) {
    	return Api.post('admin/staffs/create', form, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
        })
    },

    update (form) {
    	return Api.post('admin/staffs/update', form, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
        })
    }   
}