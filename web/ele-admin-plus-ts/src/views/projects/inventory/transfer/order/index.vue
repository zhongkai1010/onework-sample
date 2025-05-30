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
        v-model:selections="selections"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="transferOrderTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="UploadOutlined"
            @click="handleUpload"
            :disabled="!selections.length"
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
          <img
            v-if="row.documentImage"
            :src="row.documentImage"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.documentImage)"
          />
          <div v-else>暂无数据</div>
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
            <el-button type="success" size="small" @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="handleApprove(row)"
              v-if="Number(row.status) === 0"
              >审核</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 详情弹窗 -->
    <order-details
      ref="detailsRef"
      v-model="detailsVisible"
      :id="currentId"
      @success="handleDetailsSuccess"
    />

    <!-- 上传图片弹窗 -->
    <upload-image v-model="uploadImageVisible" :id="currentId" @success="handleUploadSuccess" />

    <!-- 参考按钮 -->
    <reference-button
      title="拨库单管理"
      :imageUrl="pageImage"
      searchText="调拨单号 单据状态 调拨日期 调拨仓库 接收人 调拨原因 备注"
      operationText="上传图片 删除 导出 单据打印"
      tableFieldsText="单据图片 调拨单号 单据状态 调拨日期 调拨仓库 接收人 调拨原因 备注"
      tableOperationsText="查看详情 上传图片 审核 删除 确认"
    />

    <!-- 图片预览组件 -->
    <ele-image-viewer
      v-model="showImageViewer"
      :urlList="viewerImages"
      :initialIndex="viewerIndex"
      :infinite="false"
    />

    <!-- 打印组件 -->
    <print-document ref="printDocumentRef" v-model="showPrint" />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    Columns,
    ExportConfig
  } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    UploadOutlined,
    DeleteOutlined,
    DownloadOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import { listTransfers, approveTransfer, removeTransfers } from '@/api/inventory/transfer'
  import SearchForm from './components/search-form.vue'
  import OrderDetails from './components/order-details.vue'
  import UploadImage from './components/upload-image.vue'
  import PrintDocument from './components/print-document.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()
  const detailsRef = ref<InstanceType<typeof OrderDetails>>()
  const printDocumentRef = ref<InstanceType<typeof PrintDocument>>()

  /* ==================== 状态管理 ==================== */
  const selections = ref<any[]>([]) // 表格选中的行
  const uploadImageVisible = ref(false) // 上传图片弹窗显示状态
  const currentId = ref<number>() // 当前操作的拨库单ID
  const detailsVisible = ref(false) // 详情弹窗显示状态
  const showPrint = ref(false) // 打印弹窗显示状态

  // 图片预览相关状态
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

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
      prop: 'code',
      label: '调拨单号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '单据状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'transferDate',
      label: '调拨日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '调拨仓库',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'receiver',
      label: '接收人',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'transferReason',
      label: '调拨原因',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'remark',
      label: '备注',
      align: 'left',
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

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return listTransfers({
      ...where,
      ...orders,
      ...filters,
      status: where.status,
      warehouseId: where.warehouseId
    })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '调拨单数据',
    datasource: exportSource,
    beforeExport: (params) => {
      const { fileName, closeModal, bodyCols, bodyData, headerData } = params
      const workbook = getExportWorkbook(params)
      const sheet = workbook.getWorksheet('Sheet1')

      const getBuffer = async () => {
        // 添加图片列图片
        const imageColIndex = bodyCols.findIndex((c) => c.dataKey === 'documentImage')
        if (sheet != null && imageColIndex !== -1) {
          const imageBuffers = await Promise.all(
            bodyData.map(async (row) => {
              const url = row[imageColIndex].text as string | undefined
              if (!url) {
                return
              }
              const res = await request({ url, responseType: 'arraybuffer' })
              return res.data
            })
          )
          imageBuffers.forEach((buffer, index) => {
            const rowIndex = index + headerData.length
            if (buffer != null) {
              const imgId = workbook.addImage({ buffer, extension: 'png' })
              sheet.addImage(imgId, {
                tl: { col: imageColIndex + 0.4, row: rowIndex + 0.2 },
                ext: { width: 48, height: 48 }
              })
              sheet.getCell(rowIndex + 1, imageColIndex + 1).value = ''
            }
            sheet.getRow(rowIndex + 1).height = 42
            sheet.getColumn(imageColIndex + 1).width = 8
          })
        }
        // 输出workbook
        const data = await workbook.xlsx.writeBuffer()
        return data
      }

      getBuffer().then((data) => {
        download(data, `${fileName}.xlsx`)
        closeModal()
      })
      return false
    }
  })

  /* ==================== 方法 ==================== */
  // 处理行点击
  const handleRowClick = (row: any) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
    // 同步表格选中状态
    tableRef.value?.toggleRowSelection(row, index === -1)
  }

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
    currentId.value = row.id
    detailsVisible.value = true
  }

  // 详情操作成功回调
  const handleDetailsSuccess = () => {
    reload()
  }

  // 批量上传图片
  const handleUpload = () => {
    if (selections.value.length !== 1) {
      ElMessage.warning('请选择一条记录进行上传')
      return
    }
    currentId.value = selections.value[0].id
    uploadImageVisible.value = true
  }

  // 单条记录上传图片
  const handleUploadImage = (row: any) => {
    currentId.value = row.id
    uploadImageVisible.value = true
  }

  // 上传成功回调
  const handleUploadSuccess = () => {
    reload()
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
  const handleDelete = async () => {
    try {
      const ids = selections.value.map((item) => item.id)
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

  // 导出
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  // 打印
  const handlePrint = () => {
    if (selections.value.length !== 1) {
      ElMessage.warning('请选择一条记录进行打印')
      return
    }
    const id = selections.value[0].id
    printDocumentRef.value?.open(id)
  }

  // 处理图片预览
  const openPreview = (url: string) => {
    if (!url) return
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }
</style>
