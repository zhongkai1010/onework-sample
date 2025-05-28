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
        cache-key="inventoryCheckTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd">
            添加
          </el-button>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleRemove()"
            :disabled="selections.length !== 1 || selections[0].status !== 0"
          >
            删除
          </el-button>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag
            :type="row.status === 0 ? 'info' : row.status === 1 ? 'warning' : 'success'"
            effect="light"
          >
            {{ row.status === 0 ? '待启动' : row.status === 1 ? '已开始' : '已结束' }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <template v-if="row.status === 0">
              <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button type="success" size="small" @click="handleStart(row)">开始盘点</el-button>
              <el-button type="danger" size="small" @click="() => handleRemove([row])"
                >删除</el-button
              >
            </template>
            <template v-if="row.status === 1">
              <el-button type="warning" size="small" @click="handleFinish(row)">结束盘点</el-button>
            </template>
            <el-button type="info" size="small" @click="handleCollections(row)">盘点清单</el-button>
          </el-space>
        </template>
      </ele-pro-table>
      <!-- 编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />
      <!-- 盘点清单弹窗 -->
      <list-modal v-model="showList" :plan-id="current?.id?.toString()" />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined } from '@/components/icons'
  import type {
    InventoryCheckPlan,
    GetInventoryCheckPlanListParams
  } from '@/api/inventory-check/plan/model/index'
  import {
    getInventoryCheckPlanList,
    deleteInventoryCheckPlan,
    startInventoryCheck,
    finishInventoryCheck
  } from '@/api/inventory-check/plan'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ListModal from './components/list-modal.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<InventoryCheckPlan | undefined>(undefined) // 当前编辑的盘点计划
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showList = ref(false) // 是否显示盘点清单弹窗
  const selections = ref<InventoryCheckPlan[]>([]) // 表格选中的行

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
      prop: 'id',
      width: 80,
      align: 'center',
      label: '编号',
      fixed: 'left'
    },
    {
      prop: 'inventoryTitle',
      label: '盘点标题',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'startTime',
      label: '盘点开始时间',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'endTime',
      label: '盘点结束时间',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'inventoryPurpose',
      label: '盘点目的',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'planner',
      label: '盘点计划人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'executor',
      label: '盘点执行人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'storageLocation',
      label: '存放地点',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'categories',
      label: '类别',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'acceptanceDate',
      label: '验收日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      width: 100,
      align: 'center',
      slot: 'status'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 320,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getInventoryCheckPlanList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: GetInventoryCheckPlanListParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加盘点计划
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑盘点计划
   * @param row 盘点计划数据
   */
  const handleEdit = (row: InventoryCheckPlan) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理开始盘点
   * @param row 盘点计划数据
   */
  const handleStart = (row: InventoryCheckPlan) => {
    ElMessageBox.confirm('确定要开始盘点吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        startInventoryCheck({ id: row.id })
          .then(() => {
            loading.close()
            EleMessage.success('开始盘点成功')
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
   * 处理结束盘点
   * @param row 盘点计划数据
   */
  const handleFinish = (row: InventoryCheckPlan) => {
    ElMessageBox.confirm('确定要结束盘点吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        finishInventoryCheck({ id: row.id })
          .then(() => {
            loading.close()
            EleMessage.success('结束盘点成功')
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
   * 处理查看盘点清单
   * @param row 盘点计划数据
   */
  const handleCollections = (row: InventoryCheckPlan) => {
    current.value = row
    showList.value = true
  }

  /**
   * 处理删除盘点计划
   * @param rows 要删除的盘点计划数据，不传则删除选中的盘点计划
   */
  const handleRemove = (rows?: InventoryCheckPlan[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的盘点计划吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteInventoryCheckPlan({ ids: data.map((d) => d.id) })
          .then(() => {
            loading.close()
            EleMessage.success('删除成功')
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
   * 处理行点击
   * @param row 行数据
   */
  const handleRowClick = (row: InventoryCheckPlan) => {
    // 触发表格的 selection-change 事件
    tableRef.value?.toggleRowSelection(row)
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: GetInventoryCheckPlanListParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
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
