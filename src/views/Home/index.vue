<template>
  <div>
    <h2>主页</h2>
    <el-input v-model="msg" /> <el-button @click="copy">复制</el-button>
  </div>
</template>

<script setup lang="ts">
// import useUserStore from '@/store/user'
// const userStore = useUserStore()
import { ref } from 'vue'
import useCopy from '@/hooks/useCopy'

const { copyedText } = useCopy()
const msg = ref('')

const copy = () => {
  copyedText.value = msg.value
}
</script>

<style scoped lang="scss"></style>
