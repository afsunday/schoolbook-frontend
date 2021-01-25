import { ref } from 'vue'

export default () => {

	const errState = ref({
		netError: false, 
		reqError: false,
		hasError: false
	})

	const setReloadStates = (err) => {
		let requestError = {
			reqError: true,
			netError: false,
			hasError: true
		}

		let netError = {
			reqError: false,
			netError: true,
			hasError: true
		}

		if(err.response.status === 500) {
            errState.value = requestError
		} 
		else if (err.response.status === 502) {
			errState.value = requestError
		}
		else if (err.response.status === 503) {
			errState.value = requestError
		}
		else if(err.request) {
			errState.value = netError
		}
	}

	return { errState, setReloadStates }
}