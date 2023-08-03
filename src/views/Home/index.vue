<template>
  <div>
    <h2>主页</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useUserStore from '@/store/user'
import { ElNotification } from 'element-plus'
// import { GET_TOKEN } from '@/utils/token'
// import { useRouter } from 'vue-router'

const userStore = useUserStore()
// const router = useRouter()

const username = ref('')
const avatar = ref('')

onMounted(async () => {
  // 发送获取用户信息的请求
  try {
    await userStore.getUser()
    // 只有返回是成功的Promise才会执行下面的代码
    username.value = userStore.username
    avatar.value = userStore.avatar
  } catch (e) {
    // router.replace('/login')
    // 显示失败提示信息
    ElNotification({
      type: 'error',
      // error就是调用async函数返回的失败的结果, 一般都是返回一个错误对象new Error(), 传递的参数就是error实例对象的message属性
      message: (e as Error).message, // 断言error就是Error类型
    })
  }
})
</script>

<style scoped lang="scss"></style>
