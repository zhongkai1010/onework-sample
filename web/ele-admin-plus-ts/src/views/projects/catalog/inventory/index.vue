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
          <img
            v-if="row.imageInfo"
            :src="row.imageInfo"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.imageInfo)"
          />
          <div v-else> 暂无数据 </div>
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

      <!-- 图片预览组件 -->
      <ele-image-viewer
        v-model="showImageViewer"
        :urlList="viewerImages"
        :initialIndex="viewerIndex"
        :infinite="false"
      />
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
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

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
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      width: 80,
      align: 'center',
      slot: 'imageInfo'
    },
    {
      prop: 'code',
      label: '藏品编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'numberCategory',
      label: '编号类别',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'artist',
      label: '艺术家',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'author',
      label: '作者',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'materialType',
      label: '质地类型',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '质地',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '所属仓库',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'addressCode',
      label: '地址码',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'overallLength',
      label: '通长(底径cm)',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'overallWidth',
      label: '通宽(口径cm)',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'totalHeight',
      label: '通高(cm)',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'weightRange',
      label: '质量范围',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificWeight',
      label: '具体质量',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'weightUnit',
      label: '质量单位',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'type',
      label: '类型',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'culturalLevel',
      label: '文物级别',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '保存状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionStatus',
      label: '审批状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDate',
      label: '征集日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDateRange',
      label: '入藏日期范围',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'approveName',
      label: '审核人',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'approveTime',
      label: '审核时间',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      sortable: 'custom',
      align: 'left',
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

  /**
   * 处理图片预览
   * @param url 图片 URL
   */
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
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
