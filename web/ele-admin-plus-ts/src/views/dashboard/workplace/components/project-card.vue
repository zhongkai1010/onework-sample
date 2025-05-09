<!-- 项目进度 -->
<template>
  <ele-card :header="title" :body-style="{ padding: '10px', height: '370px' }">
    <template #extra>
      <more-icon @command="handleCommand" />
    </template>
    <ele-pro-table
      :height="352"
      row-key="id"
      :columns="columns"
      :datasource="projectList"
      :show-overflow-tooltip="true"
      highlight-current-row
      :pagination="false"
      :toolbar="false"
      :bottom-line="false"
      size="large"
      class="project-table"
    >
      <template #projectName="{ row }">
        <el-link type="primary" :underline="false">
          {{ row.projectName }}
        </el-link>
      </template>
      <template #status="{ row }">
        <ele-text v-if="row.status === 0" type="success">进行中</ele-text>
        <ele-text v-else-if="row.status === 1" type="danger">已延期</ele-text>
        <ele-text v-else-if="row.status === 2" type="warning"> 未开始 </ele-text>
        <ele-text v-else-if="row.status === 3" type="info">已结束</ele-text>
      </template>
      <template #progress="{ row }">
        <el-progress :percentage="row.progress" />
      </template>
    </ele-pro-table>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import MoreIcon from './more-icon.vue'
  import type { Command } from '../model'

  defineProps<{
    title?: string
  }>()

  const emit = defineEmits<{
    (e: 'command', command: Command): void
  }>()

  interface Project {
    id: number
    projectName: string
    status: number
    startDate: string
    endDate: string
    progress: number
  }

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'projectName',
      label: '项目名称',
      slot: 'projectName',
      minWidth: 110
    },
    {
      prop: 'startDate',
      label: '开始时间',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'endDate',
      label: '结束时间',
      align: 'center',
      minWidth: 110
    },
    {
      prop: 'status',
      label: '状态',
      slot: 'status',
      align: 'center',
      width: 90
    },
    {
      prop: 'progress',
      label: '进度',
      width: 180,
      align: 'center',
      slot: 'progress',
      showOverflowTooltip: false
    }
  ])

  /** 项目进度数据 */
  const projectList = ref<Project[]>([])

  /** 查询项目进度 */
  const queryProjectList = () => {
    projectList.value = [
      {
        id: 1,
        projectName: '项目000000001',
        status: 0,
        startDate: '2020-03-01',
        endDate: '2020-06-01',
        progress: 30
      },
      {
        id: 2,
        projectName: '项目000000002',
        status: 0,
        startDate: '2020-03-01',
        endDate: '2020-08-01',
        progress: 10
      },
      {
        id: 3,
        projectName: '项目000000003',
        status: 1,
        startDate: '2020-01-01',
        endDate: '2020-05-01',
        progress: 60
      },
      {
        id: 4,
        projectName: '项目000000004',
        status: 1,
        startDate: '2020-06-01',
        endDate: '2020-10-01',
        progress: 0
      },
      {
        id: 5,
        projectName: '项目000000005',
        status: 2,
        startDate: '2020-03-01',
        endDate: '2020-07-01',
        progress: 100
      },
      {
        id: 6,
        projectName: '项目000000006',
        status: 3,
        startDate: '2020-02-01',
        endDate: '2020-06-01',
        progress: 100
      }
    ]
  }

  const handleCommand = (command: Command) => {
    emit('command', command)
  }

  queryProjectList()
</script>

<style lang="scss" scoped>
  .project-table :deep(.el-progress__text) {
    font-size: 12px !important;
  }
</style>
