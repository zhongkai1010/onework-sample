<template>
  <ele-modal
    v-model="visible"
    title="出库单详情"
    width="1200px"
    :destroy-on-close="true"
    @closed="reset"
    :style="{ height: '80vh' }"
  >
    <div class="details-container">
      <div class="details-header">
        <div class="details-header-item">
          <span class="details-header-label">出库单号：</span>
          <span class="details-header-value">{{ data?.code }}</span>
        </div>
        <div class="details-header-item">
          <span class="details-header-label">提借类型：</span>
          <span class="details-header-value">{{ data?.borrowType }}</span>
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
          <span class="details-header-label">提借部门：</span>
          <span class="details-header-value">{{ data?.borrowDepartment }}</span>
        </div>
        <div class="details-header-item">
          <span class="details-header-label">提借人：</span>
          <span class="details-header-value">{{ data?.borrower }}</span>
        </div>
        <div class="details-header-item">
          <span class="details-header-label">出库日期：</span>
          <span class="details-header-value">{{
            data?.outboundDate ? dayjs(data.outboundDate).format('YYYY-MM-DD') : '-'
          }}</span>
        </div>
        <div class="details-header-item">
          <span class="details-header-label">拟归日期：</span>
          <span class="details-header-value">{{
            data?.proposedReturnDate ? dayjs(data.proposedReturnDate).format('YYYY-MM-DD') : '-'
          }}</span>
        </div>
      </div>

      <!-- 搜索表单 -->
      <el-form
        :model="queryParams"
        @keyup.enter="handleQuery"
        @submit.prevent
        :inline="true"
        class="details-filter"
      >
        <el-form-item label="藏品编号" prop="collectionCode">
          <el-input
            v-model="queryParams.collectionCode"
            placeholder="请输入藏品编号"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="藏品名称" prop="collectionName">
          <el-input
            v-model="queryParams.collectionName"
            placeholder="请输入藏品名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        :tools="false"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        class="details-table"
        :stripe="true"
        v-loading="loading"
      >
        <!-- 藏品状态列 -->
        <template #status="{ row }">
          <el-tag :type="getCollectionStatusType(row.status)" effect="light">
            {{ getCollectionStatusText(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
    </div>

    <template #footer>
      <el-button @click="handleCancel">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type { Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { OutboundDetailInfo } from '@/api/inventory/outbound/model'
  import { getOutboundDetails } from '@/api/inventory/outbound'
  import { ElMessage } from 'element-plus'
  import dayjs from 'dayjs'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 当前数据 */
  const data = ref<OutboundDetailInfo>()

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 加载状态
  const loading = ref(false)

  /** 查询参数 */
  const queryParams = ref({
    collectionCode: '',
    collectionName: ''
  })

  // 表格列配置
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'code',
      label: '出库单号',

      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
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
      prop: 'outboundDate',
      label: '出库日期',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => {
        return row.outboundDate ? dayjs(row.outboundDate).format('YYYY-MM-DD') : '-'
      }
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => {
        return row.storageDate ? dayjs(row.storageDate).format('YYYY-MM-DD') : '-'
      }
    },
    {
      prop: 'status',
      label: '状态',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource = computed(() => {
    return async ({ pages }) => {
      if (!data.value?.collections) {
        return { count: 0, list: [] }
      }

      let list = [...data.value.collections]

      // 根据查询条件过滤
      if (queryParams.value.collectionCode) {
        list = list.filter((item) =>
          item.collectionCode?.includes(queryParams.value.collectionCode)
        )
      }
      if (queryParams.value.collectionName) {
        list = list.filter((item) =>
          item.collectionName?.includes(queryParams.value.collectionName)
        )
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
        return 'warning'
      case 2:
        return 'success'
      case 3:
        return 'primary'
      default:
        return 'info'
    }
  }

  /** 获取单据状态文本 */
  const getStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '未审核'
      case 1:
        return '待出库'
      case 2:
        return '已出库'
      case 3:
        return '已归还'
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
        return 'warning'
      case 2:
        return 'success'
      case 3:
        return 'primary'
      default:
        return 'info'
    }
  }

  /** 获取藏品状态文本 */
  const getCollectionStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '未审核'
      case 1:
        return '待出库'
      case 2:
        return '已出库'
      case 3:
        return '已归还'
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
      ElMessage.error('出库单ID不能为空')
      return
    }
    visible.value = true
    loading.value = true
    try {
      const orderDetail = await getOutboundDetails({ id })
      data.value = orderDetail
      tableRef.value?.reload?.({ page: 1 })
    } catch (e: any) {
      ElMessage.error(e.message || '获取出库单详情失败')
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
  .details-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .details-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 4px;
    padding: 12px;
    background-color: var(--el-fill-color-light);
    border-radius: 4px;
    flex-shrink: 0;

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
    flex-shrink: 0;
  }

  .details-table {
    flex: 1;
    overflow: auto;
    margin: 0 -20px;
    padding: 0 20px;
  }

  :deep(.ele-pro-table) {
    .el-table {
      height: 100%;
      .el-table__body-wrapper {
        height: calc(100% - 40px);
        .el-table__row {
          td {
            padding: 8px 0;
          }
        }
      }
    }
  }
</style>
