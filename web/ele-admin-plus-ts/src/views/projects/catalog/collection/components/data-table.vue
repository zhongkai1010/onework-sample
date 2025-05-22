<template>
  <search-form ref="searchRef" style="margin-bottom: -14px" @search="reload" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    v-model:selections="selections"
    :highlight-current-row="true"
    :style="{ paddingBottom: '16px' }"
    cache-key="collectionTable"
    :tools="['reload', 'size', 'columns', 'maximized']"
    :stripe="true"
    :export-config="exportConfig"
    @row-click="handleRowClick"
  >
    <template #toolbar>
      <!-- 工具栏按钮组 -->
      <el-button type="primary" :icon="PlusOutlined" @click="handleRegister"> 藏品登记 </el-button>
      <el-button
        type="default"
        :icon="PlusOutlined"
        @click="handleBind"
        :disabled="!selections.length"
      >
        绑定RFID
      </el-button>
      <el-button
        type="default"
        :icon="EditOutlined"
        @click="handleBatchModify"
        :disabled="!selections.length"
      >
        批量修改分类
      </el-button>
      <el-button
        type="success"
        :icon="CheckOutlined"
        @click="handleApprove"
        :disabled="!selections.length"
      >
        审核通过
      </el-button>
      <el-button
        type="danger"
        :icon="DeleteOutlined"
        @click="remove"
        :disabled="!selections.length"
      >
        删除藏品
      </el-button>
      <el-button type="success" :icon="UploadOutlined" @click="handleImport"> 导入 </el-button>
      <el-button type="success" :icon="DownloadOutlined" @click="handleExport"> 导出 </el-button>
      <el-button
        type="default"
        :icon="PrinterOutlined"
        @click="handlePrint"
        :disabled="!selections.length"
      >
        标签打印
      </el-button>
    </template>
    <template #collectionStatus="{ row }">
      <el-tag :type="row.status === 0 ? 'danger' : 'success'">
        {{ row.status === 0 ? '未审核' : '已审核' }}
      </el-tag>
    </template>
    <template #action="{ row }">
      <el-space :size="4">
        <el-button type="primary" size="small" @click.stop="openEdit(row)">编辑</el-button>
        <el-button type="success" size="small" @click.stop="() => handleSingleBind(row)">
          绑定
        </el-button>
        <el-button type="info" size="small" @click.stop="handleViewDetails(row)">
          查看详情
        </el-button>
        <el-button type="warning" size="small" @click.stop="handlePrintLabel(row)">
          铭牌打印
        </el-button>
      </el-space>
    </template>
    <template #imageInfo="{ row }">
      <img
        v-if="row.imageInfo"
        :src="row.imageInfo"
        style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
        @click.stop="openPreview(row.imageInfo)"
      />
      <div v-else> 暂无数据 </div>
    </template>
  </ele-pro-table>

  <!-- 藏品编辑弹窗 -->
  <form-edit v-model="showEdit" :data="current" @done="reload" />

  <!-- 批量修改分类弹窗 -->
  <update-category
    v-model="showUpdateCategory"
    :collection-ids="selectedCollectionIds"
    @done="reload"
  />

  <!-- RFID绑定弹窗 -->
  <bind-rfid
    v-model="showBindRfid"
    :collection-ids="selectedCollectionIds"
    :is-batch="isBatchBind"
    @done="reload"
  />

  <!-- 藏品详情弹窗 -->
  <collection-details v-model="showDetails" :id="currentDetailsId" @done="reload" />

  <!-- 标签打印弹窗 -->
  <print-label v-model="showPrintLabel" :data="selections" />

  <!-- 铭牌打印弹窗 -->
  <print-document v-model="showNameplate" :id="currentNameplateId" />

  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />
</template>

