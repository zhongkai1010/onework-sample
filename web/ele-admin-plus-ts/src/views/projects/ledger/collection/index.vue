<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      <search-form ref="searchRef" @search="reload" />
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selectedRows"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="collectionLedgerTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
        @row-click="onRowClick"
      >
        <template #toolbar>
          <el-button
            type="danger"
            class="ele-btn-icon"
            @click="onReturn"
            :disabled="!selectedRows.length"
            >退回编目</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            @click="onChangeWarehouse"
            :disabled="!selectedRows.length"
            >位置变更</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            @click="onUpdateGroup"
            :disabled="!selectedRows.length"
            >编入藏品组</el-button
          >
          <el-button
            type="primary"
            class="ele-btn-icon"
            @click="onBindRfid"
            :disabled="!selectedRows.length"
            >绑定RFID</el-button
          >
          <el-button
            type="primary"
            class="ele-btn-icon"
            @click="onBatchImage"
            :disabled="!selectedRows.length"
            >批量导入图片</el-button
          >
          <el-button type="success" class="ele-btn-icon" @click="onImport">导入数据</el-button>
          <el-button type="success" class="ele-btn-icon" @click="onExport">导出数据</el-button>
        </template>
        <!-- 状态列 -->
        <template #collectionStatus="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
        <!-- 操作列按钮 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="info" size="small" @click="onViewDetails(row)">查看详情</el-button>
            <el-button type="warning" size="small" @click="onRepair(row)">修复记录</el-button>
            <el-button type="warning" size="small" @click="onOutbound(row)">出库记录</el-button>
            <el-button type="warning" size="small" @click="onTransfer(row)">调拨记录</el-button>
            <el-button type="primary" size="small" @click="onUploadImage(row)">上传图片</el-button>
          </el-space>
        </template>
        <!-- 图片信息列 -->
        <template #imageInfo="{ row }">
          <img
            v-if="row.imageInfo"
            :src="row.imageInfo"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.imageInfo)"
          />
          <div v-else>暂无数据</div>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 各弹框组件引用 -->
    <!-- RFID绑定弹窗 -->
    <bind-rfid v-model="showBindRfid" :rows="selectedRows" @close="showBindRfid = false" />
    <!-- 藏品详情弹窗 -->
    <collection-details v-model="showDetails" :row="currentRow" @close="showDetails = false" />
    <!-- 出库记录弹窗 -->
    <outbound-table v-model="showOutbound" :row="currentRow" @close="showOutbound = false" />
    <!-- 修复记录弹窗 -->
    <repair-table v-model="showRepair" :row="currentRow" @close="showRepair = false" />
    <!-- 调拨记录弹窗 -->
    <transfer-table v-model="showTransfer" :row="currentRow" @close="showTransfer = false" />
    <!-- 编入藏品组弹窗 -->
    <update-group
      v-model="showUpdateGroup"
      :rows="selectedRows"
      @close="showUpdateGroup = false"
      @done="reload"
    />
    <!-- 位置变更弹窗 -->
    <update-warehouse
      v-model="showUpdateWarehouse"
      :rows="selectedRows"
      @close="showUpdateWarehouse = false"
      @done="reload"
    />
    <!-- 批量导入图片弹窗 -->
    <batch-image
      v-model="showBatchImage"
      :rows="selectedRows"
      :mode="batchImageMode"
      @close="showBatchImage = false"
      @done="reload"
    />

    <!-- 参考按钮 -->
    <reference-button
      title="藏品台账"
      :imageUrl="pageImage"
      searchText="藏品状态 图片信息 藏品编号 藏品名称 藏品类别 仓存位置 年代 实际质地 数量 单位 具体尺寸 完残状况 保存状态 文物级别 藏品来源 入藏日期 入藏年度 备注"
      operationText="退回编目 位置变更 编入藏品组 绑定RFID 批量导入图片 导入数据 导出数据"
      tableFieldsText="藏品状态 图片信息 藏品编号 藏品名称 藏品类别 仓存位置 年代 实际质地 数量 单位 具体尺寸 完残状况 保存状态 文物级别 藏品来源 入藏日期 入藏年度 备注 操作"
      tableOperationsText="查看详情 修复记录 出库记录 调拨记录 上传图片"
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

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import BindRfid from './components/bind-rfid.vue'
  import CollectionDetails from './components/collection-details.vue'
  import OutboundTable from './components/outbound-table.vue'
  import RepairTable from './components/repair-table.vue'
  import TransferTable from './components/transfer-table.vue'
  import UpdateGroup from './components/update-group.vue'
  import UpdateWarehouse from './components/update-warehouse.vue'
  import BatchImage from './components/batch-image.vue'
  import SearchForm from './components/search-form.vue'
  import { getLedgerList, returnLedgers } from '@/api/collection/ledger'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import { ElMessage } from 'element-plus'
  import { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    ExportConfig,
    Columns
  } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import { EleImageViewer } from 'ele-admin-plus'

  // 组件引用
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref()

  // 表格数据
  const selectedRows = ref<CollectionLedger[]>([])
  const currentRow = ref<CollectionLedger | null>(null)

  // 弹框显示状态
  const showUpdateWarehouse = ref(false) // 位置变更弹窗显示状态
  const showUpdateGroup = ref(false) // 编入藏品组弹窗显示状态
  const showBindRfid = ref(false) // RFID绑定弹窗显示状态
  const showBatchImage = ref(false) // 批量导入图片弹窗显示状态
  const batchImageMode = ref<'batch' | 'single'>('batch') // 图片导入模式
  const showDetails = ref(false) // 藏品详情弹窗显示状态
  const showRepair = ref(false) // 修复记录弹窗显示状态
  const showOutbound = ref(false) // 出库记录弹窗显示状态
  const showTransfer = ref(false) // 调拨记录弹窗显示状态

  // 图片预览相关状态
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

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
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'status',
      label: '藏品状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'collectionStatus'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'rfidCode',
      label: 'RFID编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '仓存位置',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '实际质地',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '完残状况',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'location',
      label: '存放位置',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'groupName',
      label: '藏品组',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'culturalLevel',
      label: '文物级别',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDateRange',
      label: '入藏日期范围',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      width: 80,
      align: 'center',
      slot: 'imageInfo'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 438,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* 数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getLedgerList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getLedgerList({ ...where, ...orders, ...filters })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '藏品台账数据',
    datasource: exportSource,
    beforeExport: (params) => {
      const { fileName, closeModal, bodyCols, bodyData, headerData } = params
      const workbook = getExportWorkbook(params)
      const sheet = workbook.getWorksheet('Sheet1')

      const getBuffer = async () => {
        // 添加图片列图片
        const imageColIndex = bodyCols.findIndex((c) => c.dataKey === 'imageInfo')
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

  /**
   * 表格行点击事件
   */
  const onRowClick = (row: CollectionLedger) => {
    selectedRows.value = [row]
    currentRow.value = row
  }

  /**
   * 获取状态类型
   */
  const getStatusType = (status: number): 'success' | 'warning' | 'danger' | 'info' | 'primary' => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      0: 'danger', // 未审核
      1: 'success', // 在藏
      2: 'warning', // 待出库
      3: 'danger', // 已出库
      4: 'warning', // 待拨库
      5: 'danger', // 修复中
      6: 'warning', // 待注销
      7: 'primary' // 已注销
    }
    return statusMap[status] || 'primary'
  }

  /**
   * 获取状态文本
   */
  const getStatusText = (status: number): string => {
    const statusMap: Record<number, string> = {
      0: '未审核',
      1: '在藏',
      2: '待出库',
      3: '已出库',
      4: '待拨库',
      5: '修复中',
      6: '待注销',
      7: '已注销'
    }
    return statusMap[status] || '其他'
  }

  /**
   * 退回编目
   */
  const onReturn = async () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要退回的藏品')
      return
    }
    try {
      await returnLedgers({
        collectionIds: selectedRows.value.map((row) => Number(row.id))
      })
      ElMessage.success('退回成功')
      tableRef.value?.reload()
    } catch (error) {
      console.error('退回编目失败:', error)
    }
  }

  /**
   * 位置变更
   */
  const onChangeWarehouse = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要变更位置的藏品')
      return
    }
    showUpdateWarehouse.value = true
  }

  /**
   * 编入藏品组
   */
  const onUpdateGroup = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要编入藏品组的藏品')
      return
    }
    showUpdateGroup.value = true
  }

  /**
   * 绑定RFID
   */
  const onBindRfid = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要绑定RFID的藏品')
      return
    }
    showBindRfid.value = true
  }

  /**
   * 批量导入图片
   */
  const onBatchImage = () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要导入图片的藏品')
      return
    }
    console.log('选中的藏品:', selectedRows.value)
    batchImageMode.value = 'batch'
    showBatchImage.value = true
  }

  /**
   * 导入数据
   */
  const onImport = () => {
    // TODO: 实现导入数据功能
    console.log('导入数据')
  }

  /**
   * 导出数据
   */
  const onExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 查看详情
   */
  const onViewDetails = (row: CollectionLedger) => {
    currentRow.value = row
    showDetails.value = true
  }

  /**
   * 修复记录
   */
  const onRepair = (row: CollectionLedger) => {
    currentRow.value = row
    showRepair.value = true
  }

  /**
   * 出库记录
   */
  const onOutbound = (row: CollectionLedger) => {
    currentRow.value = row
    showOutbound.value = true
  }

  /**
   * 调拨记录
   */
  const onTransfer = (row: CollectionLedger) => {
    currentRow.value = row
    showTransfer.value = true
  }

  /**
   * 上传图片
   */
  const onUploadImage = (row: CollectionLedger) => {
    currentRow.value = row
    selectedRows.value = [row]
    batchImageMode.value = 'single'
    showBatchImage.value = true
  }

  /**
   * 处理图片预览
   * @param url 图片 URL
   */
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /**
   * 重新加载表格数据
   */
  const reload = (where?: any) => {
    tableRef.value?.reload?.({ page: 1, where })
  }
</script>
