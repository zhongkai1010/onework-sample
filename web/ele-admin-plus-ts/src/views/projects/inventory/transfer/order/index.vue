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
        cache-key="transferOrderTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="UploadOutlined"
            @click="handleUpload"
            >上传图片</el-button
          >
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="handleDelete"
            :disabled="!selections.length"
            >删除</el-button
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

        <!-- 单据图片列 -->
        <template #documentImage="{ row }">
          <el-image
            v-if="row.documentImage"
            :src="row.documentImage"
            :preview-src-list="[row.documentImage]"
            fit="cover"
            style="width: 50px; height: 50px"
          />
          <span v-else>无图片</span>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(Number(row.status))" effect="light">
            {{ getStatusText(Number(row.status)) }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="handleUploadImage(row)"
              v-if="Number(row.status) === 0"
              >上传图片</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="handleApprove(row)"
              v-if="Number(row.status) === 0"
              >审核</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
            <el-button
              type="success"
              size="small"
              @click="handleConfirm(row)"
              v-if="Number(row.status) === 1"
              >确认</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 详情弹窗 -->
    <order-details ref="detailsRef" />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    UploadOutlined,
    DeleteOutlined,
    DownloadOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import {
    listTransfers,
    approveTransfer,
    removeTransfers,
    confirmTransfer
  } from '@/api/inventory/transfer'
  import SearchForm from './components/search-form.vue'
  import OrderDetails from './components/order-details.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()
  const detailsRef = ref<InstanceType<typeof OrderDetails>>()

  /* ==================== 状态管理 ==================== */
  const selections = ref<any[]>([]) // 表格选中的行

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
      align: 'center',
      slot: 'documentImage'
    },
    {
      prop: 'code',
      label: '调拨单号',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '单据状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'transferDate',
      label: '调拨日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '调拨仓库',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'receiver',
      label: '接收人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'transferReason',
      label: '调拨原因',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 300,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return listTransfers({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 方法 ==================== */
  // 重新加载表格数据
  const reload = () => {
    tableRef.value?.reload()
  }

  // 获取状态类型
  const getStatusType = (status: number) => {
    switch (status) {
      case 0:
        return 'warning'
      case 1:
        return 'success'
      case 2:
        return 'info'
      default:
        return 'info'
    }
  }

  // 获取状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已确认'
      default:
        return '未知'
    }
  }

  // 查看详情
  const handleViewDetails = (row: any) => {
    detailsRef.value?.open(row.id)
  }

  // 上传图片
  const handleUpload = () => {
    // TODO: 实现批量上传图片功能
    console.log('批量上传图片')
  }

  // 上传图片
  const handleUploadImage = (row: any) => {
    // TODO: 实现上传图片功能
    console.log('上传图片', row)
  }

  // 审核
  const handleApprove = async (row: any) => {
    try {
      await ElMessageBox.confirm('确定要审核该调拨单吗?', '提示', {
        type: 'warning'
      })
      await approveTransfer({ ids: [row.id] })
      ElMessage.success('审核成功')
      reload()
    } catch (error) {
      console.error('审核失败:', error)
    }
  }

  // 删除
  const handleDelete = async (row?: any) => {
    try {
      const ids = row ? [row.id] : selections.value.map((item) => item.id)
      await ElMessageBox.confirm('确定要删除选中的调拨单吗?', '提示', {
        type: 'warning'
      })
      await removeTransfers(ids)
      ElMessage.success('删除成功')
      reload()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  // 确认
  const handleConfirm = async (row: any) => {
    try {
      await ElMessageBox.confirm('确定要确认该调拨单吗?', '提示', {
        type: 'warning'
      })
      await confirmTransfer({ id: row.id })
      ElMessage.success('确认成功')
      reload()
    } catch (error) {
      console.error('确认失败:', error)
    }
  }

  // 导出
  const handleExport = () => {
    // TODO: 实现导出功能
    console.log('导出')
  }

  // 打印
  const handlePrint = () => {
    // TODO: 实现打印功能
    console.log('打印')
  }
</script>

<style lang="scss" scoped></style>
