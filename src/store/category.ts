import { defineStore } from 'pinia'
import { getFirstCategory, getSecondCategory, getThirdCategory, getAttrs } from '@/api/product/attrs'
import { CategoryResponse, State } from '@/api/product/attrs/type'

const useCategoryStore = defineStore('category', {
  state: (): State => ({
    // 一级分类的数据
    firstCategory: [],
    // 二级分类的数据
    secondCategory: [],
    // 三级分类的数据
    thirdCategory: [],
    firstId: '', // 一级分类的ID(当前选中的数据)
    secondId: '', // 二级分类的ID(当前选中的数据)
    thirdId: '' // 三级分类的ID(当前选中的数据)
  }),

  actions: {
    // 获取一级分类的数据
    async getFirstCategoryData() {
      let res: CategoryResponse = await getFirstCategory()
      if (res.code === 200) {
        this.firstCategory = res.data
      }
    },

    // 获取二级分类的数据
    async getSecondCategoryData() {
      let res: CategoryResponse = await getSecondCategory(this.firstId)
      if (res.code === 200) {
        this.secondCategory = res.data
      }
    },

    // 获取三级分类的数据
    async getThirdCategoryData() {
      let res: CategoryResponse = await getThirdCategory(this.secondId)
      if (res.code === 200) {
        this.thirdCategory = res.data
      }
    }
  },

  getters: {

  }
})

export default useCategoryStore