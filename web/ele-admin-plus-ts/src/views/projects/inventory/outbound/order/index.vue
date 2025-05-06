<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <search-form @search="handleSearch" />
      <ele-pro-table
        ref="tableRef"
        :columns="columns"
        :datasource="datasource"
        :loading="loading"
        row-key="id"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        v-model:selections="selectedRows"
        :highlight-current-row="true"
      >
        <template #toolbar>
          <el-button type="primary" @click="handleUpload()">上传图片</el-button>
          <el-button type="danger" @click="handleDelete" :disabled="!selectedRows.length"
            >删除</el-button
          >
          <el-button type="success" @click="handleExport">导出</el-button>
          <el-button type="primary" @click="handlePrint">单据打印</el-button>
        </template>
        <template #documentImage="{ row }">
          <el-image
            v-if="row.documentImage"
            style="width: 50px; height: 50px"
            :src="row.documentImage"
            :preview-src-list="[row.documentImage]"
            fit="cover"
          />
          <span v-else>-</span>
        </template>
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="success" size="small" @click="handleUpload(row)">上传图片</el-button>
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button v-if="row.status === 0" type="warning" size="small" @click="handleAudit(row)"
              >审核</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 详情弹框 -->
    <order-details ref="detailsRef" v-model="detailsVisible" />

    <!-- 打印单据弹框 -->
    <print-document ref="printRef" v-model="printVisible" />

    <!-- 上传图片弹框 -->
    <upload-image ref="uploadRef" v-model="uploadVisible" @success="handleUploadSuccess" />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { OutboundOrder, OutboundQueryParams } from '@/api/inventory/outbound/model'
  import { listOutbounds, deleteOutbound } from '@/api/inventory/outbound'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import SearchForm from './components/search-form.vue'
  import OrderDetails from './components/order-details.vue'
  import PrintDocument from './components/print-document.vue'
  import UploadImage from './components/upload-image.vue'

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 详情弹框实例
  const detailsRef = ref<InstanceType<typeof OrderDetails>>()

  // 打印单据实例
  const printRef = ref<InstanceType<typeof PrintDocument>>()

  // 上传图片实例
  const uploadRef = ref<InstanceType<typeof UploadImage>>()

  // 加载状态
  const loading = ref(false)

  // 选中的行
  const selectedRows = ref<OutboundOrder[]>([])

  // 详情弹框显示状态
  const detailsVisible = ref(false)

  // 打印单据弹框显示状态
  const printVisible = ref(false)

  // 上传图片弹框显示状态
  const uploadVisible = ref(false)

  // 搜索参数
  const searchParams = ref<OutboundQueryParams>({})

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap = {
      0: '未审核',
      1: '待出库',
      2: '已出库',
      3: '已归还'
    }
    return statusMap[status as keyof typeof statusMap] || '-'
  }

  // 获取状态类型
  const getStatusType = (
    status?: number
  ): 'success' | 'warning' | 'info' | 'primary' | 'danger' => {
    const typeMap = {
      0: 'info',
      1: 'warning',
      2: 'success',
      3: 'primary'
    }
    return (typeMap[status as keyof typeof typeMap] || 'info') as
      | 'success'
      | 'warning'
      | 'info'
      | 'primary'
      | 'danger'
  }

  // 表格列配置
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
      prop: 'status',
      label: '单据状态',
      width: 100,
      slot: 'status'
    },
    {
      prop: 'code',
      label: '出库单号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'outboundDate',
      label: '出库日期',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'operator',
      label: '经办人',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'borrowDepartment',
      label: '提借部门',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'borrower',
      label: '提借人',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'borrowType',
      label: '提借类型',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'proposedReturnDate',
      label: '拟归日期',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 280,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return listOutbounds({
      ...searchParams.value,
      ...pages,
      ...where,
      ...orders
    })
  }

  // 处理搜索
  const handleSearch = (params: OutboundQueryParams) => {
    searchParams.value = params
    tableRef.value?.reload({ page: 1 })
  }

  // 处理表格选中行变化
  const handleSelectionChange = (rows: OutboundOrder[]) => {
    selectedRows.value = rows
  }

  // 处理行点击
  const handleRowClick = (row: OutboundOrder) => {
    const index = selectedRows.value.findIndex((item) => item.code === row.code)
    if (index === -1) {
      selectedRows.value.push(row)
    } else {
      selectedRows.value.splice(index, 1)
    }
  }

  // 处理上传图片
  const handleUpload = (row?: OutboundOrder) => {
    if (!row && !selectedRows.value.length) {
      ElMessage.warning('请选择要上传图片的出库单')
      return
    }
    if (uploadRef.value) {
      if (row) {
        uploadRef.value.setRowData(row)
      } else if (selectedRows.value.length === 1) {
        uploadRef.value.setRowData(selectedRows.value[0])
      } else {
        ElMessage.warning('一次只能上传一个出库单的图片')
        return
      }
      uploadVisible.value = true
    }
  }

  // 处理上传成功
  const handleUploadSuccess = () => {
    tableRef.value?.reload()
  }

  // 处理查看详情
  const handleViewDetails = (row: OutboundOrder) => {
    if (row.code) {
      detailsRef.value?.setOutboundId(row.code)
    }
  }

  // 处理删除
  const handleDelete = () => {
    if (!selectedRows.value.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的出库单吗？', '提示', {
      type: 'warning'
    })
      .then(async () => {
        try {
          await Promise.all(selectedRows.value.map((row) => deleteOutbound(Number(row.code))))
          ElMessage.success('删除成功')
          tableRef.value?.reload()
        } catch (error: any) {
          ElMessage.error(error.message || '删除失败')
        }
      })
      .catch(() => {})
  }

  // 处理导出
  const handleExport = () => {
    // TODO: 实现导出功能
    console.log('导出数据')
  }

  // 处理打印
  const handlePrint = () => {
    if (!selectedRows.value.length) {
      ElMessage.warning('请选择要打印的出库单')
      return
    }
    if (selectedRows.value.length > 1) {
      ElMessage.warning('一次只能打印一个出库单')
      return
    }
    const row = selectedRows.value[0]
    if (row.code) {
      printRef.value?.setOutboundId(row.code)
    }
  }

  // 处理审核
  const handleAudit = (row: OutboundOrder) => {
    // TODO: 实现审核功能
    console.log('审核出库单', row)
  }
</script>

<style lang="scss" scoped></style>
