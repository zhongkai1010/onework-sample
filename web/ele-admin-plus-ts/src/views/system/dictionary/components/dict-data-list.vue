<template>
  <dict-data-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
  <ele-pro-table
    ref="tableRef"
    row-key="dictDataId"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    v-model:selections="selections"
    :highlight-current-row="true"
    :export-config="{ fileName: '字典数据', datasource: exportSource }"
    :print-config="{ datasource: exportSource }"
    :style="{ paddingBottom: '16px' }"
    cache-key="systemDictDataTable"
  >
    <template #toolbar>
      <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="openEdit()"> 新建 </el-button>
      <el-button type="danger" class="ele-btn-icon" :icon="DeleteOutlined" @click="remove()"> 删除 </el-button>
    </template>
    <template #action="{ row }">
      <el-link type="primary" :underline="false" @click="openEdit(row)"> 修改 </el-link>
      <el-divider direction="vertical" />
      <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
    </template>
  </ele-pro-table>
  <dict-data-edit v-model="showEdit" :data="current" :dict-id="dictId" @done="reload" />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined } from '@/components/icons'
  import DictDataSearch from './dict-data-search.vue'
  import DictDataEdit from './dict-data-edit.vue'
  import { pageDictionaryData, removeDictionaryDataBatch, listDictionaryData } from '@/api/system/dictionary-data'
  import type { DictionaryData, DictionaryDataParam } from '@/api/system/dictionary-data/model'

  const props = defineProps<{
    /** 字典id */
    dictId: number
  }>()

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof DictDataSearch> | null>(null)

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

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
      prop: 'dictDataName',
      label: '字典数据名',
      sortable: 'custom',
      minWidth: 120
    },
    {
      prop: 'dictDataCode',
      label: '字典数据值',
      sortable: 'custom',
      minWidth: 120
    },
    {
      prop: 'sortNumber',
      label: '排序号',
      sortable: 'custom',
      width: 100,
      align: 'center'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      sortable: 'custom',
      width: 180,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 130,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ])

  /** 表格选中数据 */
  const selections = ref<DictionaryData[]>([])

  /** 当前编辑数据 */
  const current = ref<DictionaryData | null>(null)

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false)

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageDictionaryData({
      ...where,
      ...orders,
      ...pages,
      dictId: props.dictId
    })
  }

  /** 刷新表格 */
  const reload = (where?: DictionaryDataParam) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /** 打开编辑弹窗 */
  const openEdit = (row?: DictionaryData) => {
    current.value = row ?? null
    showEdit.value = true
  }

  /** 删除 */
  const remove = (row?: DictionaryData) => {
    const rows = row == null ? selections.value : [row]
    if (!rows.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    ElMessageBox.confirm('确定要删除“' + rows.map((d) => d.dictDataName).join(', ') + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        removeDictionaryDataBatch(rows.map((d) => d.dictDataId))
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

  // 监听字典id变化
  watch(
    () => props.dictId,
    () => {
      searchRef.value?.resetFields?.()
      reload({})
    }
  )

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return listDictionaryData({
      ...where,
      ...orders,
      dictId: props.dictId
    })
  }
</script>
