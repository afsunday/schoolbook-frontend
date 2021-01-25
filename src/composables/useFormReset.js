export default (form, initialFields) => {

	const resetForm = (localStorageKeyName = '', callback) => {

        for (let field in form) {
            form[field] = '';
        }

        for (let field in initialFields) {
        	form[field] = initialFields[field]
        }

        if (localStorageKeyName.length  > 0) {
            localStorage.removeItem(localStorageKeyName) 
        }

        return callback(form)      
    }

    return {
    	resetForm
    }
}