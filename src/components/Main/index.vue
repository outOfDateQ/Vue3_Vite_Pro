<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- v-if可以实现组件的销毁 -->
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutStore from '@/store/layout'
const layoutStore = useLayoutStore()

const flag = ref(true)

watch(() => layoutStore.refresh, () => {
  // 每次点击刷新的时候, 都会销毁当前路由组件, 然后等待DOM重新加载完成之后调用nextTIck来重新挂载路由组件
  flag.value = false

  nextTick(() => {
    flag.value = true
  })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: $base-transition;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
