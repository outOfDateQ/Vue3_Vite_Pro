// 把配置的路由单独抽离成一个文件, 方便管理

// 静态(常量)路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'login'
  },
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    name: 'home'
  },
  {
    // path: '/:pathMatch(.*)',
    path: '/:pathMatch(.*)*', // 如果没有匹配的路由跳转到404页面
    component: () => import('@/views/NotFound/index.vue'),
    name: '404'
  }
]
