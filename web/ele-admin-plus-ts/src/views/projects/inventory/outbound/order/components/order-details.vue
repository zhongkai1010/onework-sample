<template>
  <ele-modal v-model="visible" title="出库单详情" width="1200px" :destroy-on-close="true">
    <ele-pro-table
      ref="tableRef"
      :columns="columns"
      :datasource="datasource"
      :loading="loading"
      row-key="id"
    >
      <template #toolbar>
        <el-button type="primary" @click="handlePrint">单据打印</el-button>
      </template>
    </ele-pro-table>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getOutboundDetails } from '@/api/inventory/outbound'
  import { ElMessage } from 'element-plus'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 加载状态
  const loading = ref(false)

  // 当前出库单ID
  const currentId = ref<string>()

  // 表格列配置
  const columns = ref<Columns>([
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
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      minWidth: 200,
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
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      formatter: (row) => {
        const statusMap = {
          0: '未审核',
          1: '待出库',
          2: '已出库',
          3: '已归还'
        }
        return statusMap[row.status as keyof typeof statusMap]
      }
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = async ({ pages, where, orders }) => {
    if (!currentId.value) {
      return { list: [] }
    }
    try {
      const res = await getOutboundDetails({
        id: currentId.value,
        ...pages,
        ...where,
        ...orders
      })
      return {
        list: res.collections
      }
    } catch (error: any) {
      ElMessage.error(error.message || '获取详情失败')
      return { list: [] }
    }
  }

  // 设置出库单ID
  const setOutboundId = (id: string) => {
    currentId.value = id
    visible.value = true
    tableRef.value?.reload()
  }

  // 处理打印
  const handlePrint = () => {
    // TODO: 实现打印功能
    console.log('打印出库单:', currentId.value)
  }

  defineExpose({
    setOutboundId
  })
</script>

<style lang="scss" scoped></style>
