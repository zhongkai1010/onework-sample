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
            @change="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="success" @click="handleExport">导出Excel</el-button>
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

      <!-- 操作日志表格 -->
      <ele-pro-table
        ref="tableRef"
        :toolbar="false"
        :columns="columns"
        :datasource="datasource"
        :tools="['reload', 'size', 'columns']"
        :stripe="true"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import * as echarts from 'echarts'
  import { ElMessage } from 'element-plus'

  // 搜索表单
  const searchForm = reactive({
    dateRange: []
  })

  // 统计数据
  const statistics = reactive({
    totalOperations: 0,
    operatorCount: 0,
    collectionCount: 0,
    avgDailyOperations: 0
  })

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 图表实例
  const operationTypeChartRef = ref<HTMLElement>()
  const operationTrendChartRef = ref<HTMLElement>()
  const operatorRankingChartRef = ref<HTMLElement>()
  let operationTypeChart: echarts.ECharts | null = null
  let operationTrendChart: echarts.ECharts | null = null
  let operatorRankingChart: echarts.ECharts | null = null

  // 表格列配置
  const columns = ref<Columns>([
    {
      type: 'index',
      label: '序号',
      width: 60,
      align: 'center'
    },
    {
      prop: 'operationTime',
      label: '操作时间',
      width: 160,
      showOverflowTooltip: true
    },
    {
      prop: 'operator',
      label: '操作人',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'operationType',
      label: '操作类型',
      width: 100,
      align: 'center'
    },
    {
      prop: 'description',
      label: '详情描述',
      minWidth: 200,
      showOverflowTooltip: true
    }
  ])

  // 模拟数据
  const mockData = [
    {
      operationTime: '2024-01-01 10:00:00',
      operator: '张三',
      collectionCode: 'TCQ001',
      operationType: '借出',
      description: '借出至展览馆A'
    },
    {
      operationTime: '2024-01-02 11:00:00',
      operator: '李四',
      collectionCode: 'QTQ001',
      operationType: '归还',
      description: '从展览馆A归还'
    },
    {
      operationTime: '2024-01-03 12:00:00',
      operator: '王五',
      collectionCode: 'SH001',
      operationType: '修复',
      description: '进行常规修复'
    },
    {
      operationTime: '2024-01-04 13:00:00',
      operator: '赵六',
      collectionCode: 'TCQ002',
      operationType: '新增',
      description: '新增藏品入库'
    },
    {
      operationTime: '2024-01-05 14:00:00',
      operator: '张三',
      collectionCode: 'QTQ002',
      operationType: '编辑',
      description: '更新藏品信息'
    }
  ]

  // 数据源
  const datasource: DatasourceFunction = ({ pages }) => {
    // 模拟分页
    const { page, size } = pages
    const start = (page - 1) * size
    const end = start + size
    const list = mockData.slice(start, end)

    return Promise.resolve({
      list,
      total: mockData.length,
      page,
      size
    })
  }

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

  // 更新图表数据
  const updateCharts = async () => {
    try {
      // 模拟统计数据
      const data = {
        statistics: {
          totalOperations: 156,
          operatorCount: 8,
          collectionCount: 45,
          avgDailyOperations: 5.2
        },
        operationTypeStats: [
          { name: '借出', value: 40 },
          { name: '归还', value: 35 },
          { name: '修复', value: 25 },
          { name: '新增', value: 30 },
          { name: '编辑', value: 26 }
        ],
        operationTrendData: {
          dates: ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日'],
          values: [5, 7, 3, 8, 6, 4, 9]
        },
        operatorRankingData: [
          { name: '张三', value: 45 },
          { name: '李四', value: 38 },
          { name: '王五', value: 32 },
          { name: '赵六', value: 28 },
          { name: '钱七', value: 25 }
        ]
      }

      // 更新统计数据
      Object.assign(statistics, data.statistics)

      // 更新操作类型分布图表
      if (operationTypeChart) {
        operationTypeChart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: data.operationTypeStats,
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
            data: data.operationTrendData.dates
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: data.operationTrendData.values,
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
            data: data.operatorRankingData.map((item) => item.name)
          },
          series: [
            {
              type: 'bar',
              data: data.operatorRankingData.map((item) => item.value)
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
    tableRef.value?.reload({ page: 1 })
  }

  // 重置
  const handleReset = () => {
    Object.keys(searchForm).forEach((key) => {
      searchForm[key] = undefined
    })
    handleSearch()
  }

  // 导出Excel
  const handleExport = () => {
    ElMessage.success('导出成功')
  }

  // 组件挂载时初始化
  onMounted(() => {
    initCharts()
    updateCharts()
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
