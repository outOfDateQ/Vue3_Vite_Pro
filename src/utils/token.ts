// 存储TOKEN的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 获取TOKEN的方法
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 删除TOKEN的方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
