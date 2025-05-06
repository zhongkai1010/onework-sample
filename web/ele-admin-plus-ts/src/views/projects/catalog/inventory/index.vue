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
        cache-key="inventoryTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="ArrowLeftOutlined"
            @click="handleReturn"
            :disabled="!selections.length"
          >
            退回编目
          </el-button>
        </template>

        <!-- 图片信息列 -->
        <template #imageInfo="{ row }">
          <el-image
            v-if="row.imageInfo"
            :src="row.imageInfo"
            :preview-src-list="[row.imageInfo]"
            fit="cover"
            class="w-20 h-20"
            :title="row.collectionName || '藏品图片'"
          />
          <el-empty v-else description="暂无图片" :image-size="40" />
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleViewDetails(row)"
              >查看详情</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 详情弹窗 -->
      <collection-details v-model="showDetails" :id="currentId" />
    </ele-card>

    <!-- 参考按钮 -->
    <reference-button
      title="藏品入库"
      :imageUrl="pageImage"
      searchText="藏品编号 藏品名称 藏品分类 地域类型 地域 请输入地域 藏品来源 入藏日期范围 类型"
      operationText="退回编目"
      tableFieldsText="藏品状态 图片信息 编号类别 藏品编号 藏品名称 藏品类别 编号 数量 数量单位 年代类型 年代 艺术家 地域类型 地域 质地类型 质地 通长 底径 通宽 口径 通高 具体尺寸 质量范围 具体质量 质量单位 文物级别 藏品来源 完残状况 保存状态 征集日期 入藏日期范围 入藏年度 类型 人文类型 藏品介绍 文本类型 声像载体类型 声像载体存放位置 计算机磁盘路径 颜色类别 颜色描述 存放位置 备注 入馆时间 入藏时间 登录时间 入柜时间 操作"
      tableOperationsText="查看详情"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import { ArrowLeftOutlined } from '@/components/icons'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { Collection, CollectionQueryParams } from '@/api/collection/catalog/model'
  import { getPreparation, returnCollections } from '@/api/collection/catalog'
  import SearchForm from './components/search-form.vue'
  import CollectionDetails from '../collection/components/collection-details.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const currentId = ref<number>() // 当前查看详情的藏品ID
  const showDetails = ref(false) // 是否显示详情弹窗
  const selections = ref<Collection[]>([]) // 表格选中的行

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
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'numberCategory',
      label: '编号类别',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'eraType',
      label: '年代',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '具体年代',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'artist',
      label: '艺术家',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'materialType',
      label: '质地类型',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '质地',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'overallLength',
      label: '通长(底径cm)',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'overallWidth',
      label: '通宽(口径cm)',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'totalHeight',
      label: '通高(cm)',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'weightRange',
      label: '质量范围',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'specificWeight',
      label: '具体质量',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'weightUnit',
      label: '质量单位',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'culturalLevel',
      label: '文物级别',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '保存状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDate',
      label: '征集日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDateRange',
      label: '入藏日期范围',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      width: 100,
      align: 'center',
      slot: 'imageInfo'
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionStatus',
      label: '审批状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'addressCode',
      label: '地址码',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '所属仓库',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'type',
      label: '类型',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'author',
      label: '作者',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'approver',
      label: '审核人',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'approveTime',
      label: '审核时间',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 120,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getPreparation({
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
  const reload = (where?: CollectionQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理查看详情
   * @param row 藏品数据
   */
  const handleViewDetails = (row: Collection) => {
    currentId.value = row.id
    showDetails.value = true
  }

  /**
   * 处理退回编目
   */
  const handleReturn = () => {
    if (!selections.value.length) {
      return
    }
    ElMessageBox.confirm('确定要将选中的藏品退回编目吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        returnCollections(selections.value.map((d) => Number(d.id)))
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
    reload: (where?: CollectionQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
