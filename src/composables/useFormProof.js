export default (form = {}, keyString) => {

	const updateForm = (field, value) => {
        form[field] = value;

        let storedForm = openStorage();
        if (!storedForm) {
            storedForm = {}
        }

        storedForm[field] = value;
        saveStorage(storedForm);
    }

    const openStorage = () => {
        return JSON.parse(localStorage.getItem(keyString))
    }

    const saveStorage = (form) => {
        localStorage.setItem(keyString, JSON.stringify(form))
    }

    const removeStorage = () => {
        localStorage.removeItem(keyString);
    }

    return { updateForm, openStorage, saveStorage, removeStorage }
}
