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
        <el-row :gutter="20">
          <!-- 藏品分类分布统计 -->
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>藏品分类分布统计</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="categoryChartRef"></div>
            </el-card>
          </el-col>
          <!-- 藏品状态分布统计 -->
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>藏品状态分布统计</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="statusChartRef"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 藏品分组数量对比 -->
      <div class="charts-container">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>藏品分组数量对比</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="groupChartRef"></div>
        </el-card>
      </div>

      <!-- 出入库趋势分析 -->
      <div class="charts-container">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>出入库趋势分析</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="trendChartRef"></div>
        </el-card>
      </div>

      <!-- 拨库记录统计 -->
      <div class="charts-container">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>拨库记录统计</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="transferChartRef"></div>
        </el-card>
      </div>

      <!-- 注销与事故分析 -->
      <div class="charts-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>注销与事故趋势</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="accidentTrendChartRef"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>注销原因分布</span>
                </div>
              </template>
              <div class="chart-wrapper" ref="accidentReasonChartRef"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 图书与影像资料覆盖统计 -->
      <div class="charts-container">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>图书与影像资料覆盖统计</span>
            </div>
          </template>
          <div class="chart-wrapper" ref="coverageChartRef"></div>
        </el-card>
      </div>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import * as echarts from 'echarts'

  // 搜索表单
  const searchForm = reactive({
    timeType: 'month', // month-月, quarter-季度
    timeValue: undefined
  })

  // 图表实例
  const categoryChartRef = ref<HTMLElement>()
  const statusChartRef = ref<HTMLElement>()
  const groupChartRef = ref<HTMLElement>()
  const trendChartRef = ref<HTMLElement>()
  const transferChartRef = ref<HTMLElement>()
  const accidentTrendChartRef = ref<HTMLElement>()
  const accidentReasonChartRef = ref<HTMLElement>()
  const coverageChartRef = ref<HTMLElement>()

  let categoryChart: echarts.ECharts | null = null
  let statusChart: echarts.ECharts | null = null
  let groupChart: echarts.ECharts | null = null
  let trendChart: echarts.ECharts | null = null
  let transferChart: echarts.ECharts | null = null
  let accidentTrendChart: echarts.ECharts | null = null
  let accidentReasonChart: echarts.ECharts | null = null
  let coverageChart: echarts.ECharts | null = null

  // 初始化图表
  const initCharts = () => {
    if (categoryChartRef.value) {
      categoryChart = echarts.init(categoryChartRef.value)
    }
    if (statusChartRef.value) {
      statusChart = echarts.init(statusChartRef.value)
    }
    if (groupChartRef.value) {
      groupChart = echarts.init(groupChartRef.value)
    }
    if (trendChartRef.value) {
      trendChart = echarts.init(trendChartRef.value)
    }
    if (transferChartRef.value) {
      transferChart = echarts.init(transferChartRef.value)
    }
    if (accidentTrendChartRef.value) {
      accidentTrendChart = echarts.init(accidentTrendChartRef.value)
    }
    if (accidentReasonChartRef.value) {
      accidentReasonChart = echarts.init(accidentReasonChartRef.value)
    }
    if (coverageChartRef.value) {
      coverageChart = echarts.init(coverageChartRef.value)
    }
  }

  // 更新图表数据
  const updateCharts = async () => {
    try {
      // 模拟数据
      const data = {
        // 藏品分类分布
        categoryData: [
          { name: '书画', value: 300 },
          { name: '器物', value: 250 },
          { name: '碑帖', value: 150 },
          { name: '照片', value: 200 },
          { name: '文献', value: 100 }
        ],
        // 藏品状态分布
        statusData: [
          { name: '正常', value: 800 },
          { name: '出库', value: 100 },
          { name: '拨库', value: 50 },
          { name: '注销', value: 30 },
          { name: '事故', value: 20 }
        ],
        // 藏品分组数量
        groupData: {
          categories: ['朝代', '来源', '专题', '收藏人'],
          series: [
            {
              name: '数量',
              data: [
                { name: '唐代', value: 150 },
                { name: '宋代', value: 200 },
                { name: '明代', value: 180 },
                { name: '清代', value: 220 }
              ]
            },
            {
              name: '数量',
              data: [
                { name: '考古发掘', value: 300 },
                { name: '征集', value: 250 },
                { name: '捐赠', value: 200 },
                { name: '购买', value: 150 }
              ]
            },
            {
              name: '数量',
              data: [
                { name: '陶瓷专题', value: 180 },
                { name: '青铜专题', value: 150 },
                { name: '书画专题', value: 200 },
                { name: '玉器专题', value: 120 }
              ]
            },
            {
              name: '数量',
              data: [
                { name: '张三', value: 100 },
                { name: '李四', value: 80 },
                { name: '王五', value: 120 },
                { name: '赵六', value: 90 }
              ]
            }
          ]
        },
        // 出入库趋势
        trendData: {
          dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
          inbound: [30, 25, 35, 40, 30, 35],
          outbound: [20, 30, 25, 35, 40, 30]
        },
        // 拨库记录
        transferData: [
          { name: '临时展览', value: 40 },
          { name: '交流', value: 30 },
          { name: '修复', value: 20 },
          { name: '研究', value: 15 },
          { name: '其他', value: 10 }
        ],
        // 注销与事故趋势
        accidentTrendData: {
          dates: ['1月', '2月', '3月', '4月', '5月', '6月'],
          cancellation: [5, 3, 4, 6, 2, 3],
          accident: [2, 1, 3, 2, 1, 2]
        },
        // 注销原因分布
        accidentReasonData: [
          { name: '遗失', value: 15 },
          { name: '损毁', value: 10 },
          { name: '误入', value: 5 },
          { name: '其他', value: 5 }
        ],
        // 资料覆盖统计
        coverageData: [
          { name: '图书资料', value: 60 },
          { name: '影像资料', value: 35 }
        ]
      }

      // 更新藏品分类分布图表
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
              data: data.categoryData,
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
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              data: data.statusData,
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

      // 更新藏品分组数量对比图表
      if (groupChart) {
        groupChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: data.groupData.categories
          },
          xAxis: {
            type: 'category',
            data: data.groupData.series[0].data.map((item) => item.name)
          },
          yAxis: {
            type: 'value'
          },
          series: data.groupData.series.map((series, index) => ({
            name: data.groupData.categories[index],
            type: 'bar',
            data: series.data.map((item) => item.value)
          }))
        })
      }

      // 更新出入库趋势图表
      if (trendChart) {
        trendChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['入库', '出库']
          },
          xAxis: {
            type: 'category',
            data: data.trendData.dates
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '入库',
              type: 'line',
              data: data.trendData.inbound
            },
            {
              name: '出库',
              type: 'line',
              data: data.trendData.outbound
            }
          ]
        })
      }

      // 更新拨库记录图表
      if (transferChart) {
        transferChart.setOption({
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
            data: data.transferData.map((item) => item.name)
          },
          series: [
            {
              type: 'bar',
              data: data.transferData.map((item) => item.value)
            }
          ]
        })
      }

      // 更新注销与事故趋势图表
      if (accidentTrendChart) {
        accidentTrendChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['注销', '事故']
          },
          xAxis: {
            type: 'category',
            data: data.accidentTrendData.dates
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '注销',
              type: 'line',
              data: data.accidentTrendData.cancellation
            },
            {
              name: '事故',
              type: 'line',
              data: data.accidentTrendData.accident
            }
          ]
        })
      }

      // 更新注销原因分布图表
      if (accidentReasonChart) {
        accidentReasonChart.setOption({
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
              data: data.accidentReasonData,
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

      // 更新资料覆盖统计图表
      if (coverageChart) {
        coverageChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          yAxis: {
            type: 'category',
            data: data.coverageData.map((item) => item.name)
          },
          series: [
            {
              type: 'bar',
              data: data.coverageData.map((item) => item.value),
              label: {
                show: true,
                position: 'right',
                formatter: '{c}%'
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

  .charts-container {
    margin-bottom: 0;

    .chart-wrapper {
      height: 300px;
    }
  }
</style>