<script lang="ts" setup>
  import { ref, watch, computed, reactive } from 'vue'
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
    DeleteOutlined,
    EditOutlined,
    CheckOutlined,
    UploadOutlined,
    DownloadOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import SearchForm from './search-form.vue'
  import FormEdit from './form-edit.vue'
  import UpdateCategory from './update-category.vue'
  import BindRfid from './bind-rfid.vue'
  import CollectionDetails from './collection-details.vue'
  import PrintLabel from './print-label.vue'
  import PrintDocument from './print-document.vue'
  import { getCatalogs, deleteCollections, approve } from '@/api/collection/catalog'
  import type { Collection, CollectionQueryParams } from '@/api/collection/catalog/model'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'

  /* Props 定义 */
  const props = defineProps<{
    /** 分类 id */
    categoryId?: number
  }>()

  /* 组件引用 */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable> & { export: () => void }>()

  /* 状态管理 */
  const selections = ref<Collection[]>([])
  const current = ref<Collection | undefined>(undefined)
  const showEdit = ref(false)
  const showUpdateCategory = ref(false)
  const showBindRfid = ref(false)
  const isBatchBind = ref(false)
  const showDetails = ref(false)
  const currentDetailsId = ref<number>()
  const showPrintLabel = ref(false)
  const showNameplate = ref(false)
  const currentNameplateId = ref<number>()
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  /* 计算属性 */
  const selectedCollectionIds = computed(() =>
    selections.value
      .map((item) => {
        const id = item.id
        if (id === undefined) {
          return undefined
        }
        return typeof id === 'string' ? Number(id) : id
      })
      .filter((id) => id !== undefined)
  )

  /* 表格配置 */
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
      prop: 'collectionStatus',
      label: '藏品状态',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'collectionStatus'
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      width: 80,
      align: 'center',
      slot: 'imageInfo'
    },
    {
      prop: 'codeType',
      label: '编号类别',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'code',
      label: '藏品编号',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品类别',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'rfidCode',
      label: 'RFID编号',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '数量单位',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'eraType',
      label: '年代类型',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'artist',
      label: '艺术家',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'regionType',
      label: '地域类型',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'region',
      label: '地域',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'materialType',
      label: '质地类型',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '质地',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'overallLength',
      label: '通长(底径cm)',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'overallWidth',
      label: '通宽(口径cm)',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'totalHeight',
      label: '通高(cm)',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'weightRange',
      label: '质量范围',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificWeight',
      label: '具体质量',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'weightUnit',
      label: '质量单位',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'culturalLevel',
      label: '文物级别',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残状况',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '保存状态',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDate',
      label: '征集日期',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDateRange',
      label: '入藏日期范围',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'type',
      label: '类型',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'culturalType',
      label: '人文类型',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionIntroduction',
      label: '藏品介绍',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'textType',
      label: '文本类型',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'audioVisualCarrierType',
      label: '声像载体类型',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'audioVisualStorageLocation',
      label: '声像载体存放位置',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'diskPath',
      label: '计算机磁盘路径',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'colorCategory',
      label: '颜色类别',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'colorDescription',
      label: '颜色描述',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '存放位置',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'museumEntryTime',
      label: '入馆时间',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionTime',
      label: '入藏时间',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'loginTime',
      label: '登录时间',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'cabinetEntryTime',
      label: '入柜时间',
      width: 120,
      align: 'center',
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

  /* 数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getCatalogs({
      ...where,
      ...orders,
      ...pages,
      categoryId: props.categoryId
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getCatalogs({ ...where, ...orders, ...filters })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '藏品数据',
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

  /* 表格操作 */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: CollectionQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 打开编辑弹窗
   * @param row 行数据
   */
  const openEdit = (row: Collection) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 删除藏品
   */
  const remove = () => {
    const rows =
      selections.value.length > 0 ? selections.value : current.value ? [current.value] : []
    if (!rows.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    ElMessageBox.confirm('确定要删除选中的藏品吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteCollections(rows.map((d) => Number(d.id)))
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /* 业务处理函数 */
  /**
   * 处理藏品登记
   */
  const handleRegister = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理批量绑定RFID
   */
  const handleBind = (_evt: MouseEvent) => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    isBatchBind.value = true
    showBindRfid.value = true
  }

  /**
   * 处理单个藏品绑定RFID
   * @param row 行数据
   */
  const handleSingleBind = (row: Collection) => {
    isBatchBind.value = false
    selections.value = [row]
    showBindRfid.value = true
  }

  /**
   * 处理批量修改分类
   */
  const handleBatchModify = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    showUpdateCategory.value = true
  }

  /**
   * 处理审核通过
   */
  const handleApprove = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    ElMessageBox.confirm('确定要通过选中的藏品审核吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        approve(selections.value.map((d) => Number(d.id)))
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 处理导入
   */
  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import collections')
  }

  /**
   * 处理导出
   */
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 处理标签打印
   */
  const handlePrint = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    showPrintLabel.value = true
  }

  /**
   * 处理查看详情
   * @param row 行数据
   */
  const handleViewDetails = (row: Collection) => {
    currentDetailsId.value = row.id
    showDetails.value = true
  }

  /**
   * 处理铭牌打印
   * @param row 行数据
   */
  const handlePrintLabel = (row: Collection) => {
    currentNameplateId.value = row.id
    showNameplate.value = true
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

  /** 处理行点击 */
  const handleRowClick = (row: Collection) => {
    // 触发表格的 selection-change 事件
    tableRef.value?.toggleRowSelection(row)
  }

  /* 监听器 */
  watch(
    () => props.categoryId,
    () => {
      searchRef.value?.resetFields?.()
      reload({})
    }
  )
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }

  :deep(.el-table__body-wrapper) {
    cursor: pointer;
  }

  :deep(.el-table__cell) {
    cursor: pointer;
  }

  :deep(.el-table__row.selected) {
    background-color: var(--el-color-primary-light-9) !important;
  }
</style>
