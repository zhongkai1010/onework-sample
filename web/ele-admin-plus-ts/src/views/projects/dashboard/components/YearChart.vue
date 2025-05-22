<template>
  <v-chart class="chart" :option="yearOption" autoresize />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { LineChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
  import type { ComposeOption } from 'echarts/core'
  import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption
  } from 'echarts/components'
  import type { LineSeriesOption } from 'echarts/charts'
  import { getAnnualStatistics } from '@/api/dashboard'

  use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent])

  type ECOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption
  >

  // 入藏年度折线图配置
  const yearOption = ref<ECOption>({
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [] as string[]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '入藏数量',
        type: 'line',
        data: [] as number[],
        areaStyle: {
          opacity: 0.3
        },
        lineStyle: {
          width: 3
        },
        itemStyle: {
          borderWidth: 2
        }
      }
    ]
  })

  // 获取入藏年度统计数据
  const fetchData = async () => {
    try {
      const data = await getAnnualStatistics()
      // 按时间排序（年份数字比较）
      const sortedData = data.sort((a, b) => Number(a.time) - Number(b.time))
      if (yearOption.value.xAxis && 'data' in yearOption.value.xAxis) {
        yearOption.value.xAxis.data = sortedData.map((item) => item.time)
      }
      if (
        yearOption.value.series &&
        yearOption.value.series[0] &&
        'data' in yearOption.value.series[0]
      ) {
        yearOption.value.series[0].data = sortedData.map((item) => item.number)
      }
    } catch (error) {
      console.error('获取入藏年度统计数据失败:', error)
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
