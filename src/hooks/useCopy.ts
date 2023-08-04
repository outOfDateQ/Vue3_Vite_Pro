// 拷贝的功能, 实现原理就是对外暴露一个属性, 然后在外部传入一个值, 把这个值赋值给该DOM元素, 然后调用表单元素select()方法选中文字, 在调用execCommand()方法拷贝到剪切板
import { ref, watch } from 'vue'
export default function useCopy() {
  // 定义一个响应式数据, 用于接收外部传入的值
  const copyedText = ref('')
  // const successful = ref(false)

  // 监视数据的改变
  watch(
    () => copyedText.value,
    (newVal) => {
      // 每次数据改变的时候就重新创建一个DOM, 用来存放当前需要拷贝的数据
      // 需要单独创建一个DOM, 但是不会显示在页面, 只有输入类表单才有select()方法, 表示选中所有文字
      const textarea = document.createElement('textarea')
      textarea.style.position = 'absolute'
      textarea.style.top = '-10000px'
      textarea.style.zIndex = '-10000'
      document.body.append(textarea)

      // 把新的数据赋值给当前的表单元素
      textarea.value = newVal
      // 选中表单元素的文字
      textarea.select()
      // 把选中的文字拷贝到剪切板
      try {
        document.execCommand('copy') // 拷贝当前选中的文字, 返回的是一个boolean值
      } catch (e) {
        console.log('复制失败:', e)
      }
      // 复制之后, 把当前的表单元素删掉
      textarea.remove()
    },
  )

  // 因为是hooks函数, 所以需要对外暴露对象
  return {
    copyedText,
    // successful
  }
}
