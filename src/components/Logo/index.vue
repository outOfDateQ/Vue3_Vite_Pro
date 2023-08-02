<template>
  <div class="logo">
    <img :src="setting.logo">
    <h2 class="title">{{ setting.title }}</h2>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import setting from '@/setting'

</script>

<style scoped lang="scss">
.logo {
  height: $base-logo-cpmpo-hieght;
  display: flex;
  align-items: center;
  padding-left: 20px;

  img {
    width: $base-logo-width;
    height: $base-logo-height;
  }

  .title {
    color: #fff;
    font-weight: bold;
    font-size: $base-logo-title;
    padding-left: 10px;
  }
}
</style>