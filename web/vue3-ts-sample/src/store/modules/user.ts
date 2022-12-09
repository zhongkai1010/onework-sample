import { defineStore } from 'pinia'
import { store } from '@/store'

export type LoginState = 'noLogin' | 'login'

interface LoginUser {
  username: string
}

export interface UserStoreStateType {
  loginState: LoginState
  loginUser?: LoginUser
}

export const userStore = defineStore('counter', {
  state: (): UserStoreStateType => ({
    loginState: 'noLogin',
  }),
  getters: {
    currentUser: (state): LoginUser => state.loginUser ?? { username: '' },
  },
  actions: {
    signIn(user: LoginUser) {
      this.loginUser = user
      this.loginState = 'login'
    },
    signOut() {
      this.loginUser = undefined
      this.loginState = 'noLogin'
    },
  },
  persist: true,
})

export function userStoreHook() {
  return userStore(store)
}
