<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <el-icon class="icon" @click="handleFold">
        <!-- component能动态的决定展示哪个组件 -->
        <component :is="layoutStore.fold ? 'Expand' : 'Fold'" />
      </el-icon>
      <!-- Vue3中v-if的优先级比v-for的要高, 所以如果需要条件渲染的话, v-for只能和v-show组合使用 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          :to="item.path"
          v-for="(item, index) in route.matched"
          :key="index"
          v-show="item.meta.title"
        >
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span style="margin-left: 4px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button
        type="primary"
        icon="Refresh"
        size="default"
        color="#28796B"
        circle
        @click="refresh"
      ></el-button>
      <el-button
        type="primary"
        icon="FullScreen"
        size="default"
        color="#28796B"
        circle
        @click="handleFullScreen"
      ></el-button>
      <el-button
        type="primary"
        icon="Setting"
        size="default"
        color="#28796B"
        circle
      ></el-button>
      <img :src="userStore.avatar" class="avatar" />
      <el-dropdown class="el-dropdown-link">
        <span>{{ userStore.username }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/layout'
import useUserStore from '@/store/user'
import { useRoute, useRouter } from 'vue-router'

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 路由对象的matched属性能够获取到当前路由的路径, 不管嵌套多少都可以获取到, 且是一个数组
// console.log(route.matched)

// 折叠菜单
const handleFold = () => {
  layoutStore.fold = !layoutStore.fold
}

// 刷新
const refresh = () => {
  layoutStore.refresh = !layoutStore.refresh
}

// 切换全屏显示
const handleFullScreen = () => {
  // JS原生API中就有可以判断当前页面是否全屏的方法, 如果是全屏返回true, 如果不是返回false
  let isFull = document.fullscreenElement

  // 如果不是全屏
  if (!isFull) {
    // 调用JS根节点的requestFullscreen方法切换至全屏
    document.documentElement.requestFullscreen()
  } else {
    // 如果是全屏
    // 就调用document身上退出全屏的方法
    document.exitFullscreen()
  }
}

// 退出登录
const logout = () => {
  userStore.toLogout()
  router.replace({
    path: '/login',
    query: {
      redirect: route.path,
    },
  })
}
</script>

<style scoped lang="scss">
.tabbar-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #aaa;
  background: linear-gradient(to right, #154940, #001529);
  // background: linear-gradient(to right, #001529, #156457);

  .tabbar-left {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    :deep .el-breadcrumb {
      // span,
      // i {
      //   color: #000;
      // }

      .el-breadcrumb__inner {
        display: flex;
        align-items: center;
      }
    }
  }

  .tabbar-right {
    display: flex;
    align-items: center;

    .avatar {
      width: 34px;
      height: 34px;
      margin: 0 10px 0 15px;
      border-radius: 50%;
    }

    .el-dropdown-link {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
