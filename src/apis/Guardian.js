import Api from './Api'

export default {

    all (form) {
        return Api.post('/admin/guardians', form)
    },

    me (id) {
  	    return Api.get(`/admin/guardians/bio/${id}`)
    },

    create (form) {
    	return Api.post('/admin/guardians/create', form, { 
            headers: { 'Content-Type': 'multipart/form-data' } 
        })
    },

    update (form) {
    	return Api.post('admin/guardians/update', form, { 
            headers: { 'Content-Type': 'multipart/form-data' } 
        })
    },

    wards (guardianId) {
    	return Api.get(`admin/guardians/${guardianId}/wards`)
    }
}
