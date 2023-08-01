<template>
  <div style="display: inline-block">
    <!-- 
      使用SVG, 在最外层使用svg标签, 然后里面使用use标签, 必须要配合使用 
      svg标签默认大小是300 * 150, 可以设置svg的css样式改变大小
    -->
    <!-- <svg style="height:30px;width:30px;"> -->
    <!-- 
        use的xlink:href属性来指定使用哪一个svg图片, 不用写.svg后缀, 必须是#icon-svgName使用 
        fill可以用来修改图片颜色
      -->
    <!-- <use xlink:href="#icon-home" fill="red"></use> -->
    <!-- </svg> -->

    <!-- 封装SVG组件 -->
    <svg :style="{ width: `${width}px`, height: `${height}px` }">
      <use :xlink:href="`${prefix}-${name}`" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    // 如果不传入的话, 默认值就是#icon
    default: '#icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    // default: '#000'
    default: '',
  },
  width: {
    type: String,
    default: '30',
  },
  height: {
    type: String,
    default: '30',
  },
})
</script>

<style scoped lang="scss"></style>
