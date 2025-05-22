<template>
  <v-chart class="chart" :option="levelOption" autoresize />
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { PieChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
  import type { ComposeOption } from 'echarts/core'
  import type {
    TitleComponentOption,
    TooltipComponentOption,
    LegendComponentOption
  } from 'echarts/components'
  import type { PieSeriesOption } from 'echarts/charts'
  import { getGradeStatistics } from '@/api/dashboard'

  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

  type ECOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption
  >

  interface ChartData {
    value: number
    name: string
  }

  // 藏品级别饼图配置
  const levelOption = ref<ECOption>({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: [] as string[]
    },
    series: [
      {
        name: '藏品级别',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [] as ChartData[]
      }
    ]
  })

  // 获取藏品级别统计数据
  const fetchData = async () => {
    try {
      const data = await getGradeStatistics()
      const chartData: ChartData[] = data.map((item) => ({
        value: Number(item.number),
        name: item.name
      }))
      if (levelOption.value.legend && 'data' in levelOption.value.legend) {
        levelOption.value.legend.data = chartData.map((item) => item.name)
      }
      if (
        levelOption.value.series &&
        levelOption.value.series[0] &&
        'data' in levelOption.value.series[0]
      ) {
        levelOption.value.series[0].data = chartData
      }
    } catch (error) {
      console.error('获取藏品级别统计数据失败:', error)
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
