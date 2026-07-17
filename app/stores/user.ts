import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Гость',
    isAuthenticated: false,
  }),
  actions: {
    login(name: string) {
      this.name = name
      this.isAuthenticated = true
    },
    logout() {
      this.name = 'Гость'
      this.isAuthenticated = false
    },
  },
  getters: {
    greeting: (state) => `Привет, ${state.name}!`,
  },
})
