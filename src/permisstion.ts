// 该文件是专门用来设置路由鉴权的, 单独抽离了
import router from '@/router'
// @ts-ignore 引入进度条插件和其配套样式
import Np from 'nprogress'
import 'nprogress/nprogress.css'
// 引入用户小仓库用于获取token对路由的鉴权, 但是在组件外使用pinia小仓库, 会被认为没有安装pinia, 所以还需要单独引入pinia
import useUserStore from '@/store/user'
// import { createPinia } from 'pinia'
// 注意: 如果在组件外部使用pinia小仓库的话, 不能重新创建pinia大仓库, 需要使用已经在main.ts中已经注册好了的大仓库, 不然会导致仓库数据更新了, 但是组件中获取不到的情况
import pinia from '@/store'
import { ElNotification } from 'element-plus'
import setting from '@/setting'

// 因为不在main.ts中创建pinia, 所以不能使用app.use(pinia), 只能通过小仓库暴露的函数把pinia传递进去, 这样就能实现在组件外使用小仓库的需求了
const userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 路由跳转时, 让网页标题动态变化
  document.title = `${setting.title}-${to.meta.title}`
  // 关闭nprogress加载时的圆圈
  Np.configure({ showSpinner: false })
  Np.start()
  // 判断当前是否登录, 也就是判断当前是否有token
  if (userStore.token) {
    // 如果已经登录了, 那么就不能跳转到login, 会强制回到首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 其他页面放行, 但是也得判断当前是否有用户信息, 如果没有用户信息, 那么就发请求, 得到用户数据过后在放行, 解决不在首页刷新页面用户信息丢失问题
      if (userStore.username) { // 如果有用户信息, 直接跳转路由
        next()
      } else { // 如果没有用户信息, 先发送获取用户信息的请求, 拿到用户数据之后再跳转路由
        try {
          await userStore.getUser() // 调用async函数返回的是一个Promise对象
          // 如果请求成功, 且返回的是一个成功的Promise才会执行下面的代码
          next()
        } catch (e) {
          // 如果能执行这里面的代码, 那么说明token过期或者用户手动修改了token, 就拿不到用户数据, 需要发退出登录请求, 清除仓库和本地中关于用户的数据, 然后跳转到登陆页
          try {
            await userStore.toLogout()
            next({
              path: '/login',
              query: {
                redirect: to.path
              }
            })
          } catch (error) {
            ElNotification({
              type: 'error',
              message: (error as Error).message
            })
          }
        }
      }
    }
  } else {
    // 如果没有登录, 只允许访问login, 且跳转其他路由也会返回login
    if (to.path === '/login') {
      next()
    } else {
      // next()也可以当成router的路由跳转方式使用
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  Np.done()
})
