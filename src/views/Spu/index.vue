<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card shadow="hover">
      <!-- 添加SPU按钮 -->
      <el-button type="primary" size="default" icon="Plus" color="#28796B">
        添加SPU
      </el-button>
      <!-- 数据显示表格 -->
      <el-table border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="23"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scene = ref<number>(0)
const currentPage = ref<number>(1) // 当前页码
const pageSize = ref<number>(3) // 每页展示数量
</script>

<style scoped lang="scss">
.el-table {
  margin: 20px 0;
}
</style>
