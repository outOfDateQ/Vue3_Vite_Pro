// 该文件是专门用来设置路由鉴权的, 单独抽离了
import router from '@/router'
// @ts-ignore 引入进度条插件和其配套样式
import Np from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach((to, from, next) => {
  Np.start()
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  Np.done()
})