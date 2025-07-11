<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      <ele-pro-table
        :columns="columns"
        :datasource="datasource"
        row-key="groupName"
        border
        :pagination="false"
        style="width: 100%"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { groupIdStatistics } from '@/api/collection/ledger'
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types'

  const columns: Columns = [
    { prop: 'groupName', label: '藏品分类', align: 'center' },
    { prop: 'status0', label: '总库存', align: 'center' },
    { prop: 'status1', label: '入库中', align: 'center' },
    { prop: 'status2', label: '已入库', align: 'center' },
    { prop: 'status3', label: '出库中', align: 'center' },
    { prop: 'status4', label: '已出库', align: 'center' },
    { prop: 'status5', label: '销毁中', align: 'center' },
    { prop: 'status6', label: '已销毁', align: 'center' },
    { prop: 'status7', label: '剩余库存', align: 'center' }
  ]

  const datasource: DatasourceFunction = async () => {
    return groupIdStatistics()
  }
</script>

<style lang="scss" scoped></style>
