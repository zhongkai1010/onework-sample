<template>
  <ele-page :hide-footer="true">
    <ele-card>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="时间类型">
          <el-radio-group v-model="searchForm.timeType">
            <el-radio-button label="year">年度</el-radio-button>
            <el-radio-button label="quarter">季度</el-radio-button>
            <el-radio-button label="month">月度</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-if="searchForm.timeType === 'year'"
            v-model="searchForm.timeValue"
            type="year"
            placeholder="选择年份"
            value-format="YYYY"
          />
          <el-date-picker
            v-else-if="searchForm.timeType === 'quarter'"
            v-model="searchForm.timeValue"
            type="months"
            placeholder="选择季度"
            value-format="YYYY-MM"
            :multiple="true"
          />
          <el-date-picker
            v-else-if="searchForm.timeType === 'month'"
            v-model="searchForm.timeValue"
            type="month"
            placeholder="选择月份"
            value-format="YYYY-MM"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 统计卡片 -->
      <div class="statistics-cards">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>藏品总数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.totalCount }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>出库总数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.outboundCount }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>修复总数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.repairCount }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>注销总数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.cancellationCount }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 图表展示 -->
      <div class="charts-container">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>藏品分类统计</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="categoryChartRef"></div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-4">
          <el-col :span="24">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>藏品状态分布</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="statusChartRef"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import {
    getCollectionStatistics,
    getCollectionStatisticsCategory,
    getCollectionStatus
  } from '@/api/report/inventory'
  import type { CollectionStatisticsParams } from '@/api/report/inventory/model'

  // 获取当前年份
  const currentYear = new Date().getFullYear().toString()

  // 搜索表单
  const searchForm = reactive({
    timeType: 'year', // year-年, quarter-季度, month-月
    timeValue: currentYear
  })

  // 统计数据
  const statistics = reactive({
    totalCount: '0',
    outboundCount: '0',
    repairCount: '0',
    cancellationCount: '0'
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
      // 构建查询参数
      const params: CollectionStatisticsParams = {
        type: searchForm.timeType === 'year' ? '1' : searchForm.timeType === 'quarter' ? '2' : '3',
        typeValue: Array.isArray(searchForm.timeValue)
          ? searchForm.timeValue
          : searchForm.timeValue
            ? [searchForm.timeValue]
            : []
      }

      // 获取分类统计数据
      const categoryData = await getCollectionStatisticsCategory(params)
      // 获取状态分布数据
      const statusData = await getCollectionStatus(params)

      // 更新分类统计图表
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
              data: categoryData.map((item) => ({
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

      // 更新状态分布图表
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
              radius: '50%',
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
      console.error('更新图表失败:', error)
    }
  }

  // 更新统计数据
  const updateStatistics = async () => {
    try {
      // 构建查询参数
      const params: CollectionStatisticsParams = {
        type: searchForm.timeType === 'year' ? '1' : searchForm.timeType === 'quarter' ? '2' : '3',
        typeValue: Array.isArray(searchForm.timeValue)
          ? searchForm.timeValue
          : searchForm.timeValue
            ? [searchForm.timeValue]
            : []
      }

      // 调用API获取统计数据
      const data = await getCollectionStatistics(params)

      // 更新统计数据
      statistics.totalCount = data.collection
      statistics.outboundCount = data.outbound
      statistics.repairCount = data.repair
      statistics.cancellationCount = data.cancellation

      // 更新图表
      await updateCharts()
    } catch (error) {
      console.error('获取统计数据失败:', error)
    }
  }

  // 查询
  const handleSearch = () => {
    updateStatistics()
  }

  // 重置
  const handleReset = () => {
    searchForm.timeType = 'year'
    searchForm.timeValue = currentYear
    handleSearch()
  }

  // 组件挂载时初始化
  onMounted(() => {
    initCharts()
    // 初始化时加载当前年度数据
    handleSearch()
  })
</script>

<style lang="scss" scoped>
  .search-form {
    margin-bottom: 0;
  }

  .statistics-cards {
    margin-bottom: 0;

    .stat-card {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--el-color-primary);
        text-align: center;
      }
    }
  }

  .charts-container {
    margin-bottom: 0;

    .chart-wrapper {
      height: 400px;
    }

    .mt-4 {
      margin-top: 16px;
    }
  }
</style>
