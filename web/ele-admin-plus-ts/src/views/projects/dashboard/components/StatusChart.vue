<template>
  <v-chart class="chart" :option="statusOption" autoresize />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
  import { getArtifactStatusStatistics } from '@/api/dashboard'

  use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])

  // 文物状态柱状图配置
  const statusOption = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['未审核', '在藏', '维修中', '出库中', '已注销'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        barWidth: '60%',
        data: [0, 0, 0, 0, 0],
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  })

  // 获取文物状态统计数据
  const fetchData = async () => {
    try {
      const data = await getArtifactStatusStatistics()
      if (statusOption.value.series && statusOption.value.series[0]) {
        statusOption.value.series[0].data = [
          Number(data.count1),
          Number(data.count2),
          Number(data.count3),
          Number(data.count4),
          Number(data.count5)
        ]
      }
    } catch (error) {
      console.error('获取文物状态统计数据失败:', error)
    }
  }

  onMounted(() => {
    fetchData()
  })
</script>

<style lang="scss" scoped>
  .chart {
    height: 300px;
  }
</style>
