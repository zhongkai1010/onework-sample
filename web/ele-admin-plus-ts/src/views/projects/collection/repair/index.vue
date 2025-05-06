<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <!-- 搜索表单 -->
      <search-form ref="searchRef" @search="reload" />

      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="repairTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >修复登记</el-button
          >
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="UploadOutlined"
            @click="handleUpload"
            >上传图片</el-button
          >
          <el-button type="info" class="ele-btn-icon" :icon="DownloadOutlined" @click="handleExport"
            >导出</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            :icon="PrinterOutlined"
            @click="handlePrint"
            :disabled="selections.length !== 1"
            >单据打印</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="8" alignment="center" style="width: 100%">
            <el-button type="success" size="small" @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button
              v-if="row.status === 1"
              type="warning"
              size="small"
              @click="handleRepairInbound(row)"
              >修复入藏</el-button
            >
          </el-space>
        </template>

        <!-- 工单状态列 -->
        <template #status="{ row }">
          <el-tag
            :type="row.status === 0 ? 'warning' : row.status === 1 ? 'success' : 'info'"
            effect="light"
          >
            {{ row.status === 0 ? '待修复' : row.status === 1 ? '修复中' : '已完成' }}
          </el-tag>
        </template>
      </ele-pro-table>

      <!-- 修复登记弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 修复详情弹窗 -->
      <repair-details v-model="showDetails" :id="current?.id" />

      <!-- 单据打印弹窗 -->
      <print-document v-model="showPrint" :id="selections[0]?.id" />

      <!-- 修复入藏弹窗 -->
      <update-status v-if="current" v-model="showRepairInbound" :data="current" @done="reload" />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    PlusOutlined,
    UploadOutlined,
    DownloadOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import type { Repair, RepairQueryParams } from '@/api/collection/repair/model'
  import { getRepairList } from '@/api/collection/repair'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import RepairDetails from './components/repair-details.vue'
  import PrintDocument from './components/print-document.vue'
  import UpdateStatus from './components/update-status.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Repair | undefined>(undefined) // 当前编辑的修复记录
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const showPrint = ref(false) // 是否显示打印弹窗
  const showRepairInbound = ref(false) // 是否显示修复入藏弹窗
  const selections = ref<Repair[]>([]) // 表格选中的行

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'documentImage',
      label: '单据图片',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'repairCode',
      label: '修复单号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'registrationDate',
      label: '登记日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编码',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCategory',
      label: '藏品分类',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'sendRepairDepartment',
      label: '送修部门',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'sentBy',
      label: '送修人',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'repairReason',
      label: '修复原因',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'sendRepairDate',
      label: '送修日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '工单状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'undertakingOrganization',
      label: '承担机构',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'repairPerson',
      label: '修复人',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'qualificationCertificate',
      label: '资质证书',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'repairCompletionDate',
      label: '修完日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'repairStatusAndResults',
      label: '修复情况及结果',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'beforeRepairImage',
      label: '修复前图片',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'afterRepairImage',
      label: '修复后图片',
      width: 120,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 280,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getRepairList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: RepairQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加修复记录
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理上传图片
   */
  const handleUpload = () => {
    // TODO: 实现上传图片功能
    EleMessage.info('上传图片功能开发中...')
  }

  /**
   * 处理导出
   */
  const handleExport = () => {
    // TODO: 实现导出功能
    EleMessage.info('导出功能开发中...')
  }

  /**
   * 处理行上传图片
   */
  const handleUploadImage = (_row: Repair) => {
    // TODO: 实现行上传图片功能
    EleMessage.info('上传图片功能开发中...')
  }

  /**
   * 处理查看详情
   */
  const handleViewDetails = (row: Repair) => {
    current.value = row
    showDetails.value = true
  }

  /**
   * 处理修复入藏
   */
  const handleRepairInbound = (row: Repair) => {
    current.value = row
    showRepairInbound.value = true
  }

  /**
   * 处理单据打印
   */
  const handlePrint = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    showPrint.value = true
  }

  /**
   * 处理行点击事件
   */
  const handleRowClick = (row: Repair) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: RepairQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
