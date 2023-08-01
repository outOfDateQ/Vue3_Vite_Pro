<template>
  <div class="login-container">
    <!-- 使用el-row和el-col来布局 -->
    <el-row>
      <!-- 一行默认24份, 两边各一半, el-col有一个xs属性, 表示浏览器视口小于768px的时候动态的分配份数 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <div class="form-container">
          <h1 class="title">后台管理系统</h1>
          <el-form>
            <!-- 账号 -->
            <el-form-item>
              <el-input
                :prefix-icon="User"
                v-model="formData.username"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item>
              <el-input
                :prefix-icon="Lock"
                type="password"
                v-model="formData.password"
                show-password
              ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button class="login-btn" type="primary" size="default">
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
import { reactive } from 'vue'

// 收集表单数据
const formData = reactive({
  username: 'admin',
  password: '111111',
})
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
