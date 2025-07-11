<template>
  <!-- 页面布局，包含筛选表单和数据表格 -->
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      <!-- 筛选条件表单 -->
      <div style="margin-bottom: 16px; display: flex; gap: 16px; align-items: center">
        <el-form :inline="true" :model="searchForm" @submit.prevent>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 320px"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">筛选</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        :columns="columns"
        :datasource="datasource"
        row-key="groupName"
        border
        :pagination="false"
        style="width: 100%"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  // 引入依赖
  import { reactive, ref } from 'vue'
  import { groupIdStatistics } from '@/api/collection/ledger'
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types'
  import dayjs from 'dayjs'

  // 表格列配置
  const columns: Columns = [
    { prop: 'groupName', label: '藏品分类', align: 'center' },
    { prop: 'status0', label: '总库存', align: 'center' },
    { prop: 'status1', label: '入库中', align: 'center' },
    { prop: 'status2', label: '已入库', align: 'center' },
    { prop: 'status3', label: '出库中', align: 'center' },
    { prop: 'status4', label: '已出库', align: 'center' },
    { prop: 'status5', label: '销毁中', align: 'center' },
    { prop: 'status6', label: '已销毁', align: 'center' },
    { prop: 'status7', label: '剩余库存', align: 'center' }
  ]

  // 筛选表单数据
  const searchForm = reactive({
    dateRange: [
      dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ] as string[]
  })

  // 表格ref
  const tableRef = ref()

  // 点击筛选按钮，刷新表格数据
  const handleSearch = () => {
    let startTime = '',
      endTime = ''
    if (Array.isArray(searchForm.dateRange) && searchForm.dateRange.length === 2) {
      startTime = searchForm.dateRange[0] || ''
      endTime = searchForm.dateRange[1] || ''
    }
    console.log('筛选条件:', { startTime, endTime })
    tableRef.value?.reload({
      where: { startTime, endTime }
    })
  }

  // 点击重置按钮，清空筛选条件并刷新表格
  const handleReset = () => {
    searchForm.dateRange = []
    tableRef.value?.reload({
      where: { startTime: '', endTime: '' }
    })
  }

  // 数据源方法，调用后端接口获取数据
  const datasource: DatasourceFunction = async ({ where }) => {
    return groupIdStatistics({
      startTime: where?.startTime,
      endTime: where?.endTime
    })
  }
</script>

<style lang="scss" scoped></style>
