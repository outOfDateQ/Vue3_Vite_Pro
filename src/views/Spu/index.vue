<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card shadow="hover">
      <!-- 添加SPU按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        color="#28796B"
        :disabled="!categoryStore.thirdId"
      >
        添加SPU
      </el-button>
      <!-- 数据显示表格 -->
      <el-table border :data="currentSpuData">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称">
          <template #default="{ row }">
            <span>{{ row.spuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SPU描述" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            type="primary"
            size="small"
            icon="Plus"
            color="#28796B"
            title="添加SKU"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            title="修改SPU"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            title="查看SKU"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            title="删除SPU"
          ></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="totalCount"
        @current-change="getHasSpuData"
        @size-change="handleChangeSize"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, watch, onMounted } from 'vue'
import useCategoryStore from '@/store/category'
import { getSpu } from '@/api/product/spu'
import type { HasSpuRequestData, Records } from '@/api/product/spu/type'

const categoryStore = useCategoryStore()

const scene = ref<number>(0)
const currentPage = ref<number>(1) // 当前页码
const pageSize = ref<number>(3) // 每页展示数量
const totalCount = ref<number>(0) // 全部SPU的数量
const currentSpuData = ref<Records>([]) // 当前获取到的SPU数据

// 页面一挂在就获取全部spu的数据
// onMounted(async () => {
//   let res: HasSpuRequestData = await getSpu(currentPage.value, pageSize.value, categoryStore.thirdId)
//   totalCount.value = res.data.total
// })

// 监听仓库中三级分类ID的变化, 一旦有了变化, 那么就发请求获取当前对应ID的SPU数据
watch(
  () => categoryStore.thirdId,
  () => {
    // 判断是否有三级分类ID, 如果有, 那么才发请求获取数据
    if (!categoryStore.thirdId) return
    getHasSpuData()
  },
)

// 封装获取SPU数据的方法
const getHasSpuData = async () => {
  let res: HasSpuRequestData = await getSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.thirdId,
  )
  // 如果请求成功, 就表示获取到了数据, 那么就把数据赋值准备好的数组中
  if (res.code === 200) {
    currentSpuData.value = res.data.records
    totalCount.value = res.data.total
  }
}

// 当每页展示几条数据发生变化的时候执行
const handleChangeSize = () => {
  // 如果修改了每一页展示几条数据, 那么就回到第一页
  currentPage.value = 1
  getHasSpuData()
}
</script>

<style scoped lang="scss">
.el-table {
  margin: 20px 0;
}
</style>
