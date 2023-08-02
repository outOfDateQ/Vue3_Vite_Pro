// 把配置的路由单独抽离成一个文件, 方便管理

// 静态(常量)路由
export const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  // },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      // 在菜单中路由是否隐藏
      hidden: true,
      icon: 'Platform'
    }
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    name: 'layout',
    meta: {
      title: '布局',
      hidden: false,
      icon: 'Management'
    },
    // 在父路由上面也可以重定向到子路由
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import('@/views/Screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform'
    }
  },
  {
    path: '/acl',
    component: () => import('@/views/Layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'HelpFilled'
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/User/index.vue'),
        // name: 'Acl',
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/Role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Promotion'
        }
      },
      {
        path: '/acl/menu',
        component: () => import('@/views/Menu/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'BellFilled'
        }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/views/Layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'GoodsFilled'
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/TradeMark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Opportunity'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/Attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Management'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/Spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Histogram'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/Sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'TrendCharts'
        }
      }
    ]
  },


  {
    // path: '/:pathMatch(.*)',
    path: '/:pathMatch(.*)*', // 如果没有匹配的路由跳转到404页面
    component: () => import('@/views/NotFound/index.vue'),
    name: 'notFound',
    meta: {
      title: '未找到资源',
      hidden: true,
      icon: 'Failed'
    }
  },
]
