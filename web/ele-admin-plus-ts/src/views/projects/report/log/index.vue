<template>
  <ele-page :hide-footer="true">
    <ele-card>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 概览信息卡片 -->
      <div class="statistics-cards">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>本月操作总次数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.totalOperations }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>操作人数量</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.operatorCount }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>涉及藏品数量</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.collectionCount }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                <div class="card-header">
                  <span>平均每日操作次数</span>
                </div>
              </template>
              <div class="card-value">{{ statistics.avgDailyOperations }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 图表展示 -->
      <div class="charts-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>操作类型分布</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="operationTypeChartRef"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>操作频率时间趋势</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="operationTrendChartRef"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 操作人活跃度排行 -->
      <div class="operator-ranking">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>操作人活跃度排行</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="operatorRankingChartRef"></div>
        </el-card>
      </div>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import { ElMessage } from 'element-plus'
  import {
    getOperateLogStatistics,
    getOperateLogStatus,
    getOperateLogTime,
    getOperateLogLiveness
  } from '@/api/report/log'
  import type { OperateLogParams } from '@/api/report/log/model'

  // 获取本月第一天和最后一天
  const getCurrentMonthRange = () => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    return [firstDay.toISOString().split('T')[0], lastDay.toISOString().split('T')[0]]
  }

  // 搜索表单
  const searchForm = reactive({
    dateRange: getCurrentMonthRange()
  })

  // 统计数据
  const statistics = reactive({
    totalOperations: 0,
    operatorCount: 0,
    collectionCount: 0,
    avgDailyOperations: 0
  })

  // 图表实例
  const operationTypeChartRef = ref<HTMLElement>()
  const operationTrendChartRef = ref<HTMLElement>()
  const operatorRankingChartRef = ref<HTMLElement>()
  let operationTypeChart: echarts.ECharts | null = null
  let operationTrendChart: echarts.ECharts | null = null
  let operatorRankingChart: echarts.ECharts | null = null

  // 初始化图表
  const initCharts = () => {
    if (operationTypeChartRef.value) {
      operationTypeChart = echarts.init(operationTypeChartRef.value)
    }
    if (operationTrendChartRef.value) {
      operationTrendChart = echarts.init(operationTrendChartRef.value)
    }
    if (operatorRankingChartRef.value) {
      operatorRankingChart = echarts.init(operatorRankingChartRef.value)
    }
  }

  // 更新统计数据
  const updateStatistics = async () => {
    try {
      const params: OperateLogParams = {
        startTime: searchForm.dateRange[0] || '',
        endTime: searchForm.dateRange[1] || ''
      }

      const data = await getOperateLogStatistics(params)
      statistics.totalOperations = data.number
      statistics.operatorCount = data.people
      statistics.avgDailyOperations = data.avg_number
    } catch (error) {
      console.error('获取统计数据失败:', error)
      ElMessage.error(error instanceof Error ? error.message : '获取统计数据失败')
    }
  }

  // 更新图表数据
  const updateCharts = async () => {
    try {
      const params: OperateLogParams = {
        startTime: searchForm.dateRange[0] || '',
        endTime: searchForm.dateRange[1] || ''
      }

      // 获取操作类型统计数据
      const typeData = await getOperateLogStatus(params)
      // 获取操作频率时间趋势数据
      const timeData = await getOperateLogTime(params)
      // 获取操作人活跃度排行数据
      const livenessData = await getOperateLogLiveness(params)

      // 更新操作类型分布图表
      if (operationTypeChart) {
        operationTypeChart.setOption({
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
              data: typeData.map((item) => ({
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

      // 更新操作频率时间趋势图表
      if (operationTrendChart) {
        operationTrendChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: timeData.map((item) => item.date)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: timeData.map((item) => item.number),
              type: 'line',
              smooth: true
            }
          ]
        })
      }

      // 更新操作人活跃度排行图表
      if (operatorRankingChart) {
        operatorRankingChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: livenessData.map((item) => item.username)
          },
          series: [
            {
              type: 'bar',
              data: livenessData.map((item) => item.count)
            }
          ]
        })
      }
    } catch (error) {
      console.error('更新图表失败:', error)
      ElMessage.error(error instanceof Error ? error.message : '更新图表失败')
    }
  }

  // 查询
  const handleSearch = () => {
    updateStatistics()
    updateCharts()
  }

  // 重置
  const handleReset = () => {
    searchForm.dateRange = getCurrentMonthRange()
    handleSearch()
  }

  // 组件挂载时初始化
  onMounted(() => {
    initCharts()
    handleSearch() // 首次加载数据
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
      height: 300px;
    }
  }

  .operator-ranking {
    margin-bottom: 0;

    .chart-wrapper {
      height: 300px;
    }
  }
</style>
