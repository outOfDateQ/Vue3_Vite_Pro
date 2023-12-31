<template>
  <div>
    <!-- 全局组件 -->
    <Category :scene="scene" />
    <el-card shadow="hover">
      <!-- scene === 0的话显示已有数据列表, scene === 1的话显示添加或修改数据card -->
      <div v-show="scene === 0">
        <!-- 如果选择了三级分类, 也就表示有了三级分类的ID, 那么就不禁用按钮, 如果没有选择到三级分类, 就表示没有三级分类的ID, 那么就暂时禁用按钮 -->
        <el-button
          :disabled="categoryStore.thirdId ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          color="#28796B"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border :data="attrArr">
          <el-table-column
            label="序号"
            align="center"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column label="属性名称" width="150px">
            <template #default="{ row }">
              <span>{{ row.attrName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                round
                type="success"
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="Edit"
                color="#28796B"
                size="small"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                icon="Delete"
                icon-color="#F56C6C"
                :title="`是否删除${row.attrName}?`"
                @confirm="deleteAttr(row)"
                width="180px"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    icon="Delete"
                    size="small"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrData.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          size="default"
          :disabled="!attrData.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="default" size="default" @click="cancel">
          取消
        </el-button>
        <el-table style="margin: 20px 0" border :data="attrData.attrValueList">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <!-- 有编辑模式和查看模式 -->
              <!-- ref可以绑定一个函数, 这个函数的执行时机就是当模板改变的时候就会重新执行, 且会把当前的组件实例对象作为参数传递进来 -->
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                size="small"
                placeholder="请输入属性值"
                v-model.trim="row.valueName"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="removeAttrValue($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          :disabled="!attrData.attrValueList.length"
          @click="save"
        >
          保存
        </el-button>
        <el-button type="default" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/category'
import { watch, ref, reactive, nextTick } from 'vue'
import { getAttrs, addOrUpdateAttr, removeAttr } from '@/api/product/attrs'
import { AttrData, AttrValueList } from '@/api/product/attrs/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
// const flag = ref<boolean>(true)
const attrArr = ref([])
// 切换不同card的标识
const scene = ref(0) // 0 | 1
// 收集添加或者修改属性的数据
const attrData = reactive<AttrData>({
  attrName: '', // 属性名称
  categoryId: '', // 三级分类的ID
  categoryLevel: 3, // 一定是三级分类
  attrValueList: [], // 属性的属性值数据
})
// 定义一个用来存储不同el-input实例的数组
const inputArr = ref<any>([])

// onMounted(() => {
//   scene.value = 0
// })

// 监视是否有三级分类的ID, 如果有那么就发送请求获取数据
watch(
  () => categoryStore.thirdId,
  () => {
    // 每一次三级分类的ID变换的时候, 就先把获取到的分类数据清空, 如果没有三级分类的ID, 则清空后不展示
    attrArr.value = []
    // 如果没有三级分类的ID, 那么就不发请求
    if (!categoryStore.thirdId) return
    getAttrsData()
  },
)

// 获取分类的属性和属性值的函数
const getAttrsData = async () => {
  let data = {
    firstId: categoryStore.firstId,
    secondId: categoryStore.secondId,
    thirdId: categoryStore.thirdId,
  }
  let res: any = await getAttrs(data)

  attrArr.value = res.data
}

// 添加属性
const addAttr = () => {
  // 每一次添加属性都必须保证之前的数据被清空
  // attrData.attrName = ''
  // attrData.attrValueList = []
  // attrData.categoryId = ''
  // 也可以使用Object.assign()来合并一个对象, 后者必须是一个新对象, 如果没有就添加新属性, 有的话就覆盖
  Object.assign(attrData, {
    attrName: '', // 属性名称
    categoryId: categoryStore.thirdId, // 三级分类的ID
    categoryLevel: 3, // 一定是三级分类
    attrValueList: [], // 属性的属性值数据
  })
  // 如果这个回调能执行, 那么三级分类肯定已经选择了, 所以能够获取到当前三级分类的ID
  // attrData.categoryId = categoryStore.thirdId
  scene.value = 1
}

// 修改属性
const updateAttr = (row: AttrData) => {
  scene.value = 1
  // 使用ES6的Object.assign方法来合并一个对象, 当点击编辑的时候, 显示对应的数据
  // Object.assign(attrData, row) // 有BUG, 当前方法是浅拷贝, 但是对象中又有数组, 数组中又是对象, 因此浅拷贝的话不能拷贝到属性值是引用类型的数据
  // 使用深拷贝, 把当前需要修改的属性独立的拷贝一份出来, 这样修改当前的对象, 就不会影响到被拷贝的对象
  Object.assign(attrData, JSON.parse(JSON.stringify(row)))
}

// 取消添加|修改属性
const cancel = () => {
  scene.value = 0
}

// 添加一个属性的属性值
const addAttrValue = () => {
  attrData.attrValueList.push({
    valueName: '',
    flag: true, // 用于标识当前的属性值是否是编辑模式
  })
  nextTick(() => {
    // inputArr.value[attrData.attrValueList.length - 1].focus()
    inputArr.value.at(-1).focus()
  })
}

// 保存新添加的属性
const save = async () => {
  // 如果有一个属性值为空的话, 那么就不发请求
  // if (attrData.attrValueList.some(item => item.valueName === '')) {
  //   ElMessage({
  //     type: 'error',
  //     message: '请检查是否填写了正确的属性值'
  //   })
  //   return
  // }

  // 发送请求
  let res: any = await addOrUpdateAttr(attrData)
  if (res.code === 200) {
    // 添加成功
    // 切换场景
    scene.value = 0
    // 提示成功消息
    ElMessage({
      type: 'success',
      message: attrData.id ? '修改成功' : '添加成功',
    })
    // 添加成功后, 重新获取数据
    getAttrsData()
  } else {
    // 提示失败消息
    ElMessage({
      type: 'error',
      message: attrData.id ? '修改失败' : '添加失败',
    })
  }
}

// 当前编辑属性值的input失去焦点时显示查看DIV
const toLook = (row: AttrValueList, index: number) => {
  // 判断当前输入是否为空, 如果为空的话, 那么就不展示显示DIV, 且删掉当前需要添加的属性
  if (!row.valueName.trim()) {
    attrData.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 如果不为空, 判断当前添加的属性值是否已经存在, 如果存在则不能添加
  let isExist = attrData.attrValueList.some((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (isExist) {
    attrData.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复添加',
    })
    return
  }
  // 传入的数据是当前的属性值数据
  row.flag = false
}

// 点击当前查看DIV时显示显示编辑input
const toEdit = (row: AttrValueList, index: number) => {
  row.flag = true
  // 点击该DIV页面会重新渲染, 获取渲染后的DOM节点
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 删除一个属性值
const removeAttrValue = (index: number) => {
  attrData.attrValueList.splice(index, 1)
  inputArr.value.splice(index, 1)
}

// 删除一个已有的属性
const deleteAttr = async (row: AttrValueList) => {
  let res = await removeAttr(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttrsData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin: 20px 0 0 0;
}
</style>
