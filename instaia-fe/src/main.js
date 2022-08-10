import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import axios from './plugins/axios'
import toast from './plugins/toastification'

const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.use(axios)
.use(toast)
.mount('#app')
