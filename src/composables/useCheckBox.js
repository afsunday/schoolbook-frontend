import { ref, onMounted, onUpdated } from 'vue'

export default (storageKey = '') => {

	const selectedCheckBoxes = ref([])
    const checkBoxElements = ref([])
    const checkAllCheckBox = ref(null)

    const checkPatch = () => {
        let storageCheckBoxes = JSON.parse(localStorage.getItem(storageKey));
        if (storageCheckBoxes) selectedCheckBoxes.value = storageCheckBoxes;
    }

    onMounted(checkPatch)

    const checkAll = () => {
        let elements = checkBoxElements.value

        if (event.currentTarget.checked) {
            elements.forEach((item) => {

                let checkBox = item.getAttribute('id');
                let index = selectedCheckBoxes.value.indexOf(checkBox);

                if (index <= -1) {
                    selectedCheckBoxes.value.push(checkBox)

                    if (storageKey.length  > 3) {
                        localStorage.setItem(storageKey, JSON.stringify(selectedCheckBoxes.value))
                    }
                } 
            })
        } else {
            elements.forEach((item) => {

                let checkBox = item.getAttribute('id');
                let index = selectedCheckBoxes.value.indexOf(checkBox);

                if (index > -1) {
                    selectedCheckBoxes.value.splice(index, 1)

                    if (storageKey.length > 3) {
                        localStorage.setItem(storageKey, JSON.stringify(selectedCheckBoxes.value))
                    }
                }

                let localBank =  JSON.parse(localStorage.getItem(storageKey))

                if (localBank.length <=0) {
                    removeCheckStorage()
                }
            })
        }
    }

    const checkOne = (event) => {

        let checkBox = event.target.getAttribute('id')
        if (event.currentTarget.checked) {
            
            selectedCheckBoxes.value.push(checkBox);
            if (storageKey.length > 3) {
               localStorage.setItem(storageKey, JSON.stringify(selectedCheckBoxes.value));
            }
        } else {

            let index = selectedCheckBoxes.value.indexOf(checkBox);
            if (index > -1) {

                selectedCheckBoxes.value.splice(index, 1);
                if (storageKey.length > 3) {
                    localStorage.setItem(storageKey, JSON.stringify(selectedCheckBoxes.value));
                }
            }

            let localBank =  JSON.parse(localStorage.getItem(storageKey))

            if (localBank === null || localBank.length <= 0 ) {
                removeCheckStorage()
            }
        } 
    }

    const removeCheckStorage = () => {
        localStorage.removeItem(storageKey)
    }

    return { selectedCheckBoxes, checkAll, checkOne, checkBoxElements, checkAllCheckBox, removeCheckStorage }
}
