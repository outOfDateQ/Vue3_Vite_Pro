<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// @ts-ignore 因为是在html文件中引入的百度地图API, 所以在Node环境下使用引入的对象, 需要通过window获取
const BMapGL = window.BMapGL

onMounted(() => {
  createMap()
})

// 创建地图实例函数
const createMap = () => {
  let map = new BMapGL.Map('map') // 创建Map实例
  let point = new BMapGL.Point(106, 35)
  let marker = new BMapGL.Marker(point) // 创建标注   

  map.addOverlay(marker) // 将标注添加到地图中
  map.centerAndZoom(point, 11) // 初始化地图,设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放

  marker.addEventListener('click', function () {
    alert("您点击了标注")
  })

  var polyline = new BMapGL.Polyline([
    new BMapGL.Point(116.399, 39.910),
    new BMapGL.Point(116.405, 39.920),
    new BMapGL.Point(116.425, 39.900)
  ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
  map.addOverlay(polyline);
}
</script>

<style scoped lang="scss">
#map {
  height: 100vh;
}
</style>
