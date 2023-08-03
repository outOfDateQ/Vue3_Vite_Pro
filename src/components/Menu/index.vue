<template>
  <template v-for="route in constantRoutes" :key="route.path">
    <!-- 没有子路由, 只展示一级路由 -->
    <template v-if="!route.children">
      <el-menu-item
        :index="route.path"
        v-if="!route.meta.hidden"
        @click="handleRoute"
      >
        <!-- 在el-menu-item中如果把el-icon放在插槽中的话, 如果el-menu使用collapse, 那么图标会隐藏 -->
        <!-- 使用el-icon可以来设置其内部图片组件的样式和大小, 默认是继承文字颜色和大小 -->
        <el-icon>
          <!-- component组件是Vue提供的内置组件, is属性接收的是一个字符串, 最终会显示和其字符串相同名字的组件 -->
          <component :is="route.meta.icon"></component>
        </el-icon>
        <!-- 如果想el-menu使用collapse时隐藏文字, 那么就需要把文字放在插槽中 -->
        <template #title>
          <span>{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有且只有一个子路由, 那么把子路由当作一级路由展示 -->
    <template v-else-if="route.children && route.children.length === 1">
      <el-menu-item
        :index="`${route.path}${route.children[0].path}`"
        v-if="!route.children[0].meta.hidden"
        @click="handleRoute"
      >
        <!-- <el-menu-item :index="route.children[0].path" v-if="!route.children[0].meta.hidden" @click="handleRoute"> -->
        <el-icon>
          <component :is="route.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ route.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且大于一个 -->
    <el-sub-menu :index="route.meta.title" v-else>
      <template #title>
        <!-- 在el-sub-menu中把el-icon放在插槽中, 在el-menu组件上使用collapse属性时, el-icon不会隐藏 -->
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <!-- 使用递归组件 -->
      <Menu :constantRoutes="route.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps(['constantRoutes'])

const handleRoute = (vc: any) => {
  router.push(vc.index)
}
</script>

<!-- 使用递归组件必须要有名字, 但是Vue3中不支持name属性, 因此只能使用Vue2语法 -->
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss"></style>
