<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      <!---搜索条件--->
      <search-form @search="handleSearch" />
      <!---表格--->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="warehouseTable"
        :pagination="false"
        :tools="['reload', 'size', 'columns', 'maximized']"
      >
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()">
            新建展区
          </el-button>
          <el-button class="ele-btn-icon" :icon="ColumnHeightOutlined" @click="expandAll">
            展开全部
          </el-button>
          <el-button class="ele-btn-icon" :icon="VerticalAlignMiddleOutlined" @click="foldAll">
            折叠全部
          </el-button>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            :disabled="!selections.length"
            @click="batchRemove"
          >
            删除展区
          </el-button>
        </template>
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="info" size="small" @click="openEdit(undefined, row.id)"
              >添加</el-button
            >
            <el-button type="primary" size="small" @click="openEdit(row)">修改</el-button>
            <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>
    <form-edit
      v-model="showEdit"
      :data="current"
      @done="reload"
      :parent-id="parentId"
      :select-data="treeData"
    />
    <!-- 参考按钮 -->
    <reference-button
      title="展区管理"
      :imageUrl="pageImage"
      searchText="展区名称 拼音 备注"
      operationText="新建展区 展开全部 折叠全部 删除展区"
      tableFieldsText="展区名称 拼音 备注"
      tableOperationsText="添加 修改 删除"
    />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { toTree, EleMessage } from 'ele-admin-plus/es'
  import { ElMessageBox } from 'element-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    PlusOutlined,
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
    DeleteOutlined
  } from '@/components/icons'
  import { getWarehouseTree, deleteWarehouse } from '@/api/inventory/warehouse'
  import type { Warehouse, WarehouseQueryParams } from '@/api/inventory/warehouse/model'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import FormEdit from './components/form-edit.vue'
  import SearchForm from './components/search-form.vue'

  defineOptions({ name: 'Warehouse' })

  /** 当前编辑数据 */
  const current = ref<Warehouse | undefined>()

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false)

  /** 表格选中数据 */
  const selections = ref<Warehouse[]>([])

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

  /** 表格数据 */
  const treeData = ref<Warehouse[]>([])

  /** 上级展区id */
  const parentId = ref<number>()

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },

    {
      prop: 'name',
      label: '展区名称',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'pingying',
      label: '拼音',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'remark',
      label: '备注',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 220,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ])

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ where, orders }) => {
    const data = await getWarehouseTree({
      ...where,
      ...orders,
      type: 2
    })
    treeData.value = toTree({
      data,
      idField: 'id',
      parentIdField: 'parentId'
    })
    return treeData.value
  }

  /** 打开编辑弹窗 */
  const openEdit = (row?: Warehouse, id?: number) => {
    current.value = row
    parentId.value = id
    showEdit.value = true
  }

  /** 刷新表格 */
  const reload = (where?: WarehouseQueryParams) => {
    tableRef.value?.reload?.({ where })
  }

  /** 搜索 */
  const handleSearch = (where?: WarehouseQueryParams) => {
    tableRef.value?.reload?.({ where })
  }

  /** 删除单个 */
  const remove = (row: Warehouse) => {
    if (row.children?.length) {
      EleMessage.error('请先删除子展区')
      return
    }
    ElMessageBox.confirm('确定要删除"' + row.name + '"吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteWarehouse({ id: row.id })
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

  /** 展开全部 */
  const expandAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(true)
  }

  /** 折叠全部 */
  const foldAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(false)
  }

  /** 批量删除 */
  const batchRemove = () => {
    if (!selections.value.length) {
      EleMessage.warning('请选择要删除的展区')
      return
    }

    // 检查是否有未选中的子展区
    const hasUnselectedChildren = selections.value.some((item) => {
      if (!item.children?.length) return false
      // 检查所有子展区是否都被选中
      return !item.children.every((child) =>
        selections.value.some((selected) => selected.id === child.id)
      )
    })

    if (hasUnselectedChildren) {
      EleMessage.error('请先删除子展区或同时选中子展区')
      return
    }

    ElMessageBox.confirm('确定要删除选中的展区吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteWarehouse({ id: selections.value[0].id })
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
</script>

<style lang="scss" scoped></style>
