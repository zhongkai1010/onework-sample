<template>
  <ele-modal v-model="visible" title="入库单详情" width="1000px" :destroy-on-close="true" @closed="reset">
    <div class="details-header">
      <div class="details-header-item">
        <span class="details-header-label">入库单号：</span>
        <span class="details-header-value">{{ data?.code }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">入库类型：</span>
        <el-tag :type="data?.type === 1 ? 'success' : 'warning'">
          {{ data?.type === 1 ? '初次入库' : '归还入库' }}
        </el-tag>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">单据状态：</span>
        <el-tag :type="getStatusType(data?.status)">
          {{ getStatusText(data?.status) }}
        </el-tag>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">经办人：</span>
        <span class="details-header-value">{{ data?.operator }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">接收库房：</span>
        <span class="details-header-value">{{ data?.warehouseName }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">入库日期：</span>
        <span class="details-header-value">{{ data?.storageDate }}</span>
      </div>
    </div>

    <!-- 搜索表单 -->
    <el-form :model="queryParams" @keyup.enter="handleQuery" @submit.prevent :inline="true" class="details-filter">
      <el-form-item label="藏品编号" prop="collectionCode">
        <el-input v-model="queryParams.collectionCode" placeholder="请输入藏品编号" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="藏品名称" prop="collectionName">
        <el-input v-model="queryParams.collectionName" placeholder="请输入藏品名称" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <ele-pro-table ref="tableRef" :tools="false" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :highlight-current-row="true" :style="{ paddingBottom: '16px' }" :stripe="true" v-loading="loading">
      <!-- 藏品状态列 -->
      <template #collectionStatus="{ row }">
        <el-tag :type="getCollectionStatusType(row.collectionStatus)" effect="light">
          {{ getCollectionStatusText(row.collectionStatus) }}
        </el-tag>
      </template>
    </ele-pro-table>

    <template #footer>
      <el-button @click="handleCancel">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { InboundOrderDetail } from '@/api/inventory/inbound/model'
  import { getInboundDetails } from '@/api/inventory/inbound'
  import { ElMessage } from 'element-plus'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 当前数据 */
  const data = ref<InboundOrderDetail>()

  /** 加载状态 */
  const loading = ref(false)

  /** 表格引用 */
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /** 查询参数 */
  const queryParams = ref({
    collectionCode: '',
    collectionName: ''
  })

  /** 表格列配置 */
  const columns = ref([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'code',
      label: '入库单号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '库房名称',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    }
  ])

  /** 数据源 */
  const datasource = computed(() => {
    return async ({ pages }) => {
      if (!data.value?.collections) {
        return { count: 0, list: [] }
      }

      let list = [...data.value.collections]

      // 根据查询条件过滤
      if (queryParams.value.collectionCode) {
        list = list.filter((item) => item.collectionCode?.includes(queryParams.value.collectionCode))
      }
      if (queryParams.value.collectionName) {
        list = list.filter((item) => item.collectionName?.includes(queryParams.value.collectionName))
      }

      // 分页处理
      const { page = 1, limit = 10 } = pages || {}
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedList = list.slice(start, end)

      return {
        count: list.length,
        list: paginatedList
      }
    }
  })

  /** 获取单据状态类型 */
  const getStatusType = (status?: number) => {
    switch (status) {
      case 0:
        return 'info'
      case 1:
        return 'success'
      case 2:
        return 'warning'
      default:
        return 'info'
    }
  }

  /** 获取单据状态文本 */
  const getStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已入库'
      default:
        return '未知'
    }
  }

  /** 获取藏品状态类型 */
  const getCollectionStatusType = (status?: number) => {
    switch (status) {
      case 0:
        return 'info'
      case 1:
        return 'success'
      case 2:
        return 'warning'
      default:
        return 'info'
    }
  }

  /** 获取藏品状态文本 */
  const getCollectionStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已入库'
      default:
        return '未知'
    }
  }

  /** 查询按钮操作 */
  const handleQuery = () => {
    tableRef.value?.reload?.({ page: 1 })
  }

  /** 重置按钮操作 */
  const handleReset = () => {
    queryParams.value = {
      collectionCode: '',
      collectionName: ''
    }
    tableRef.value?.reload?.({ page: 1 })
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 重置数据 */
  const reset = () => {
    data.value = undefined
    queryParams.value = {
      collectionCode: '',
      collectionName: ''
    }
  }

  /** 打开弹窗 */
  const open = async (id: number) => {
    if (!id) {
      ElMessage.error('入库单ID不能为空')
      return
    }
    visible.value = true
    loading.value = true
    try {
      const orderDetail = await getInboundDetails({ id })
      data.value = orderDetail
      tableRef.value?.reload?.({ page: 1 })
    } catch (e: any) {
      ElMessage.error(e.message || '获取入库单详情失败')
      visible.value = false
    } finally {
      loading.value = false
    }
  }

  defineExpose({
    open
  })
</script>

<style lang="scss" scoped>
  .details-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 4px;
    padding: 12px;
    background-color: var(--el-fill-color-light);
    border-radius: 4px;

    &-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-label {
      color: var(--el-text-color-secondary);
      min-width: 80px;
    }

    &-value {
      color: var(--el-text-color-primary);
    }
  }

  .details-filter {
    margin-bottom: 0;
    padding: 4px 0;
  }

  :deep(.ele-pro-table) {
    .el-table {
      .el-table__body-wrapper {
        .el-table__row {
          td {
            padding: 8px 0;
          }
        }
      }
    }
  }
</style>
