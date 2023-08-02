<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <el-icon class="icon">
        <Fold />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button type="primary" icon="Refresh" size="default" color="#28796B" circle></el-button>
      <el-button type="primary" icon="FullScreen" size="default" color="#28796B" circle></el-button>
      <el-button type="primary" icon="Setting" size="default" color="#28796B" circle></el-button>
      <img src="/public/logo.png" class="img" />
      <el-dropdown class="el-dropdown-link">
        <span>admin</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">

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

      span,
      i {
        color: #000;
      }
    }
  }

  .tabbar-right {
    display: flex;
    align-items: center;

    .img {
      width: 34px;
      height: 34px;
      margin: 0 10px 0 15px;
    }

    .el-dropdown-link {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>