import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore 可以忽略JSON文件没有类型限制的报错问题
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入全局组件自定义组件SvgIcon
// import SvgIcon from '@/components/SvgIcon/index.vue'

// 引入重置全局样式的scss文件
import '@/styles/index.scss'

// 引入自定义插件
import globalComponent from '@/components'

// 引入路由鉴权文件
import '@/permisstion'

const app = createApp(App)
// const pinia = createPinia()

// 如果配置了环境文件的话, 那么就可以通过import.meta.env来获取到当前环境的数据
// console.log(import.meta.env)

// 注册全局组件, 如果只有一个的话可以这样注册, 但是如果有多个全局组件的话, 那么建议使用插件安装注册
// app.component('SvgIcon', SvgIcon)

app
  .use(pinia)
  .use(router)
  .use(globalComponent) // 注册自定义插件
  .use(ElementPlus, {
    locale: zhCn,
  }) // 全局安装element-plus, 并且使用国际化(中文)
  .mount('#app')
