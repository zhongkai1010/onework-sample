<template>
  <search-form @search="reload" ref="searchFormRef" style="margin-bottom: -14px" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    :highlight-current-row="true"
    :style="{ paddingBottom: '16px' }"
    cache-key="inventoryCheckTable"
    :tools="['reload', 'size', 'columns', 'maximized']"
    :stripe="true"
    v-model:selections="selections"
    @row-click="handleRowClick"
    :pagination="false"
  >
    <template #toolbar>
      <el-button
        type="primary"
        class="ele-btn-icon"
        :icon="PlusOutlined"
        @click="handleConfirm"
        :disabled="!selections.length"
      >
        确认盘点
      </el-button>
      <el-button
        type="success"
        class="ele-btn-icon"
        :icon="PlusOutlined"
        @click="handleRegisterSurplus"
      >
        登记盘盈
      </el-button>
    </template>
    <template #status="{ row }">
      <el-tag :type="getStatusType(row.status)" effect="light">
        {{ getStatusText(row.status) }}
      </el-tag>
    </template>
    <template #imageInfo="{ row }">
      <img
        v-if="row.imageInfo"
        :src="row.imageInfo"
        style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
        @click.stop="openPreview(row.imageInfo)"
      />
      <div v-else>暂无数据</div>
    </template>
    <template #operation="{ row }">
      <el-space :size="4">
        <el-button type="warning" @click.stop="handleConfirmStatus(row)" size="small"
          >确认盘点</el-button
        >
      </el-space>
    </template>
  </ele-pro-table>

  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />

  <!-- 确认盘点弹窗 -->
  <confirm-modal v-model="showConfirmModal" :selections="selections" @done="reload" />

  <!-- 登记盘盈弹窗 -->
  <form-edit v-model="showFormEdit" :plan-id="planId" @done="reload" />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getInventoryCheckCollectionPage } from '@/api/inventory-check/check'
  import type { InventoryCheckCollection } from '@/api/inventory-check/check/model'
  import { PlusOutlined } from '@/components/icons'
  import SearchForm from './search-form.vue'
  import ConfirmModal from './confirm-modal.vue'
  import FormEdit from './form-edit.vue'
  import { EleMessage } from 'ele-admin-plus/es'

  /* Props 定义 */
  const props = defineProps<{
    /** 计划ID */
    planId: string
  }>()

  /* 组件引用 */
  const searchFormRef = ref<InstanceType<typeof SearchForm>>()
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* 状态管理 */
  const selections = ref<InventoryCheckCollection[]>([])
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)
  const showConfirmModal = ref(false)
  const showFormEdit = ref(false)

  /* 表格列配置 */
  const columns: Columns = [
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 180,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      width: 180,
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '存放位置',
      sortable: 'custom',
      width: 120,
      align: 'left',
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
      prop: 'era',
      label: '年代',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'materialType',
      label: '实际质地',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 80,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 80,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '完残状况',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'level',
      label: '文物级别',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'source',
      label: '藏品来源',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'acquisitionDateRange',
      label: '入藏日期范围',
      sortable: 'custom',
      width: 180,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'acquisitionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注',
      sortable: 'custom',
      width: 150,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'imageInfo'
    },
    {
      columnKey: 'operation',
      label: '操作',
      width: 100,
      align: 'center',
      slot: 'operation',
      fixed: 'right'
    }
  ]

  /* 数据源 */
  const datasource: DatasourceFunction = ({ where, orders }) => {
    return getInventoryCheckCollectionPage({
      ...where,
      ...orders,
      planId: props.planId === '0' ? undefined : Number(props.planId)
    })
  }

  /* 表格操作 */
  /** 重新加载数据 */
  const reload = (where?: Record<string, any>) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /** 处理行点击 */
  const handleRowClick = (row: InventoryCheckCollection) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
    // 同步表格选中状态
    tableRef.value?.toggleRowSelection(row, index === -1)
  }

  /** 处理登记盘盈 */
  const handleRegisterSurplus = () => {
    showFormEdit.value = true
  }

  /** 处理确认状态 */
  const handleConfirmStatus = (row: InventoryCheckCollection) => {
    // 设置选中行
    selections.value = [row]
    // 同步表格选中状态
    tableRef.value?.clearSelection()
    tableRef.value?.toggleRowSelection(row, true)
    // 显示确认弹窗
    showConfirmModal.value = true
  }

  /** 处理确认盘点 */
  const handleConfirm = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    showConfirmModal.value = true
  }

  /** 重置 */
  const reset = () => {
    searchFormRef.value?.resetFields()
    reload()
  }

  /* 监听器 */
  watch(
    () => props.planId,
    () => {
      searchFormRef.value?.resetFields()
      reload()
    }
  )

  /**
   * 获取状态类型
   */
  const getStatusType = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' => {
    const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      '0': 'danger', // 未盘点
      '1': 'success', // 已盘点
      '2': 'warning', // 已盘亏
      '3': 'info' // 已盘盈
    }
    return statusMap[status] || 'primary'
  }

  /**
   * 获取状态文本
   */
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      '0': '未盘点',
      '1': '已盘点',
      '2': '已盘亏',
      '3': '已盘盈'
    }
    return statusMap[status] || '其他'
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

  /* 暴露方法给父组件 */
  defineExpose({
    search: reload,
    reset
  })
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }
</style>
