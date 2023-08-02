import { defineStore } from 'pinia'
import type { LoginForm, LoginResponseData } from '@/api/user/type'
import { userLogin } from '@/api/user'
import { UserState } from './type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // 当页面一刷新, 从本地存储中获取用户token
    token: GET_TOKEN() // 用户唯一标识
  }),

  actions: {
    // 重点: async函数调用会返回一个Promise对象, Promise对象的状态由函数执行结果决定
    async toLogin(data: LoginForm) {
      let res: LoginResponseData = await userLogin(data)
      // 成功code: 200, 失败code: 201
      if (res.code === 200) {
        // 仓库存储不是持久化的, 本质是存在JS对象中
        this.token = res.data.token as string

        // 把用户token在本地也存一份
        SET_TOKEN(res.data.token as string)

        // 成功就返回成功的Pormise, 字符串和undefined都可以返回一个成功的Promise
        return 'ok'
      } else {
        // 失败就返回失败的Promise
        return Promise.reject(new Error(res.data.message))
      }
    }
  },

  getters: {

  }
})

export default useUserStore