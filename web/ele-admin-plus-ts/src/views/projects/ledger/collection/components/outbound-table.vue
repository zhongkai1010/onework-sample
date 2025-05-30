<!-- 出库记录弹框表格 -->
<template>
  <ele-modal
    v-model="show"
    title="出库记录"
    width="1200px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <ele-pro-table :columns="columns" :datasource="datasource" class="outbound-table" />
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import { getCollectionOutboundList } from '@/api/collection/ledger'
  import dayjs from 'dayjs'

  const props = defineProps<{
    modelValue: boolean
    row: CollectionLedger | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
  }>()

  // 显示状态
  const show = ref(false)

  // 监听显示状态
  watch(
    () => props.modelValue,
    (val) => {
      show.value = val
    }
  )

  // 监听显示状态变化
  watch(show, (val) => {
    emit('update:modelValue', val)
    if (!val) {
      emit('close')
    }
  })

  // 格式化日期
  const formatDate = (date: string | number | Date | null | undefined) => {
    if (!date) return '-'
    return dayjs(date).format('YYYY-MM-DD')
  }

  const columns: Columns = [
    { prop: 'id', label: '编号', width: 80, align: 'center' },
    { prop: 'code', label: '出库单号', width: 180 },
    { prop: 'collectionCode', label: '藏品编号', width: 180 },
    { prop: 'collectionName', label: '藏品名称' },
    {
      prop: 'outboundDate',
      label: '出库日期',
      width: 120,
      align: 'center',
      formatter: (row) => formatDate(row.outboundDate)
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      width: 120,
      align: 'center',
      formatter: (row) => formatDate(row.storageDate)
    },
    {
      prop: 'status',
      label: '状态',
      width: 120,
      align: 'center',
      formatter: (row) => {
        const statusMap: Record<number, string> = {
          0: '未审核',
          1: '待出库',
          2: '已出库',
          3: '已归还'
        }
        return statusMap[row.status] || '其他'
      }
    }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getCollectionOutboundList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  const onClose = () => {
    show.value = false
  }
</script>

<style lang="scss" scoped>
  .outbound-table {
    :deep(.el-table) {
      min-height: 600px;
    }
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
