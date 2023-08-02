<template>
  <div class="login-container">
    <!-- 使用el-row和el-col来布局 -->
    <el-row>
      <!-- 一行默认24份, 两边各一半, el-col有一个xs属性, 表示浏览器视口小于768px的时候动态的分配份数 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <div class="form-container">
          <h1 class="title">后台管理系统</h1>
          <!-- model表示表单收集管理的数据, rules表示表单的规则 -->
          <el-form :model="formData" :rules="rules" ref="loginForm">
            <!-- 账号, prop匹配的是对应的校验规则 -->
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="formData.username"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                :prefix-icon="Lock"
                type="password"
                v-model="formData.password"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button
                :loading="isLoading"
                class="login-btn"
                type="primary"
                size="default"
                @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getCurrentTime } from '@/utils/time'

const userStore = useUserStore()
const router = useRouter()

// 切换加载效果
const isLoading = ref(false)

// 获取表单的组件实例对象
const loginForm = ref()

// 收集表单数据
const formData = reactive({
  username: 'admin',
  password: '111111',
})

// 自定义表单校验规则, 三个参数:rule, value, callback
const validatoUserName = (rule: any, value: any, callback: any) => {
  console.log(rule)
  // rule: 表示表单校验的对象
  // value: 表示当前校验对象的内容
  // callback: 不管是否校验成功, 都是通过该回调来放行表单代码的执行, 只不过成功不传递参数, 失败参数可以传递相关信息
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号长度必须在5-10位之间'))
  }
}

const validatoPassword = (rule: any, value: any, callback: any) => {
  console.log(rule)
  if (value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    // callback(new Error('密码长度必须在6-10位之间'))
    callback(new Error('密码长度必须在6-10位之间'))
  }
}

// 表单校验规则
const rules = reactive({
  /* 
    表单校验的字段:
      required: 表示该规则必须校验
      min: 表示最少为多少位
      max: 表示最大为多少位
      message: 表示校验的信息
      trigger: 表示校验的方式(change | blur)
  */
  username: [
    // 每一个规则都是一个对象
    // { required: true, min: 5, max: 10, message: '账号只能在5-10位之间', trigger: 'change' }

    // 自定义校验规则, 触发方式还是trigger, 只是校验的规则不是用的配置方式, 而是validator属性, 该属性值是一个函数
    { trigger: 'change', validator: validatoUserName },
  ],
  password: [
    // { required: true, min: 6, max: 10, message: '密码只能在6-10位之间', trigger: 'change' }
    { trigger: 'change', validator: validatoPassword },
  ],
})

// 登录
const login = async () => {
  // el-form表单实例对象身上有一个validate方法, 用于校验表单是否全部通过, 可以传递一个回调, 且返回一个Promise对象
  // 因为返回的是一个Promise对象, 所以必定会有成功或失败两种状态, 且await函数只有成功的情况下, 才会执行其后面的代码
  await loginForm.value.validate()

  // 当点击登录的时候, 显示加载效果
  isLoading.value = true
  /* 
    1. 通知仓库发请求
    2. 如果成功跳转页面
    3. 如果失败显示相应提示
  */

  try {
    // 登录成功
    await userStore.toLogin(formData)

    // 请求结束, 成功的时候关闭加载效果
    isLoading.value = false

    // 跳转到首页
    router.push('/')

    // 显示登录成功提示信息
    ElNotification({
      type: 'success',
      title: `Hi, ${getCurrentTime()}好`,
      message: '欢迎回来',
    })
  } catch (error) {
    // 请求结束, 失败的时候关闭加载效果
    isLoading.value = false

    // 显示登录失败提示信息
    ElNotification({
      type: 'error',
      // error就是调用async函数返回的失败的结果, 一般都是返回一个错误对象new Error(), 传递的参数就是error实例对象的message属性
      message: (error as Error).message, // 断言error就是Error类型
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .form-container {
    position: relative;
    width: 60%;
    top: 30vh;
    left: 10vw;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    .title {
      text-align: center;
      color: #fff;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
