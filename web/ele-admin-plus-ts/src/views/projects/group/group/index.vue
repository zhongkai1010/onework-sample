<template>
  <ele-page hideFooter flex-table>
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
        cache-key="groupTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="CheckOutlined"
            @click="handleAudit"
            :disabled="!selections.length"
            >审核</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </el-space>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'warning'" effect="light">
            {{ row.status === 1 ? '已审核' : '未审核' }}
          </el-tag>
        </template>
      </ele-pro-table>

      <!-- 新增/编辑弹窗 -->
      <form-edit v-model="showForm" :id="currentId" @done="reload" />
    </ele-card>

    <!-- 参考按钮 -->
    <reference-button
      title="藏品组管理"
      :imageUrl="pageImage"
      searchText="藏品组名称 负责人 备注说明 排序 状态"
      operationText="新增 审核"
      tableFieldsText="藏品组名称 负责人 备注说明 排序 状态"
      tableOperationsText="编辑 删除"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import { PlusOutlined, CheckOutlined } from '@/components/icons'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { Group, GroupQueryParams } from '@/api/data/group/model'
  import { getGroupPage, removeGroups, approveGroups } from '@/api/data/group'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const currentId = ref<number>() // 当前编辑的藏品组ID
  const showForm = ref(false) // 是否显示表单弹窗
  const selections = ref<Group[]>([]) // 表格选中的行

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
      columnKey: 'index',
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'groupName',
      label: '藏品组名称',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'personInCharge',
      label: '负责人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'remarks',
      label: '备注说明',
      sortable: 'custom',
      width: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'sortOrder',
      label: '排序',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 220,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getGroupPage({
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
  const reload = (where?: GroupQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理新增
   */
  const handleAdd = () => {
    currentId.value = undefined
    showForm.value = true
  }

  /**
   * 处理编辑
   * @param row 藏品组数据
   */
  const handleEdit = (row: Group) => {
    currentId.value = row.id
    showForm.value = true
  }

  /**
   * 处理删除
   * @param row 藏品组数据
   */
  const handleDelete = (row: Group) => {
    ElMessageBox.confirm('确定要删除该藏品组吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        removeGroups({ ids: [row.id] })
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
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
   * 处理审核
   */
  const handleAudit = () => {
    if (!selections.value.length) {
      return
    }
    // 筛选出未审核的选项
    const unapprovedItems = selections.value.filter((item) => item.status === 0)
    if (!unapprovedItems.length) {
      EleMessage.warning('选中的藏品组都已审核')
      return
    }
    ElMessageBox.confirm(
      `确定要审核选中的 ${unapprovedItems.length} 个未审核藏品组吗？`,
      '系统提示',
      {
        type: 'warning',
        draggable: true
      }
    )
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        approveGroups({ ids: unapprovedItems.map((item) => item.id) })
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: GroupQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
