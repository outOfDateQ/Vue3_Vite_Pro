<template>
  <div>
    <el-card shadow="hover">
      <!-- 添加品牌按钮 -->
      <el-button @click="add" type="primary" size="default" icon="Plus" color="#28796B">
        添加品牌
      </el-button>
      <!-- table表格用于展示已有的品牌数据, data表示表格中的数据(必须是一个数组) -->
      <el-table border :data="currentTradeMark.data">
        <!-- el-table-column的label表示每一列列表的标题, prop|property表示列表每一个的数据(也可以使用插槽), type表示每一列的类型(index|selection|expand) -->
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!-- 使用prop, 是一个字符串, 就表示在table中传入的数组中每一项的一个属性, 最终是以DIV的形式展示出来的, 不灵活, 比如遇到图片就无法展示, 因此推荐使用插槽 -->
        <!-- <el-table-column label="品牌名称" prop="tmName"></el-table-column> -->
        <!-- 使用插槽 -->
        <el-table-column label="品牌名称">
          <!-- 作用域插槽接收三个参数, 第一个是row就是当前项的数据, $index就是当前项的索引, column表示当前列column组件的具体信息 -->
          <template #default="{ row }">
            <span>{{ row.tmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <!-- <el-image @click="previewImg(row.logoUrl.includes('http://') ? row.logoUrl : `http://${row.logoUrl}`)"
            style="width: 100px; height: 100px"
            :src="row.logoUrl.includes('http://') ? row.logoUrl : `http://${row.logoUrl}`" :zoom-rate="1.2"
            :preview-src-list="srcList" :z-index="99" :initial-index="0" fit="contain" /> -->
            <img :src="row.logoUrl.includes('http://')
              ? row.logoUrl
              : `http://${row.logoUrl}`
              " class="logo-img" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button icon="Edit" size="small" type="primary" color="#28796B" @click="update(row)"></el-button>
            <el-popconfirm :title="`是否删除${row.tmName}?`" width="200px" icon="Delete" icon-color="#F56C6C"
              @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button icon="Delete" size="small" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @current-change="handlePageData" @size-change="handlePageSize" :pager-count="5"
        v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->, total, sizes" :total="total" />
    </el-card>

    <!-- 新增|修改的时候需要使用的对话框结构 -->
    <el-dialog v-model="dialogFormVisible" :title="title">
      <!-- 注意区分: el-table的数据是 :data, 表单的校验数据是:model, 规则是:rules -->
      <el-form class="form" ref="uploadForm" :model="tradeMarkData" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="tradeMarkData.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片重点!!! action表示向服务器上传一张图片, 默认是POST请求, 且需要带上代理服务器的前缀, 例如/api, 不然不走代理 -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tradeMarkData.logoUrl" :src="tradeMarkData.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="TradeMark">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  getTrademarkData,
  addOrUpdateTrademark,
  deleteTrademark,
} from '@/api/product/trademark'
import type {
  TradeMarkParams,
  TradeMarkResponse,
  AddOrUpdateTradeMark,
  Records,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
// @ts-ignore
import Np from 'nprogress'
import 'nprogress/nprogress.css'

const pageNum = ref<number>(1) // 当前的页数
const pageSize = ref<number>(5) // 每页的个数
const total = ref<number>() // 品牌管理的总数
const currentTradeMark = reactive<any>({ data: [] }) // 请求成功返回的品牌数据
const dialogFormVisible = ref(false) // dialog是否开启
const title = ref('') // dialog的标题
// const srcList = reactive<string[]>([]) // 预览图片的数据
// 收集需要新增品牌的数据
const tradeMarkData = reactive<AddOrUpdateTradeMark>({
  logoUrl: '',
  tmName: '',
})
// 约束文件上传的类型
const imgType = reactive(['png', 'jpg', 'jpeg', 'gif'])
// 约束文件上传的大小: 4MB
const imgSize = ref(1024 * 1024 * 4)
// 表单的组件实例
const uploadForm = ref()

// 组件加载获取首页数据
onMounted(async () => {
  try {
    await getTrademark({ pageNum: pageNum.value, pageSize: pageSize.value })
  } catch (e) {
    console.log((e as Error).message)
  }
})

// 把获取品牌数据的请求封装成一个函数
const getTrademark = async (params: TradeMarkParams) => {
  let res: TradeMarkResponse = await getTrademarkData(params)
  if (res.code === 200) {
    total.value = res.data.total
    currentTradeMark.data = res.data.records
    return 'ok'
  } else {
    return Promise.reject(new Error(res.message))
  }
}

// 当切换页码的时候重新发送请求获取当前页码数据
// @ts-ignore 给pagination绑定current-change事件本质就是给该组件绑定了一个自定义事件, 那么子组件也通过自定义事件传递出来了数据, 而该数据就是当前的页码
const handlePageData = async (page: number) => {
  // console.log(page)
  try {
    await getTrademark({ pageNum: pageNum.value, pageSize: pageSize.value })
  } catch (e) {
    console.log((e as Error).message)
  }
}

// 当每页显示个数发生变化的时候发送请求获取当前页码数据
const handlePageSize = async () => {
  // 因为改变每一页显示的数据的时候, 那么页码也会改变, 比如当前页码是10, 每页数据是3, 把每页数据改为9, 那么页码就没有10页了, 因此在改变每页显示的数据的时候, 需要把当前页面变为1
  pageNum.value = 1
  try {
    await getTrademark({ pageNum: pageNum.value, pageSize: pageSize.value })
  } catch (e) {
    console.log((e as Error).message)
  }
}

// 添加品牌的回调
const add = () => {
  // 每次添加之前先把之前的数据清空, 只用清除一遍
  tradeMarkData.logoUrl = ''
  tradeMarkData.tmName = ''
  tradeMarkData.id = 0 // 转换为boolean是false
  title.value = '添加品牌'
  dialogFormVisible.value = true
  // 重置表单验证, 注意: 如果是第一次点击添加, 那么此时表单节点还未渲染在页面, 所以调用清除表单验证错误信息的方法会报错
  // 解决办法1: 使用?.的方式
  // uploadForm.value?.clearValidate('tmName')
  // uploadForm.value?.clearValidate('logoUrl')

  // 解决方式2: 使用nextTIck
  nextTick(() => {
    uploadForm.value.clearValidate('tmName')
    uploadForm.value.clearValidate('logoUrl')
  })
}

// 修改品牌的回调
const update = (currentTradeMark: Records) => {
  title.value = '修改品牌'
  dialogFormVisible.value = true
  // 以下三行代码也可以使用Object.assign()实现
  // Object.assign(tradeMarkData, currentTradeMark)
  tradeMarkData.id = currentTradeMark.id
  tradeMarkData.logoUrl = currentTradeMark.logoUrl.includes('http://')
    ? currentTradeMark.logoUrl
    : `http://${currentTradeMark.logoUrl}`
  tradeMarkData.tmName = currentTradeMark.tmName
  // 重置表单验证
  nextTick(() => {
    uploadForm.value.clearValidate('tmName')
    uploadForm.value.clearValidate('logoUrl')
  })
}

// dialog取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}

// dialog确定按钮
const confirm = async () => {
  await uploadForm.value.validate() // 当表单验证成功之后才会执行后面的代码

  let res: any = await addOrUpdateTrademark(tradeMarkData)
  if (res.code === 200) {
    // 如果添加|修改成功, 关闭dialog
    dialogFormVisible.value = false
    // 显示添加成功的提示信息
    ElMessage({
      type: 'success',
      message: tradeMarkData.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 重新获取全部已经添加了的品牌数据
    await getTrademark({ pageNum: pageNum.value, pageSize: pageSize.value })
  } else {
    // 添加|修改失败
    dialogFormVisible.value = false
    ElMessage({
      type: 'error',
      message: tradeMarkData.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}

// 预览图片
// const previewImg = (img: string) => {
//   srcList.length = 0
//   srcList.push(img)
// }

// el-upload组件上传图片之前执行的钩子函数, 在图片上传成功之前触发, 因此可以用来约束上传的文件格式和文件大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 该钩子函数可以接收一个参数, 该参数就是当前上传的文件
  // 如果不是当前规定的图片格式(png|jpg|jpeg|gif), 就不允许上传
  if (!imgType.includes(rawFile.type.split('/')[1])) {
    // 在组建中可以直接使用element-plus的组件, 因为全局注册了, 但是不在.vue文件中的话, 还需要单独引入一下
    ElMessage({
      type: 'error',
      message: '上传的图片格式仅支持: JPG|JPEG|PNG|GIF',
    })
    return false
  }
  // 如果当前图片大于4MB, 就不允许上传
  if (rawFile.size > imgSize.value) {
    ElMessage({
      type: 'error',
      message: '上传图片的大小不能大于4MB',
    })
    return false
  }

  Np.configure({ showSpinner: false })
  Np.start()
  // 如果上面的判断都通过了, 那么就上传图片
  // console.log('图片上传成功')
}

// el-upload组件上传图片成功之后的回调, 会接受两个参数, 第一个就是成功的数据, 第二个是上传的文件信息以及返回的成功的数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // 把上传成功之后返回的图片地址数据收集起来, 后续用于发请求
  tradeMarkData.logoUrl = response.data
  Np.done()
  // 取消单个表单验证的错误信息
  uploadForm.value.clearValidate('logoUrl')
}

// @ts-ignore
const validatorTmName = (rule: any, val: any, callback: any) => {
  if (val.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称长度不能少于2位'))
  }
}

// @ts-ignore
const validatorLogoUrl = (rule: any, val: any, callback: any) => {
  // 如果不是表单元素, 验证规则只能通过表单实例的validate来验证, 比如upload组件, 这个时候的value就是上传文件的地址
  if (val) {
    callback()
  } else {
    callback(new Error('当前未选择图片'))
  }
}

// 表单的校验规则
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  // 如果不是表单元素的话, 设置trigger无效
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

// 气泡确认框确定的回调
const handleDelete = async (id: number) => {
  let res = await deleteTrademark(id)
  if (res.code === 200) {
    // 删除成功
    // 删除成功重新获取数据
    await getTrademark({
      // 如果当前页的数据在删除之后, 还大于等于1条, 那么就继续留在当前页, 如果小于1条, 就跳转到前一页, 并获取前一页的数据
      pageNum:
        currentTradeMark.data.length >= 1 ? pageNum.value : pageNum.value - 1,
      pageSize: pageSize.value,
    })

    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
  } else {
    // 删除失败
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<st1yle scoped lang="scss">
.el-table {
  margin: 20px 0;

  .logo-img {
    width: 100px;
    height: 100px;
  }
}

.form {
  // padding-left: 20px;
  width: 80%;

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</st1yle>
