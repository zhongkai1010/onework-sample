<template>
  <ele-modal
    v-model="visible"
    title="盘点清单"
    width="1000px"
    :destroy-on-close="true"
    @open="handleOpen"
  >
    <ele-pro-table
      ref="tableRef"
      row-key="id"
      :columns="columns"
      :datasource="datasource"
      :show-overflow-tooltip="true"
      :style="{ paddingBottom: '16px' }"
      :tools="['reload', 'size', 'columns', 'maximized']"
      :stripe="true"
    >
      <!-- 状态列 -->
      <template #status="{ row }">
        <el-tag
          :type="
            row.satus === 0
              ? 'info'
              : row.satus === 1
                ? 'success'
                : row.satus === 2
                  ? 'danger'
                  : 'warning'
          "
          effect="light"
        >
          {{
            row.satus === 0
              ? '未盘'
              : row.satus === 1
                ? '已盘到'
                : row.satus === 2
                  ? '已盘亏'
                  : '已盘盈'
          }}
        </el-tag>
      </template>
    </ele-pro-table>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getInventoryPlanDetails } from '@/api/inventory-check/plan'

  const props = defineProps<{
    /** 盘点计划ID */
    planId?: string
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      prop: 'id',
      width: 80,
      align: 'center',
      label: '编号',
      fixed: 'left'
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      minWidth: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '类别',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '仓库',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      sortable: 'custom',

      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '材质',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 100,
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
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '保存状况',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'satus',
      label: '状态',
      width: 100,
      align: 'center',
      slot: 'status'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = async () => {
    if (!props.planId) {
      return {
        list: [],
        total: 0
      }
    }
    try {
      const data = await getInventoryPlanDetails(props.planId)
      return {
        list: data || [],
        total: data?.length || 0
      }
    } catch (error) {
      console.error('获取盘点清单失败:', error)
      return {
        list: [],
        total: 0
      }
    }
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    tableRef.value?.reload?.()
  }
</script>

<style lang="scss" scoped></style>
