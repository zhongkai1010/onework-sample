<template>
  <ele-page :hide-footer="true">
    <ele-card>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="时间类型">
          <el-radio-group v-model="searchForm.timeType" @change="handleSearch">
            <el-radio-button label="month">月度</el-radio-button>
            <el-radio-button label="quarter">季度</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-if="searchForm.timeType === 'month'"
            v-model="searchForm.timeValue"
            type="month"
            placeholder="选择月份"
            value-format="YYYY-MM"
            @change="handleSearch"
          />
          <el-date-picker
            v-else-if="searchForm.timeType === 'quarter'"
            v-model="searchForm.timeValue"
            type="months"
            placeholder="选择季度"
            value-format="YYYY-MM"
            :multiple="true"
            @change="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 图表展示 -->
      <div class="charts-container">
        <!-- 藏品来源分布统计 -->
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>藏品来源分布统计</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="categoryChartRef"></div>
        </el-card>

        <!-- 藏品状态分布统计 -->
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>藏品状态分布统计</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="statusChartRef"></div>
        </el-card>
      </div>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import {
    getCollectionSourceStatistics,
    getCollectionStatusStatistics
  } from '@/api/report/subcategory'
  import type { CollectionStatisticsParams } from '@/api/report/subcategory/model'

  // 搜索表单
  const searchForm = reactive({
    timeType: 'month', // month-月, quarter-季度
    timeValue: undefined
  })

  // 图表实例
  const categoryChartRef = ref<HTMLElement>()
  const statusChartRef = ref<HTMLElement>()

  let categoryChart: echarts.ECharts | null = null
  let statusChart: echarts.ECharts | null = null

  // 初始化图表
  const initCharts = () => {
    if (categoryChartRef.value) {
      categoryChart = echarts.init(categoryChartRef.value)
    }
    if (statusChartRef.value) {
      statusChart = echarts.init(statusChartRef.value)
    }
  }

  // 更新图表数据
  const updateCharts = async () => {
    try {
      const params: CollectionStatisticsParams = {
        type: searchForm.timeType === 'month' ? '1' : '2',
        typeValue: searchForm.timeValue
          ? [searchForm.timeValue]
          : [new Date().getFullYear().toString()]
      }

      // 获取藏品来源统计
      const sourceData = await getCollectionSourceStatistics(params)
      // 获取藏品状态分布统计
      const statusData = await getCollectionStatusStatistics(params)

      // 更新藏品来源分布图表
      if (categoryChart) {
        categoryChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: sourceData.map((item) => ({
                name: item.collectionSource,
                value: item.count
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }

      // 更新藏品状态分布图表
      if (statusChart) {
        statusChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              data: statusData.map((item) => ({
                name: item.name,
                value: item.number
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
    }
  }

  // 查询
  const handleSearch = () => {
    updateCharts()
  }

  // 重置
  const handleReset = () => {
    searchForm.timeType = 'month'
    searchForm.timeValue = undefined
    handleSearch()
  }

  // 组件挂载时初始化
  onMounted(() => {
    initCharts()
    updateCharts()
  })
</script>

<style lang="scss" scoped>
  .search-form {
    margin-bottom: 20px;
  }

  .charts-container {
    margin-bottom: 0;

    .chart-card {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .chart-wrapper {
      height: 400px;
    }
  }
</style>
