// 定义user请求接口中需要的ts类型

// 登录携带参数数据类型
export interface LoginForm {
  username: string
  password: string
}

interface DataType {
  token?: string
  message?: string
}
// 登录成功服务器返回数据的类型
export interface LoginResponseData {
  code: number
  data: DataType
}

interface User {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface UserInfo {
  checkUser: User
}
// 获取用户信息返回结果的数据类型
export interface UserResponseData {
  code: number
  data: UserInfo
}
