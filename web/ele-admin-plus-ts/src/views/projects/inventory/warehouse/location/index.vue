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
        cache-key="locationTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
      >
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleBind">
            绑定
          </el-button>
        </template>
      </ele-pro-table>
      <!-- 参考按钮 -->
      <reference-button
        title="位置绑定"
        :imageUrl="pageImage"
        searchText="藏品编号 地址条码 绑定时间"
        operationText="绑定"
        tableFieldsText="藏品编号 地址条码 绑定时间"
      />
    </ele-card>
    <!-- 绑定弹框 -->
    <bind-code v-model="showBind" @done="reload" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { Columns, DatasourceFunction } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getLocationPage } from '@/api/inventory/warehouse'
  import type { LocationQueryParams } from '@/api/inventory/warehouse/model'
  import { PlusOutlined } from '@/components/icons'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import BindCode from './components/bind-code.vue'

  defineOptions({ name: 'Location' })

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

  /** 是否显示绑定弹框 */
  const showBind = ref(false)

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
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'code',
      label: '地址条码',
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'bindingTime',
      label: '绑定时间',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    }
  ])

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ pages, where, orders }) => {
    const data = await getLocationPage({
      ...where,
      ...orders,
      ...pages,
      type: 1 //查询库房
    })
    return data
  }

  /** 搜索 */
  const handleSearch = (where?: LocationQueryParams) => {
    tableRef.value?.reload?.({ where, page: 1 })
  }

  /** 刷新表格 */
  const reload = () => {
    tableRef.value?.reload?.()
  }

  /** 绑定 */
  const handleBind = () => {
    showBind.value = true
  }
</script>

<style lang="scss" scoped></style>
