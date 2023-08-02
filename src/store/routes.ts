import { defineStore } from 'pinia'
import { RoutesState } from './type'
// 引入常量路由, 把路由数据放在仓库中, 方便各个组件都能使用
import { constantRoutes } from '@/router/routes'

const useRoutesStore = defineStore('routes', {
  state: (): RoutesState => ({
    constantRoutes,
  }),

  actions: {},

  getters: {},
})

export default useRoutesStore
