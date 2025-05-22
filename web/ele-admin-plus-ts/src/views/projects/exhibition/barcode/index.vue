<template>
  <ele-page hideFooter flex-table>
    <ele-card flexTable>
      <!-- 搜索表单 -->
      <search-form @search="handleSearch" />
      <!-- 表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="barcodeTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        v-model:selections="selectedRows"
        :stripe="true"
        :row-selection="true"
      >
        <template #toolbar>
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="PrinterOutlined"
            :disabled="!selectedRows.length"
            @click="handlePrint"
            >标签打印</el-button
          >
        </template>
      </ele-pro-table>
      <!-- 参考按钮 -->
      <reference-button
        title="地址码管理"
        :imageUrl="pageImage"
        searchText="地址信息 地址码"
        operationText="标签打印"
        tableFieldsText="地址信息 地址码"
      />
    </ele-card>
    <!-- 打印标签弹窗 -->
    <print-label v-model="printVisible" :selected-rows="selectedRows" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getBarcodePage } from '@/api/inventory/warehouse'
  import type { BarcodeQueryParams } from '@/api/inventory/warehouse/model'
  import { PrinterOutlined } from '@/components/icons'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import PrintLabel from './components/print-label.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import { EleMessage } from 'ele-admin-plus'

  defineOptions({ name: 'Barcode' })

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

  /** 选中的行数据 */
  const selectedRows = ref<any[]>([])

  /** 是否显示打印弹窗 */
  const printVisible = ref(false)

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '地址信息',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'code',
      label: '地址码',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    }
  ])

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ pages, where, orders }) => {
    return await getBarcodePage({
      ...where,
      ...orders,
      ...pages,
      type: 2 //展区
    })
  }

  /** 搜索 */
  const handleSearch = (where?: BarcodeQueryParams) => {
    tableRef.value?.reload?.({ where, page: 1 })
  }

  /** 处理表格选择变化 */
  const handleSelectionChange = (rows: any[]) => {
    selectedRows.value = rows
  }

  /** 处理行点击 */
  const handleRowClick = (row: any) => {
    selectedRows.value = [row]
  }

  /** 标签打印 */
  const handlePrint = () => {
    if (selectedRows.value.length > 0) {
      printVisible.value = true
    } else {
      EleMessage.warning('请选择要打印的标签')
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.selected-row) {
    background-color: var(--el-color-primary-light-9);
  }
</style>
