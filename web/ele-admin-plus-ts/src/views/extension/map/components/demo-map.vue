<template>
  <ele-card header="官网底部地图">
    <div ref="locationMapRef" style="height: 360px; max-width: 800px"></div>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
  import AMapLoader from '@amap/amap-jsapi-loader'
  import { useThemeStore } from '@/store/modules/theme'
  import { storeToRefs } from 'pinia'
  import { MAP_KEY } from '@/config/setting'

  /** 是否是暗黑主题 */
  const themeStore = useThemeStore()
  const { darkMode } = storeToRefs(themeStore)

  /** 地图容器 */
  const locationMapRef = ref<HTMLElement | null>(null)

  /** 官网底部地图的实例 */
  let mapInsLocation: any

  /** 渲染官网底部地图 */
  const renderLocationMap = () => {
    AMapLoader.load({
      key: MAP_KEY,
      version: '2.0',
      plugins: ['AMap.InfoWindow', 'AMap.Marker']
    })
      .then((AMap) => {
        // 渲染地图
        const option = {
          zoom: 13, // 初缩放级别
          center: [114.346084, 30.511215 + 0.005], // 初始中心点
          mapStyle: darkMode.value ? 'amap://styles/dark' : void 0
        }
        mapInsLocation = new AMap.Map(locationMapRef.value, option)
        // 创建信息窗体
        const infoWindow = new AMap.InfoWindow({
          content: `
            <div style="color: #333;">
              <div style="padding: 5px;font-size: 16px;">藏品管理软件</div>
              <div style="padding: 0 5px;">地址: 湖北省武汉市洪山区雄楚大道222号</div>
              <div style="padding: 0 5px;">电话: 020-123456789</div>
            </div>
            <a
              style="padding: 8px 0 0 5px;text-decoration: none;display: inline-block;color: #1677ff;"
              href="//uri.amap.com/marker?position=114.346084,30.511215&name=藏品管理软件"
              target="_blank">到这里去→
            </a>
          `
        })
        infoWindow.open(mapInsLocation, [114.346084, 30.511215])
        const icon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          imageSize: new AMap.Size(25, 34)
        })
        const marker = new AMap.Marker({
          icon: icon,
          position: [114.346084, 30.511215],
          offset: new AMap.Pixel(-12, -28)
        })
        marker.setMap(mapInsLocation)
        marker.on('click', () => {
          infoWindow.open(mapInsLocation)
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /** 渲染地图 */
  onMounted(() => {
    renderLocationMap()
  })

  /** 销毁地图 */
  onBeforeUnmount(() => {
    if (mapInsLocation) {
      mapInsLocation.destroy()
      mapInsLocation = null
    }
  })

  /** 同步框架暗黑模式切换 */
  watch(darkMode, (value) => {
    if (mapInsLocation) {
      if (value) {
        mapInsLocation.setMapStyle('amap://styles/dark')
      } else {
        mapInsLocation.setMapStyle('amap://styles/normal')
      }
    }
  })
</script>
