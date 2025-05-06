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
            style="width: 40px; height: 40px; border-radius: 4px"
          />
          <span v-else>-</span>
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
            <el-button type="success" size="small" @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button v-if="row.status === 0" type="warning" size="small" @click="handleAudit(row)"
              >审核</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 入库登记弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 入库详情弹窗 -->
      <order-details ref="orderDetailsRef" v-model="showDetails" />

      <!-- 单据打印弹窗 -->
      <print-document ref="printDocumentRef" v-model="showPrint" />

      <!-- 参考按钮 -->
      <reference-button
        title="入库单管理"
        :imageUrl="pageImage"
        searchText="单据图片 入库单号 单据状态 入库类型 经办人 接收库房 入库日期 备注"
        operationText="入库登记 上传图片 删除 导出 单据打印"
        tableFieldsText="单据图片 入库单号 单据状态 入库类型 经办人 接收库房 入库日期 备注 操作"
        tableOperationsText="上传图片 查看详情 审核"
      />
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
    DownloadOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import type { InboundOrder } from '@/api/inventory/inbound/model'
  import { getInboundList, deleteInboundList } from '@/api/inventory/inbound'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import OrderDetails from './components/order-details.vue'
  import PrintDocument from './components/print-document.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable> & { export: () => void }>()
  const orderDetailsRef = ref<InstanceType<typeof OrderDetails> | null>(null)
  const printDocumentRef = ref<InstanceType<typeof PrintDocument> | null>(null)

  /* ==================== 状态管理 ==================== */
  const current = ref<InboundOrder | undefined>(undefined) // 当前编辑的入库单
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const showPrint = ref(false) // 是否显示打印弹窗
  const selections = ref<InboundOrder[]>([]) // 表格选中的行

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
      showOverflowTooltip: true,
      slot: 'documentImage',
      align: 'center'
    },
    {
      prop: 'code',
      label: '入库单号',
      sortable: 'custom',
      width: 120,
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
      prop: 'type',
      label: '入库类型',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'type'
    },
    {
      prop: 'operator',
      label: '经办人',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '接收库房',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',

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
    return getInboundList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getInboundList({ ...where, ...orders, ...filters })
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
        return '已审核'
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
  const reload = () => {
    tableRef.value?.reload?.({ page: 1 })
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
    // TODO: 实现上传图片功能
    EleMessage.info('上传图片功能开发中...')
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
   * 处理上传图片
   */
  const handleUploadImage = (_row: InboundOrder) => {
    // TODO: 实现上传图片功能
    EleMessage.info('上传图片功能开发中...')
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
   * 处理打印
   */
  const handlePrint = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    showPrint.value = true
    printDocumentRef.value?.open(selections.value[0].id)
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

  /**
   * 处理审核
   */
  const handleAudit = (_row: InboundOrder) => {
    // TODO: 实现审核功能
    EleMessage.info('审核功能开发中...')
  }
</script>

<style lang="scss" scoped></style>
