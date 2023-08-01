// 专门封装用于请求用户数据的接口
import request from '@/utils/request'
// 引入类型限制, import type是仅仅把引入的数据当成类型
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

// 定义一个枚举, 用于设置请求地址
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = 'user/info'
}

// 登录请求
export function login(data: LoginForm) {
  // axios函数返回的Promise支持泛型
  return request<any, LoginResponseData>({
    url: API.LOGIN_URL,
    method: 'POST',
    data
  })
}

// 获取用户数据请求
export function getUserInfo() {
  return request<any, UserResponseData>({
    url: API.USERINFO_URL,
    method: 'GET'
  })
}