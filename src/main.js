import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import $ from 'jquery'
import { defineRule } from 'vee-validate';

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/styles.css'
import '@/assets/scss/utils.css'
import '@/assets/scss/nprogress.css'
import '@/assets/gaxon-icon/styles.css'

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
		return `This field must digits and ${limit} chars`
	}

	return true
})

createApp(App).use(store).use(router).mount('#app')