import axios from 'axios'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

const pinia = createPinia()
const store = useUserStore(pinia)

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(
    function (config) {
        const token = store.token
        config.headers.common['Authorization'] = token ? `Bearer ${token}` : ''
        config.headers.post['Content-Type'] = 'application/json'
        return config
    },
    function (error) {
        throw Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        response = typeof response.data !== undefined ? response.data : response
        return response
    },
    function (error) {
        throw error.response.data
    }
)

export default {
    install: (app, options) => app.config.globalProperties.$axios = axios
}