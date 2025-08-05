import { defineStore } from 'pinia'
import type { UserInfo } from '@/composables/useUserInfo'

export const useUserInfoStore = defineStore('userInfo', {
  state: (): UserInfo => ({
    id: 0,
    email: '',
    zh_name: '',
    en_name: '',
    mobile: '',
    role_name: '',
    token: '',
  }),

  getters: {
    isLogin: state => state.token !== '',
  },

  actions: {
    /**
     * 获取用户信息
     * @returns 用户信息
     */
    getUserInfo(): UserInfo {
      return this.$state
    },

    /**
     * 设置用户信息
     * @param userInfo 用户信息
     */
    setUserInfo(userInfo: UserInfo) {
      this.$state = userInfo
    },

    /**
     * 清除用户信息
     */
    clearUserInfo() {
      this.$state = {
        id: 0,
        email: '',
        zh_name: '',
        en_name: '',
        mobile: '',
        role_name: '',
        token: '',
      }
    },
    /**
     * 获取token
     */
    getToken(): string {
      return this.$state.token
    },
    /**
     * 初始化用户信息
     */
    initUserInfo() {
      this.clearUserInfo()
      if (import.meta.env.VITE_ENV === 'development') {
        this.setUserInfo({
          id: 2,
          email: '2670132411@qq.com',
          zh_name: '超级管理员',
          en_name: '',
          mobile: '18888888888',
          role_name: '教练',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX3R5cGUiOiJhZG1pbiIsInJvbGVfaWQiOjQxLCJleHAiOjE4MTQ4MDAzODYsImlhdCI6MTc1NDMyMDM4Nn0.6SfKG-j38HHL-IK2fLBS7rFknuX0GMjFwr6HysZof60',
        })
      }
    },
  },
})
