// 定义user请求接口中需要的ts类型

// 登录携带参数数据类型
export interface LoginForm {
  username: string
  password: string
}

// 所有返回数据的公共类型
interface PublicResponse {
  code: number
  message: string
  ok: boolean
}

// interface DataType {
//   token?: string
//   message?: string
// }
// 登录成功服务器返回数据的类型
export interface LoginResponseData extends PublicResponse {
  data: string
}

// 退出登录返回的数据类型
export interface LogoutResponseData extends PublicResponse {
  data: any
}

// interface User {
//   userId: number
//   avatar: string
//   username: string
//   password: string
//   desc: string
//   roles: string[]
//   buttons: string[]
//   routes: string[]
//   token: string
// }
// interface UserInfo {
//   checkUser: User
//   message?: string
// }
// 获取用户信息返回结果的数据类型
export interface UserResponseData extends PublicResponse {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
