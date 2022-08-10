import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    initializeapp() {
      const getInstaia = JSON.parse(localStorage.getItem('instaia'))
      if (getInstaia) {
        this.user = getInstaia.user
        this.token = getInstaia.token
        return true
      }
      return false
    },
    setUser(params) {
      this.user = params
    },
    setToken(params) {
      this.token = params
    }
  },
  getters: {
    getUser: (state) => state.name,
    getToken: (state) => state.token
  }
})
