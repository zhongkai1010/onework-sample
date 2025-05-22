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
        cache-key="branchTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >登记分馆</el-button
          >
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="handleToolbarDelete"
            :disabled="!selections.length"
            >删除</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleRowDelete(row)">删除分馆</el-button>
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 编辑对话框 -->
      <form-edit v-model:visible="showEdit" :type="dialogType" :data="current" @done="handleDone" />

      <!-- 参考按钮 -->
      <reference-button
        title="分馆管理"
        :imageUrl="pageImage"
        searchText="分馆名称"
        operationText="登记分馆 删除"
        tableFieldsText="编号 分馆名称 启动自动编号 自动编号前缀 自动编号长度 初始编号值 操作"
        tableOperationsText="编辑 删除分馆"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined } from '@/components/icons'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import { getBranchPage, deleteBranch } from '@/api/data/branch'
  import type { BranchInfo, BranchQueryParams } from '@/api/data/branch/model'
  import { EleMessage } from 'ele-admin-plus/es'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<BranchInfo | undefined>(undefined)
  const showEdit = ref(false)
  const dialogType = ref<'add' | 'edit'>('add')
  const selections = ref<BranchInfo[]>([])

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
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '分馆名称',
      sortable: 'custom',

      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '启动自动编号',
      width: 120,
      align: 'center',
      formatter: (row: BranchInfo) => (row.status === '1' ? '是' : '否')
    },
    {
      prop: 'numberPrefix',
      label: '自动编号前缀',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'numberLength',
      label: '自动编号长度',
      width: 120,
      align: 'center'
    },
    {
      prop: 'numberPrice',
      label: '初始编号值',
      width: 120,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 200,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = async ({ pages, where, orders }) => {
    return await getBranchPage({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 表格操作 ==================== */
  const reload = (params?: BranchQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where: params })
  }

  const handleAdd = () => {
    dialogType.value = 'add'
    current.value = undefined
    showEdit.value = true
  }

  const handleEdit = (row: BranchInfo) => {
    dialogType.value = 'edit'
    current.value = row
    showEdit.value = true
  }

  const handleToolbarDelete = () => {
    if (!selections.value.length) return
    handleDelete()
  }

  const handleRowDelete = (row: BranchInfo) => {
    handleDelete(row)
  }

  const handleDelete = (row?: BranchInfo) => {
    const ids = row ? [row.id] : selections.value.map((item) => item.id)
    if (!ids.length) return

    ElMessageBox.confirm('确定要删除选中的分馆吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(async () => {
        try {
          await deleteBranch({ ids })
          EleMessage.success('删除成功')
          reload()
        } catch (error: any) {
          EleMessage.error(error.message || '删除失败')
        }
      })
      .catch(() => {})
  }

  const handleDone = () => {
    showEdit.value = false
    reload()
  }

  const handleRowClick = (row: BranchInfo) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
  }
</script>

<style lang="scss" scoped></style>
