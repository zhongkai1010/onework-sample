<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
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
          <el-button type="primary" @click="handleUpload()" :disabled="!selectedRows.length"
            >上传图片</el-button
          >
          <el-button type="danger" @click="handleDelete" :disabled="!selectedRows.length"
            >删除</el-button
          >
          <el-button type="success" @click="handleExport">导出</el-button>
        </template>
        <template #documentImage="{ row }">
          <img
            v-if="row.documentImage"
            :src="row.documentImage"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.documentImage)"
          />
          <div v-else>暂无数据</div>
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
            <el-button
              v-if="row.status === 1"
              type="success"
              size="small"
              @click="handleConfirm(row)"
              >确认出库</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 详情弹框 -->
    <order-details ref="detailsRef" v-model="detailsVisible" />

    <!-- 上传图片弹框 -->
    <upload-image v-model="uploadVisible" :id="selectedId" @success="handleUploadSuccess" />

    <!-- 参考按钮 -->
    <reference-button
      title="出库单管理"
      :imageUrl="pageImage"
      searchText="单据图片 单据状态 出库单号 出库日期 经办人 提借部门 提借人 提借类型 拟归日期 备注"
      operationText="上传图片 删除 导出"
      tableFieldsText="单据图片 单据状态 出库单号 出库日期 经办人 提借部门 提借人 提借类型 拟归日期 备注 操作"
      tableOperationsText="上传图片 查看详情 审核"
    />

    <!-- 图片预览组件 -->
    <ele-image-viewer
      v-model="showImageViewer"
      :urlList="viewerImages"
      :initialIndex="viewerIndex"
      :infinite="false"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { OutboundOrder, OutboundQueryParams } from '@/api/inventory/outbound/model'
  import {
    listOutbounds,
    deleteOutbound,
    approveOutbounds,
    confirmOutbound
  } from '@/api/inventory/outbound'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import SearchForm from './components/search-form.vue'
  import OrderDetails from './components/order-details.vue'
  import UploadImage from './components/upload-image.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 图片预览相关状态
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  // 详情弹框实例
  const detailsRef = ref<InstanceType<typeof OrderDetails>>()

  // 加载状态
  const loading = ref(false)

  // 选中的行
  const selectedRows = ref<OutboundOrder[]>([])

  // 详情弹框显示状态
  const detailsVisible = ref(false)

  // 上传图片弹框显示状态
  const uploadVisible = ref(false)

  // 当前选中的出库单ID
  const selectedId = ref<number>()

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
      prop: 'id',
      label: '编号',
      width: 80,
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
      width: 120,
      align: 'center',
      slot: 'status',
      showOverflowTooltip: true
    },
    {
      prop: 'code',
      label: '出库单号',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'outboundDate',
      label: '出库日期',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'operator',
      label: '经办人',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'borrowDepartment',
      label: '提借部门',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'borrower',
      label: '提借人',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'borrowType',
      label: '提借类型',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },

    {
      prop: 'proposedReturnDate',
      label: '拟归日期',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },

    {
      prop: 'remarks',
      label: '备注',
      minWidth: 200,
      align: 'left',
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
    if (row) {
      selectedId.value = row.id
    } else if (selectedRows.value.length === 1) {
      selectedId.value = selectedRows.value[0].id
    } else {
      ElMessage.warning('一次只能上传一个出库单的图片')
      return
    }
    uploadVisible.value = true
  }

  // 处理上传成功
  const handleUploadSuccess = () => {
    tableRef.value?.reload()
    selectedId.value = undefined
  }

  // 处理查看详情
  const handleViewDetails = (row: OutboundOrder) => {
    detailsRef.value?.open(row.id)
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

  // 处理审核
  const handleAudit = (row: OutboundOrder) => {
    if (row.status !== 0) {
      ElMessage.warning('只能审核未审核状态的单据')
      return
    }
    ElMessageBox.confirm('确定要审核通过该出库单吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(async () => {
        try {
          await approveOutbounds([row.id])
          ElMessage.success('审核成功')
          tableRef.value?.reload()
        } catch (error: any) {
          ElMessage.error(error.message || '审核失败')
        }
      })
      .catch(() => {})
  }

  // 处理确认出库
  const handleConfirm = (row: OutboundOrder) => {
    if (row.status !== 1) {
      ElMessage.warning('只能确认待出库状态的单据')
      return
    }
    ElMessageBox.confirm('确定要确认该出库单已完成出库吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(async () => {
        try {
          await confirmOutbound(row.id)
          ElMessage.success('确认出库成功')
          tableRef.value?.reload()
        } catch (error: any) {
          ElMessage.error(error.message || '确认出库失败')
        }
      })
      .catch(() => {})
  }

  // 处理图片预览
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped></style>
