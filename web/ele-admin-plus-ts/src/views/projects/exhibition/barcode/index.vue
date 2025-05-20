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
      >
        <template #toolbar>
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="PrinterOutlined"
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
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'

  defineOptions({ name: 'Barcode' })

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
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
    const data = await getBarcodePage({
      ...where,
      ...orders,
      ...pages
    })
    return data
  }

  /** 搜索 */
  const handleSearch = (where?: BarcodeQueryParams) => {
    tableRef.value?.reload?.({ where, page: 1 })
  }

  /** 标签打印 */
  const handlePrint = () => {
    // TODO: 实现标签打印功能
    console.log('标签打印')
  }
</script>

<style lang="scss" scoped></style>
