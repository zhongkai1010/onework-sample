<template>
  <ele-page :hide-footer="true">
    <ele-card>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="时间类型">
          <el-radio-group v-model="searchForm.timeType" @change="handleSearch">
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
          <el-date-picker
            v-else-if="searchForm.timeType === 'month'"
            v-model="searchForm.timeValue"
            type="month"
            placeholder="选择月份"
            value-format="YYYY-MM"
            @change="handleSearch"
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
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>藏品分类统计</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="categoryChartRef"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
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

      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        :toolbar="false"
        :columns="columns"
        :datasource="datasource"
        :tools="['reload', 'size', 'columns']"
        :stripe="true"
      />

      <!-- 注销表格 -->
      <div class="cancellation-table">
        <h3>注销记录</h3>
        <ele-pro-table
          :toolbar="false"
          ref="cancellationTableRef"
          :columns="cancellationColumns"
          :datasource="cancellationDatasource"
          :tools="['reload', 'size', 'columns']"
          :stripe="true"
        />
      </div>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import * as echarts from 'echarts'
  import type { CollectionReport, CollectionStatistics } from '@/api/collection/report/model'

  // 搜索表单
  const searchForm = reactive({
    timeType: 'year', // year-年, quarter-季度, month-月
    timeValue: undefined
  })

  // 统计数据
  const statistics = reactive({
    totalCount: 0,
    outboundCount: 0,
    repairCount: 0,
    cancellationCount: 0
  })

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 图表实例
  const categoryChartRef = ref<HTMLElement>()
  const statusChartRef = ref<HTMLElement>()
  let categoryChart: echarts.ECharts | null = null
  let statusChart: echarts.ECharts | null = null

  // 表格列配置
  const columns = ref<Columns>([
    {
      type: 'index',
      label: '序号',
      width: 60,
      align: 'center'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'outboundCount',
      label: '出库次数',
      width: 100,
      align: 'center'
    },
    {
      prop: 'repairCount',
      label: '修复次数',
      width: 100,
      align: 'center'
    },
    {
      prop: 'inboundCount',
      label: '入库次数',
      width: 100,
      align: 'center'
    },
    {
      prop: 'transferCount',
      label: '拨库次数',
      width: 100,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      align: 'center',
      slot: 'status'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 160,
      showOverflowTooltip: true
    }
  ])

  // 模拟数据
  const mockData: CollectionReport[] = [
    {
      collectionCode: 'TCQ001',
      collectionName: '青花瓷瓶',
      categoryName: '陶瓷器',
      outboundCount: 2,
      repairCount: 1,
      inboundCount: 3,
      transferCount: 1,
      status: 1,
      createTime: '2024-01-01 10:00:00'
    },
    {
      collectionCode: 'QTQ001',
      collectionName: '青铜鼎',
      categoryName: '青铜器',
      outboundCount: 1,
      repairCount: 2,
      inboundCount: 2,
      transferCount: 0,
      status: 0,
      createTime: '2024-01-02 11:00:00'
    },
    {
      collectionCode: 'SH001',
      collectionName: '山水画',
      categoryName: '书画',
      outboundCount: 3,
      repairCount: 0,
      inboundCount: 1,
      transferCount: 2,
      status: 1,
      createTime: '2024-01-03 12:00:00'
    }
  ]

  // 注销表格列配置
  const cancellationColumns = ref<Columns>([
    {
      type: 'index',
      label: '序号',
      width: 60,
      align: 'center'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationTime',
      label: '注销时间',
      width: 160,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationReason',
      label: '注销原因',
      minWidth: 200,
      showOverflowTooltip: true
    }
  ])

  // 模拟注销数据
  const mockCancellationData = [
    {
      collectionCode: 'TCQ002',
      collectionName: '青花瓷碗',
      categoryName: '陶瓷器',
      cancellationTime: '2024-01-15 10:00:00',
      cancellationReason: '破损严重，无法修复'
    },
    {
      collectionCode: 'QTQ002',
      collectionName: '青铜剑',
      categoryName: '青铜器',
      cancellationTime: '2024-01-16 11:00:00',
      cancellationReason: '遗失'
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

  // 注销表格数据源
  const cancellationDatasource: DatasourceFunction = ({ pages }) => {
    const { page, size } = pages
    const start = (page - 1) * size
    const end = start + size
    const list = mockCancellationData.slice(start, end)

    return Promise.resolve({
      list,
      total: mockCancellationData.length,
      page,
      size
    })
  }

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
      // 模拟统计数据
      const data: CollectionStatistics = {
        statistics: {
          totalCount: 100,
          outboundCount: 50,
          repairCount: 30,
          cancellationCount: 20
        },
        categoryStats: [
          { name: '陶瓷器', value: 40 },
          { name: '青铜器', value: 30 },
          { name: '书画', value: 20 },
          { name: '玉器', value: 10 }
        ],
        statusStats: [
          { name: '已审核', value: 80 },
          { name: '未审核', value: 20 }
        ]
      }

      // 更新分类统计图表
      if (categoryChart) {
        categoryChart.setOption({
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
              data: data.categoryStats,
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
              data: data.statusStats,
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

      // 更新统计数据
      Object.assign(statistics, data.statistics)
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

  .cancellation-table {
    margin-top: 16px;

    h3 {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
