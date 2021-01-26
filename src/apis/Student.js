import Api from './Api'


export default {

    all (form) {
        return Api.post('/admin/students', form)
    },

    me (id) {
  	    return Api.get(`/admin/students/bio/${id}`)
    },

    studentFees(form) {
    	return Api.post('admin/students/fee', form)
    },

    create (form) {
    	return Api.post('admin/students/create', form, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
        })
    },

    update (form) {
    	return Api.post('admin/students/update', form, { 
                headers: { 'Content-Type': 'multipart/form-data' } 
        })
    },

    assignedGuardians (id) {
        return Api.get(`admin/students/${id}/guardians`)
    },

    unAssignGuardian (studentId, guardianId) {
        return Api.get(`admin/students/${studentId}/guardians/${guardianId}/unassign`)
    }, 

    // route to fetch student records by array
    selectedBios (form) {
        return Api.post('admin/students/selects', form)
    }

}
