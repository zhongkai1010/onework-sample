<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      <!-- 搜索表单 -->
      <search-form ref="searchRef" @search="reload" />

      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="cancellationOrderTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        v-model:selections="selections"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="UploadOutlined"
            @click="handleUpload"
            :disabled="!selections.length || selections[0].status !== 0"
            >上传图片</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            :icon="CheckOutlined"
            @click="handleBatchApprove"
            :disabled="!selections.length || !selections.every((item) => item.status === 0)"
            >审核</el-button
          >
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleDelete()"
            :disabled="!selections.length"
            >删除</el-button
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
          <img
            v-if="row.documentImage"
            :src="row.documentImage"
            style="width: 50px; height: 50px; cursor: pointer"
            @click="openPreview(row.documentImage)"
          />
          <span v-else>无图片</span>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="success" size="small" @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="handleApprove(row)"
              v-if="row.status === 0"
              >审核</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
            <el-button
              type="success"
              size="small"
              @click="handleRecover(row)"
              v-if="row.status === 1"
              >恢复</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 单据打印组件 -->
    <print-document ref="printRef" />
    <!-- 上传图片弹窗 -->
    <upload-image v-model="showUpload" :id="current?.id" @success="reload" />
    <!-- 图片预览组件 -->
    <ele-image-viewer
      v-model="showImageViewer"
      :urlList="viewerImages"
      :initialIndex="viewerIndex"
      :infinite="false"
    />
    <!-- 参考按钮 -->
    <reference-button
      title="注销单管理"
      :imageUrl="pageImage"
      searchText="注销单号 注销时间 批准部门 注销原因"
      operationText="上传图片 删除 单据打印"
      tableFieldsText="单据图片 注销单号 注销时间 批准部门 注销原因 状态"
      tableOperationsText="上传图片 审核 删除 恢复"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import {
    UploadOutlined,
    DeleteOutlined,
    PrinterOutlined,
    CheckOutlined
  } from '@/components/icons'
  import {
    getCancellationList,
    approveCancellation,
    recoverCancellation,
    deleteCancellation
  } from '@/api/collection/cancellation'
  import type { Cancellation, CancellationQueryParams } from '@/api/collection/cancellation/model'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import PrintDocument from './components/print-document.vue'
  import dayjs from 'dayjs'
  import UploadImage from './components/upload-image.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()
  const printRef = ref<InstanceType<typeof PrintDocument>>()
  const showUpload = ref(false)
  const current = ref<Cancellation | undefined>(undefined)

  /* ==================== 状态管理 ==================== */
  const selections = ref<any[]>([]) // 表格选中的行
  const showImageViewer = ref(false) // 是否显示图片预览
  const viewerImages = ref<string[]>([]) // 预览图片列表
  const viewerIndex = ref(0) // 预览图片索引

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 60,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'documentImage',
      label: '单据图片',
      width: 80,
      align: 'center',
      slot: 'documentImage'
    },
    {
      prop: 'code',
      label: '注销单号',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'cancellationTime',
      label: '注销时间',
      sortable: 'custom',
      width: 160,
      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => {
        return row.cancellationTime ? dayjs(row.cancellationTime).format('YYYY-MM-DD') : ''
      }
    },
    {
      prop: 'approvalDepartment',
      label: '批准部门',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationReason',
      label: '注销原因',
      sortable: 'custom',
      width: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'action',
      label: '操作',
      width: 220,
      align: 'left',
      fixed: 'right',
      slot: 'action'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getCancellationList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 方法 ==================== */
  // 重新加载表格数据
  const reload = (params?: CancellationQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where: params })
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
        return '已注销'
      case 2:
        return '已恢复'
      default:
        return '未知'
    }
  }

  // 上传图片
  const handleUpload = () => {
    if (selections.value.length !== 1) {
      ElMessage.warning('请选择一条记录')
      return
    }
    current.value = selections.value[0]
    showUpload.value = true
  }

  // 上传图片
  const handleUploadImage = (row: Cancellation) => {
    current.value = row
    showUpload.value = true
  }

  // 审核
  const handleApprove = (row: Cancellation) => {
    ElMessageBox.confirm('确定要审核通过该注销单吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      try {
        await approveCancellation({ ids: [row.id] })
        ElMessage.success('审核成功')
        reload()
      } catch (error) {
        console.error('审核失败:', error)
      }
    })
  }

  // 恢复
  const handleRecover = (row: Cancellation) => {
    ElMessageBox.confirm('确定要恢复该注销单吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      try {
        await recoverCancellation({ ids: [row.id] })
        ElMessage.success('恢复成功')
        reload()
      } catch (error: any) {
        console.error('恢复失败:', error)
        ElMessage.error(error?.message || '恢复失败')
      }
    })
  }

  // 删除
  const handleDelete = async (row?: Cancellation) => {
    try {
      const _ids = row ? [row.id] : selections.value.map((item) => item.id)
      await ElMessageBox.confirm('确定要删除选中的注销单吗？', '提示', {
        type: 'warning'
      })
      await deleteCancellation(_ids)
      ElMessage.success('删除成功')
      reload()
      selections.value = []
    } catch (error: any) {
      // 用户点击取消按钮时，error 会是 'cancel'
      if (error === 'cancel') {
        return
      }
      console.error('删除失败:', error)
      ElMessage.error(error?.message || '删除失败')
    }
  }

  // 打印
  const handlePrint = () => {
    if (selections.value.length === 1) {
      printRef.value?.open(selections.value[0].id)
    }
  }

  // 批量审核
  const handleBatchApprove = () => {
    if (!selections.value.length) {
      ElMessage.warning('请选择要审核的注销单')
      return
    }
    ElMessageBox.confirm('确定要审核通过选中的注销单吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      try {
        await approveCancellation({ ids: selections.value.map((item) => item.id) })
        ElMessage.success('审核成功')
        reload()
      } catch (error) {
        console.error('审核失败:', error)
      }
    })
  }

  /**
   * 打开图片预览
   */
  const openPreview = (image: string) => {
    if (!image) return
    viewerImages.value = [image]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped></style>
