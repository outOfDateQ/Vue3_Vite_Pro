<template>
  <div class="layout-container">
    <!-- 侧边菜单 -->
    <div class="layout-slider" :class="{ fold: layoutStore.fold }">
      <!-- LOGO -->
      <Logo v-if="setting.isShow" />
      <!-- 侧边栏菜单 -->
      <el-scrollbar class="nav-menu">
        <!-- 使用menu组件搭建静态菜单 -->
        <el-menu :collapse="layoutStore.fold" unique-opened :default-active="route.path" background-color="#001529"
          text-color="#fff" active-text-color="#28796B">
          <Menu :constantRoutes="routesStore.constantRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 头部tabbar -->
    <div class="layout-tabbar" :class="{ fold: layoutStore.fold }">
      <Tabbar />
    </div>
    <!-- 内容区 -->
    <div class="layout-main" :class="{ fold: layoutStore.fold }">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from '@/components/Logo/index.vue'
import Menu from '@/components/Menu/index.vue'
import Main from '@/components/Main/index.vue'
import Tabbar from '@/components/Tabbar/index.vue'
import setting from '@/setting'
import useRoutesStore from '@/store/routes'
import useLayoutStore from '@/store/layout'


const layoutStore = useLayoutStore()
const routesStore = useRoutesStore()
const route = useRoute()
</script>

<style scoped lang="scss">
.layout-container {
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: $base-transition;

    .nav-menu {
      height: calc(100vh - $base-logo-cpmpo-hieght);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: $base-transition;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout-main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: $base-transition;


    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
