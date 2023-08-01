// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 请求地址前缀
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 请求超时时间
  timeout: 3000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 返回config, 如果不返回, 请求发不出去, config身上有headers, 可以用来公共的请求头信息
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 可以得到请求成功的数据, 一般处理数据再返回
  return response.data
}, (e) => {
  // 可以得到请求失败的信息, 可以用来处理http请求错误的状态码
  let msg: string = ''
  let status = e.response.status

  switch (status) {
    case 400:
      msg = '请求参数错误'
      break
    case 401:
      msg = '请求未授权或TOKEN已过期'
      break
    case 403:
      msg = '当前没有权限访问资源'
      break
    case 404:
      msg = '请求地址错误或未找到资源'
      break
    case 405:
      msg = '请求方式错误'
      break
    case 500:
      msg = '服务器内部错误'
      break
    default:
      msg = '网络出现问题'
      break
  }

  ElMessage({
    type: 'error',
    message: msg,
    showClose: true
  })

  // 因为axios的返回结果是一个Promise对象, 所以如果失败的话需要终止Promise链
  return Promise.reject(e)
})

export default request

