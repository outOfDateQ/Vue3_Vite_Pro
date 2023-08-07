<template>
  <el-card class="top-card" shadow="hover">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene === 1"
          v-model="categoryStore.firstId"
          placeholder="请选择"
          size="default"
          @change="handleFirstCateory"
        >
          <el-option
            v-for="item in categoryStore.firstCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene === 1"
          v-model="categoryStore.secondId"
          placeholder="请选择"
          size="default"
          @change="handleSecondCateory"
        >
          <el-option
            v-for="item in categoryStore.secondCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene === 1"
          v-model="categoryStore.thirdId"
          placeholder="请选择"
          size="default"
        >
          <el-option
            v-for="item in categoryStore.thirdCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/category'

defineProps({
  scene: {
    type: Number,
  },
})

const categoryStore = useCategoryStore()

// 当组件挂载就通知仓库获取一级分类的数据
onMounted(() => {
  categoryStore.firstId = ''
  categoryStore.secondId = ''
  categoryStore.thirdId = ''
  categoryStore.firstCategory = []
  categoryStore.secondCategory = []
  categoryStore.thirdCategory = []
  getFirstData()
})

// 当组件销毁之前清空已经选择了的数据
onBeforeUnmount(() => {
  // 逻辑放在了onMounted中
})

// 通知仓库获取一级分类的数据
const getFirstData = () => {
  categoryStore.getFirstCategoryData()
}

// 当一级分类的值发生变化的时候触发, 可以接收到当前的值
const handleFirstCateory = () => {
  // 每次当一级分类的值发生改变时, 就把当前的二级分类ID清空, 且把三级分类的ID和数据清空
  categoryStore.secondId = ''
  categoryStore.thirdId = ''
  categoryStore.thirdCategory = []
  categoryStore.getSecondCategoryData()
}

// 当二级分类的值发生变化的时候触发, 可以接收到当前的值
const handleSecondCateory = () => {
  // 当二级分类的值发生改变的时候, 就把三级分类的ID清空
  categoryStore.thirdId = ''
  categoryStore.getThirdCategoryData()
}
</script>

<style scoped lang="scss">
.top-card {
  margin-bottom: 10px;
}
</style>
