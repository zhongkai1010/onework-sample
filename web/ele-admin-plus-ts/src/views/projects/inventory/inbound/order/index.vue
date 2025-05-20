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
        cache-key="inboundOrderTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >入库登记</el-button
          >
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
        </template>

        <!-- 单据图片列 -->
        <template #imgs="{ row }">
          <img
            v-if="row.imgs"
            :src="row.imgs"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.imgs)"
          />
          <div v-else>暂无数据</div>
        </template>

        <!-- 单据状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>

        <!-- 入库类型列 -->
        <template #type="{ row }">
          <el-tag :type="getTypeType(row.type)" effect="light">
            {{ getTypeText(row.type) }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button v-if="row.status === 0" type="success" size="small" @click="handleAudit(row)"
              >审核</el-button
            >
            <el-button
              v-if="row.status === 1"
              type="warning"
              size="small"
              @click="handleConfirm(row)"
              >确认入库</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 入库登记弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 入库详情弹窗 -->
      <order-details ref="orderDetailsRef" v-model="showDetails" />

      <!-- 参考按钮 -->
      <reference-button
        title="入库单管理"
        :imageUrl="pageImage"
        searchText="单据图片 入库单号 单据状态 入库类型 经办人 接收库房 入库日期 备注"
        operationText="入库登记 上传图片 删除 导出"
        tableFieldsText="单据图片 入库单号 单据状态 入库类型 经办人 接收库房 入库日期 备注 操作"
        tableOperationsText="上传图片 查看详情 审核"
      />

      <!-- 图片预览 -->
      <ele-image-viewer
        v-model="showImageViewer"
        :urlList="viewerImages"
        :initialIndex="viewerIndex"
        :infinite="false"
      />

      <!-- 上传图片弹窗 -->
      <upload-modal v-model="showUpload" :id="currentUploadId" @success="reload" />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    Columns,
    ExportConfig
  } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    PlusOutlined,
    UploadOutlined,
    DeleteOutlined,
    DownloadOutlined
  } from '@/components/icons'
  import type { InboundOrder, InboundQueryParams } from '@/api/inventory/inbound/model'
  import {
    getInboundList,
    deleteInboundList,
    approveInboundList,
    confirmInboundOrder
  } from '@/api/inventory/inbound'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'
  import dayjs from 'dayjs'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import OrderDetails from './components/order-details.vue'
  import UploadModal from './components/upload-modal.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable> & { export: () => void }>()
  const orderDetailsRef = ref<InstanceType<typeof OrderDetails> | null>(null)

  /* ==================== 状态管理 ==================== */
  const current = ref<InboundOrder | undefined>(undefined) // 当前编辑的入库单
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const selections = ref<InboundOrder[]>([]) // 表格选中的行
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)
  const showUpload = ref(false)
  const currentUploadId = ref<number>()

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
      width: 100,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'imgs',
      label: '单据图片',
      width: 120,
      showOverflowTooltip: true,
      slot: 'imgs',
      align: 'center'
    },
    {
      prop: 'warehouseNumber',
      label: '入库单号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'operator',
      label: '经办人',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '接收库房',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'type',
      label: '入库类型',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'type'
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
      prop: 'storageDate',
      label: '入库日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => {
        if (!row.storageDate) return '-'
        return dayjs(row.storageDate).format('YYYY-MM-DD')
      }
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 320,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getInboundList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getInboundList({
      ...where,
      ...orders,
      ...filters,
      status: where.status,
      type: where.type,
      collectionId: where.collectionId,
      operator: where.operator,
      warehouseId: where.warehouseId,
      remarks: where.remarks
    })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '入库单数据',
    datasource: exportSource,
    beforeExport: (params) => {
      const { fileName, closeModal, bodyCols, bodyData, headerData } = params
      const workbook = getExportWorkbook(params)
      const sheet = workbook.getWorksheet('Sheet1')

      const getBuffer = async () => {
        // 添加图片列图片
        const imageColIndex = bodyCols.findIndex((c) => c.dataKey === 'imgs')
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

  /* ==================== 状态处理 ==================== */
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

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '待入库'
      case 2:
        return '已入库'
      default:
        return '-'
    }
  }

  const getTypeType = (type: number) => {
    switch (type) {
      case 1:
        return 'success'
      case 2:
        return 'warning'
      default:
        return 'info'
    }
  }

  const getTypeText = (type: number) => {
    switch (type) {
      case 1:
        return '初次入库'
      case 2:
        return '归还入库'
      default:
        return '-'
    }
  }

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   */
  const reload = (params?: InboundQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where: params })
  }

  /**
   * 处理添加入库单
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理上传图片
   */
  const handleUpload = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    currentUploadId.value = selections.value[0].id
    showUpload.value = true
  }

  /**
   * 处理上传图片
   */
  const handleUploadImage = (row: InboundOrder) => {
    currentUploadId.value = row.id
    showUpload.value = true
  }

  /**
   * 处理删除
   */
  const handleDelete = () => {
    if (!selections.value.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的入库单吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const ids = selections.value.map((item) => item.id)
        deleteInboundList(ids)
          .then((msg) => {
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 处理导出
   */
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 处理查看详情
   */
  const handleViewDetails = (row: InboundOrder) => {
    current.value = row
    showDetails.value = true
    orderDetailsRef.value?.open(row.id)
  }

  /**
   * 处理审核
   */
  const handleAudit = (row: InboundOrder) => {
    if (row.status !== 0) {
      EleMessage.warning('只能审核待审核状态的单据')
      return
    }
    ElMessageBox.confirm('确定要审核通过该入库单吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        approveInboundList({ ids: [row.id] })
          .then((msg) => {
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 处理确认入库
   */
  const handleConfirm = (row: InboundOrder) => {
    if (row.status !== 1) {
      EleMessage.warning('只能确认待入库状态的单据')
      return
    }
    ElMessageBox.confirm('确定要确认该入库单已完成入库吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        confirmInboundOrder({ id: row.id })
          .then((msg) => {
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 打开图片预览
   * @param image 图片URL
   */
  const openPreview = (image: string) => {
    viewerImages.value = [image]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /**
   * 处理行点击事件
   */
  const handleRowClick = (row: InboundOrder) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
  }
</script>

<style lang="scss" scoped></style>
