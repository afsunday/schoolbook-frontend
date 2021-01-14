import Api from './Api'

export default {

    all (form) {
        return Api.post('/admin/staffs', form)
    },

    me (id) {
  	    return Api.get(`/admin/students/bio/${id}`)
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
