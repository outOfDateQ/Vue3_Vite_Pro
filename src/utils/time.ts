// 封装一个函数, 用于判断当前的时间段, 返回结果: 早上 | 中午 | 下午 | 晚上
export const getCurrentTime = () => {
  let msg: string = ''

  // 每次调用该函数都会返回一个新的时间对象, 但是只获取hour
  const hour = new Date().getHours()

  // 判断当前调用函数的时间段是多久
  if (hour <= 8) {
    msg = '早上'
  } else if (hour <= 12) {
    msg = '中午'
  } else if (hour <= 18) {
    msg = '下午'
  } else {
    msg = '晚上'
  }

  // 把结果返回出去
  return msg
}
