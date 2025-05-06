<template>
  <ele-modal v-model="visible" title="调拨单详情" width="1000px" :destroy-on-close="true" @closed="reset">
    <div class="details-header">
      <div class="details-header-item">
        <span class="details-header-label">调拨单号：</span>
        <span class="details-header-value">{{ data?.code }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">单据状态：</span>
        <el-tag :type="getStatusType(Number(data?.status))">
          {{ getStatusText(Number(data?.status)) }}
        </el-tag>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">调拨日期：</span>
        <span class="details-header-value">{{ data?.transferDate }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">调拨仓库：</span>
        <span class="details-header-value">{{ data?.warehouseName }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">接收人：</span>
        <span class="details-header-value">{{ data?.receiver }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">调拨原因：</span>
        <span class="details-header-value">{{ data?.transferReason }}</span>
      </div>
      <div class="details-header-item">
        <span class="details-header-label">备注：</span>
        <span class="details-header-value">{{ data?.remarks }}</span>
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
      <!-- 状态列 -->
      <template #status="{ row }">
        <el-tag :type="getStatusType(row.status)" effect="light">
          {{ getStatusText(row.status) }}
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
  import type { TransferDetailInfo } from '@/api/inventory/transfer/model'
  import { getTransferDetails } from '@/api/inventory/transfer'
  import { ElMessage } from 'element-plus'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 当前数据 */
  const data = ref<TransferDetailInfo>()

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
      prop: 'originalWarehouse',
      label: '原仓库',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'currentWarehouse',
      label: '现仓库',
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

  /** 获取状态类型 */
  const getStatusType = (status?: number) => {
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

  /** 获取状态文本 */
  const getStatusText = (status?: number) => {
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

  /** 查询 */
  const handleQuery = () => {
    tableRef.value?.reload()
  }

  /** 重置 */
  const handleReset = () => {
    queryParams.value = {
      collectionCode: '',
      collectionName: ''
    }
    handleQuery()
  }

  /** 关闭 */
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

  /** 打开详情 */
  const open = async (id: number) => {
    try {
      loading.value = true
      const res = await getTransferDetails({ id })
      data.value = res
    } catch (error) {
      console.error('获取详情失败:', error)
      ElMessage.error('获取详情失败')
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
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    padding: 16px;
    background-color: var(--el-fill-color-light);
    border-radius: 4px;

    .details-header-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      margin-bottom: 8px;

      .details-header-label {
        color: var(--el-text-color-secondary);
        margin-right: 8px;
      }

      .details-header-value {
        color: var(--el-text-color-primary);
      }
    }
  }

  .details-filter {
    margin-bottom: 16px;
  }
</style>
