export default (form, localStorageKeyName) => {

	const updateForm = (field, value, formFields) => {
        formFields[field] = value;

        let storedForm = openStorage();
        if (!storedForm) {
            storedForm = {}
        }

        storedForm[field] = value;
        saveStorage(storedForm);
    }

    const openStorage = () => {
        return JSON.parse(localStorage.getItem(localStorageKeyName))
    }

    const saveStorage = (storedForm) => {
        localStorage.setItem(localStorageKeyName, JSON.stringify(storedForm))
    }

    const removeStorage = () => {
        localStorage.removeItem(localStorageKeyName);
    }

    return { updateForm, openStorage, saveStorage, removeStorage }
}
