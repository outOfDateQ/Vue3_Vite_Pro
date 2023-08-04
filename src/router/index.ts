// 引入路由
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入配置的路由
import { constantRoutes } from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为, 是一个函数, 返回一个对象
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
