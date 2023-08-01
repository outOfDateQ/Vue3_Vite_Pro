// 自定义插件, 用来安装多个全局组件, 插件的本质就是一个对象, 因此对外暴露一个插件对象

// 引入需要全局注册的插件
import SvgIcon from './SvgIcon/index.vue'

// 装各个全局组件的容器对象
const allGlobalComponent: any = {
  SvgIcon
}

export default {
  // 插件对象上有一个install()方法, 当再main.ts文件中app.use(plugin)的时候, 插件对象就会执行该方法
  install(app: any) { // 可以接收到app实例对象
    // app.component('SvgIcon', SvgIcon) // 不建议, 因为如果有多个组件的话, 仍然需要写很多次注册代码
    // 可以使用Object.keys()方法获取到一个对象身上的所有key, 并且返回的是一个数组, 遍历数组来注册多个全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })
  }
}