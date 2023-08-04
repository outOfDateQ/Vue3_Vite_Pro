<template>
  <el-card shadow="hover">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" color="#28796B">添加品牌</el-button>
    <!-- table表格用于展示已有的品牌数据 -->
    <el-table border>
      <el-table-column label="序号" width="80px" align="center"></el-table-column>
      <el-table-column label="品牌名称"></el-table-column>
      <el-table-column label="品牌LOGO"></el-table-column>
      <el-table-column label="品牌操作"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
      :background="true" layout=" prev, pager, next, jumper,->, total, sizes" :total="400" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNum = ref<number>(1) // 当前的页数
const pageSize = ref<number>(3) // 每页的个数
</script>

<style scoped lang="scss">
.el-table {
  margin: 20px 0;
}
</style>
