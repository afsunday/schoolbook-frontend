import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'

import { defineRule } from 'vee-validate';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/utility/utils.css'
import '@/assets/scss/utility/nprogress.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/gaxon/styles.css'


defineRule('required', value => {
	if (!value || !value.length) {
		return 'This field is required';
	}
	return true
})

defineRule('email', value => {
    if (!value || !value.length) {
		return true;
	}

	if ( ! /\S+@\S+\.\S+/.test(value)) {
		return 'This field must be a valid email'
	}

	return true
})

defineRule('digits', (value, [limit]) => {
	if (!value || !value.length) {
		return true;
	}

	if (isNaN(value) || value.length < limit || value.length > limit ) {
		return `This field must be digits and ${limit} chars`
	}

	return true
})

createApp(App).use(store).use(router).mount('#app')