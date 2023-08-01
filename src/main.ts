import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

const add = () => {
  console.log('测试是否配置成功')
}

add()
