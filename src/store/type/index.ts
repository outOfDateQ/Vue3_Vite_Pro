// 定义小仓库的TS数据类型
import { RouteRecordRaw } from 'vue-router' // RouteRecordRaw是vue-router已经定义好了的路由数据类型

// 用户token的数据类型
export interface UserState {
  token: string | null
  username: string
  avatar: string
}

// 路由的数据类型
export interface RoutesState {
  constantRoutes: RouteRecordRaw[]
}

// layout是否折叠的数据类型
export interface LayoutState {
  fold: boolean
  refresh: boolean
}
