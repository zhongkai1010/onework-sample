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
        cache-key="repairTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
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
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="handleDelete"
            :disabled="selections.length === 0"
            >删除</el-button
          >
        </template>

        <!-- 单据图片列 -->
        <template #documentImage="{ row }">
          <img
            v-if="row.documentImage"
            :src="row.documentImage"
            style="width: 60px; height: 60px; cursor: pointer"
            @click="openPreview(row.documentImage)"
          />
          <span v-else>暂无数据</span>
        </template>

        <!-- 修复前图片列 -->
        <template #beforeRepairImage="{ row }">
          <img
            v-if="row.beforeRepairImage"
            :src="row.beforeRepairImage"
            style="width: 60px; height: 60px; cursor: pointer"
            @click="openPreview(row.beforeRepairImage)"
          />
          <span v-else>暂无数据</span>
        </template>

        <!-- 修复后图片列 -->
        <template #afterRepairImage="{ row }">
          <img
            v-if="row.afterRepairImage"
            :src="row.afterRepairImage"
            style="width: 60px; height: 60px; cursor: pointer"
            @click="openPreview(row.afterRepairImage)"
          />
          <span v-else>暂无数据</span>
        </template>

        <!-- 资质证书列 -->
        <template #qualificationCertificate="{ row }">
          <div v-if="row.qualificationCertificate">
            <el-link
              type="primary"
              :href="getCertificateUrl(row.qualificationCertificate)"
              target="_blank"
            >
              {{ getCertificateName(row.qualificationCertificate) }}
            </el-link>
          </div>
          <span v-else>暂无数据</span>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="8" alignment="center" style="width: 100%">
            <el-button
              type="success"
              size="small"
              :icon="UploadOutlined"
              @click="handleUploadImage(row)"
              >上传图片</el-button
            >
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
            <el-button
              v-if="row.status === 0"
              type="warning"
              size="small"
              @click="handleRepairInbound(row)"
              >修复入藏</el-button
            >
          </el-space>
        </template>

        <!-- 工单状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === 0 ? 'warning' : 'success'" effect="light">
            {{ row.status === 0 ? '修复中' : '已修复' }}
          </el-tag>
        </template>
      </ele-pro-table>

      <!-- 修复登记弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="handleEditDone" />

      <!-- 修复详情弹窗 -->
      <repair-details v-model="showDetails" :id="current?.id" />

      <!-- 单据打印弹窗 -->
      <print-document v-model="showPrint" :id="selections[0]?.id" />

      <!-- 修复入藏弹窗 -->
      <update-status v-if="current" v-model="showRepairInbound" :data="current" @done="reload" />

      <!-- 上传图片弹窗 -->
      <upload-image v-model="showUploadImage" :id="current?.id" @success="reload" />

      <!-- 图片预览组件 -->
      <ele-image-viewer
        v-model="showImageViewer"
        :urlList="viewerImages"
        :initialIndex="viewerIndex"
        :infinite="false"
      />
    </ele-card>
    <!-- 参考按钮 -->
    <reference-button
      title="修复记录"
      :imageUrl="pageImage"
      searchText="修复单号 登记日期 藏品编码 藏品名称 藏品分类 送修部门 送修人 修复原因 备注 送修日期 工单状态 承担机构 修复人 资质证书 修完日期"
      operationText="修复登记 上传图片 导出 单据打印"
      tableFieldsText="单据图片 修复单号 登记日期 藏品编码 藏品名称 藏品分类 送修部门 送修人 修复原因 备注 送修日期 工单状态 承担机构 修复人 资质证书 修完日期"
      tableOperationsText="上传图片 查看详情 修复入藏"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import { ElMessageBox } from 'element-plus'
  import type { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    Columns,
    ExportConfig
  } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    PlusOutlined,
    UploadOutlined,
    DownloadOutlined,
    PrinterOutlined,
    DeleteOutlined
  } from '@/components/icons'
  import type { Repair, RepairQueryParams } from '@/api/collection/repair/model'
  import { getRepairList, deleteRepair } from '@/api/collection/repair'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import RepairDetails from './components/repair-details.vue'
  import PrintDocument from './components/print-document.vue'
  import UpdateStatus from './components/update-status.vue'
  import UploadImage from './components/upload-image.vue'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Repair | undefined>(undefined) // 当前编辑的修复记录
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const showPrint = ref(false) // 是否显示打印弹窗
  const showRepairInbound = ref(false) // 是否显示修复入藏弹窗
  const showUploadImage = ref(false) // 是否显示上传图片弹窗
  const selections = ref<Repair[]>([]) // 表格选中的行
  const showImageViewer = ref(false) // 是否显示图片预览
  const viewerImages = ref<string[]>([]) // 预览图片列表
  const viewerIndex = ref(0) // 预览图片索引

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
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'documentImage',
      label: '单据图片',
      width: 100,
      align: 'center',
      slot: 'documentImage'
    },
    {
      prop: 'repairCode',
      label: '修复单号',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'registrationDate',
      label: '登记日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编码',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCategory',
      label: '藏品分类',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'sendRepairDepartment',
      label: '送修部门',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'sentBy',
      label: '送修人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'repairReason',
      label: '修复原因',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'sendRepairDate',
      label: '送修日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '工单状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },

    {
      prop: 'undertakingOrganization',
      label: '承担机构',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'repairPerson',
      label: '修复人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'qualificationCertificate',
      label: '资质证书',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true,
      slot: 'qualificationCertificate'
    },
    {
      prop: 'repairCompletionDate',
      label: '修完日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },

    {
      prop: 'repairStatusAndResults',
      label: '修复情况及结果',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },

    {
      prop: 'beforeRepairImage',
      label: '修复前图片',
      width: 100,
      align: 'center',
      slot: 'beforeRepairImage'
    },
    {
      prop: 'afterRepairImage',
      label: '修复后图片',
      width: 100,
      align: 'center',
      slot: 'afterRepairImage'
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

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getRepairList({
      ...where,
      ...orders,
      ...filters,
      status: where.status,
      collectionCode: where.collectionCode,
      collectionName: where.collectionName
    })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '修复记录数据',
    datasource: exportSource,
    beforeExport: (params) => {
      const { fileName, closeModal, bodyCols, bodyData, headerData } = params
      const workbook = getExportWorkbook(params)
      const sheet = workbook.getWorksheet('Sheet1')

      const getBuffer = async () => {
        // 添加单据图片
        const documentImageColIndex = bodyCols.findIndex((c) => c.dataKey === 'documentImage')
        if (sheet != null && documentImageColIndex !== -1) {
          const imageBuffers = await Promise.all(
            bodyData.map(async (row) => {
              const url = row[documentImageColIndex].text as string | undefined
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
                tl: { col: documentImageColIndex + 0.4, row: rowIndex + 0.2 },
                ext: { width: 48, height: 48 }
              })
              sheet.getCell(rowIndex + 1, documentImageColIndex + 1).value = ''
            }
            sheet.getRow(rowIndex + 1).height = 42
            sheet.getColumn(documentImageColIndex + 1).width = 8
          })
        }

        // 添加修复前图片
        const beforeRepairImageColIndex = bodyCols.findIndex(
          (c) => c.dataKey === 'beforeRepairImage'
        )
        if (sheet != null && beforeRepairImageColIndex !== -1) {
          const imageBuffers = await Promise.all(
            bodyData.map(async (row) => {
              const url = row[beforeRepairImageColIndex].text as string | undefined
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
                tl: { col: beforeRepairImageColIndex + 0.4, row: rowIndex + 0.2 },
                ext: { width: 48, height: 48 }
              })
              sheet.getCell(rowIndex + 1, beforeRepairImageColIndex + 1).value = ''
            }
            sheet.getRow(rowIndex + 1).height = 42
            sheet.getColumn(beforeRepairImageColIndex + 1).width = 8
          })
        }

        // 添加修复后图片
        const afterRepairImageColIndex = bodyCols.findIndex((c) => c.dataKey === 'afterRepairImage')
        if (sheet != null && afterRepairImageColIndex !== -1) {
          const imageBuffers = await Promise.all(
            bodyData.map(async (row) => {
              const url = row[afterRepairImageColIndex].text as string | undefined
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
                tl: { col: afterRepairImageColIndex + 0.4, row: rowIndex + 0.2 },
                ext: { width: 48, height: 48 }
              })
              sheet.getCell(rowIndex + 1, afterRepairImageColIndex + 1).value = ''
            }
            sheet.getRow(rowIndex + 1).height = 42
            sheet.getColumn(afterRepairImageColIndex + 1).width = 8
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

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: RepairQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理编辑完成
   */
  const handleEditDone = () => {
    reload()
    selections.value = []
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
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    current.value = selections.value[0]
    showUploadImage.value = true
  }

  /**
   * 处理导出
   */
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 处理行上传图片
   */
  const handleUploadImage = (row: Repair) => {
    current.value = row
    showUploadImage.value = true
  }

  /**
   * 处理查看详情
   */
  const handleViewDetails = async (row: Repair) => {
    try {
      current.value = row
      showDetails.value = true
    } catch (e: any) {
      EleMessage.error(e.message)
    }
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

  /**
   * 打开图片预览
   */
  const openPreview = (image: string) => {
    if (!image) return
    viewerImages.value = [image]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /**
   * 处理删除
   */
  const handleDelete = () => {
    if (selections.value.length === 0) {
      EleMessage.warning('请选择要删除的记录')
      return
    }
    // 确认删除
    ElMessageBox.confirm('确定要删除选中的记录吗？', '提示', {
      type: 'warning'
    })
      .then(() => {
        const ids = selections.value.map((item) => item.id)
        deleteRepair(ids)
          .then((msg) => {
            EleMessage.success(msg)
            reload()
            selections.value = []
          })
          .catch((e) => {
            EleMessage.error(e.message)
          })
      })
      .catch(() => {
        // 取消删除
      })
  }

  /**
   * 获取资质证书URL
   */
  const getCertificateUrl = (certificate: string): string => {
    try {
      const data = JSON.parse(certificate)
      return data?.url || ''
    } catch (e) {
      console.error('解析资质证书URL失败:', e)
      return ''
    }
  }

  /**
   * 获取资质证书名称
   */
  const getCertificateName = (certificate: string): string => {
    try {
      const data = JSON.parse(certificate)
      return data?.name || '未知文件'
    } catch (e) {
      console.error('解析资质证书名称失败:', e)
      return '未知文件'
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
