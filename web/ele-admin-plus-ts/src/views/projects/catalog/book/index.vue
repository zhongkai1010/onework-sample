<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
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
        cache-key="bookTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd">
            添加
          </el-button>
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="CheckOutlined"
            @click="handleApprove"
            :disabled="!selections.length"
          >
            审核通过
          </el-button>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleRemove()"
            :disabled="!selections.length"
          >
            删除
          </el-button>
        </template>

        <!-- 藏品状态列 -->
        <template #collectionStatus="{ row }">
          <el-tag :type="getStatusType(row.collectionStatus)" effect="light">
            {{ row.collectionStatus }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" @click="handleEdit(row)" size="small">修改</el-button>
            <el-button type="danger" @click="() => handleRemove([row])" size="small"
              >删除</el-button
            >
          </el-space>
        </template>

        <!-- 图片信息列 -->
        <template #imageInfo="{ row }">
          <el-image
            v-if="row.imageInfo"
            :src="row.imageInfo"
            :preview-src-list="[row.imageInfo]"
            fit="cover"
            class="w-20 h-20"
            :title="row.collectionName || '图书图片'"
          />
          <el-empty v-else description="暂无图片" :image-size="40" style="padding: 0" />
        </template>
      </ele-pro-table>

      <!-- 图书编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 参考按钮 -->
      <reference-button
        title="图书管理"
        :imageUrl="pageImage"
        searchText="藏品编号 藏品名称 藏品分类 ISBN 作者 所属仓库 藏品来源 图书价值 保存状态 征集日期 入藏年度 备注 藏品状态 地址码 类型"
        operationText="添加 审核通过 删除"
        tableFieldsText="图片信息 编号类别 藏品编号 藏品名称 ISBN 藏品分类 作者 所属仓库 藏品来源 图书价值 保存状态 征集日期 入藏年度 备注 藏品状态 地址码 类型 操作"
        tableOperationsText="修改 删除"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@/components/icons'
  import type { BookCollection, BookQueryParams } from '@/api/collection/book/model'
  import { getBookList, deleteBooks, approveBooks } from '@/api/collection/book'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<BookCollection | undefined>(undefined) // 当前编辑的图书
  const showEdit = ref(false) // 是否显示编辑弹窗
  const selections = ref<BookCollection[]>([]) // 表格选中的行

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
      prop: 'imageInfo',
      label: '图片信息',
      width: 100,
      align: 'center',
      slot: 'imageInfo'
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
      prop: 'isbn',
      label: 'ISBN',
      sortable: 'custom',
      width: 120,
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
      prop: 'author',
      label: '作者',
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
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'bookValue',
      label: '图书价值',
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
      prop: 'collectionStatus',
      label: '藏品状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'collectionStatus'
    },
    {
      prop: 'addressCode',
      label: '地址码',
      sortable: 'custom',
      width: 100,
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
    return getBookList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 工具函数 ==================== */
  /**
   * 获取状态标签类型
   * @param status 状态值
   * @returns 标签类型
   */
  const getStatusType = (status: string) => {
    switch (status) {
      case '待审核':
        return 'warning'
      case '已审核':
        return 'success'
      case '已退回':
        return 'danger'
      default:
        return 'info'
    }
  }

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: BookQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加图书
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑图书
   * @param row 图书数据
   */
  const handleEdit = (row: BookCollection) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理删除图书
   * @param rows 要删除的图书数据，不传则删除选中的图书
   */
  const handleRemove = (rows?: BookCollection[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的图书吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteBooks(data.map((d) => Number(d.id)))
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
   * 处理审核通过
   */
  const handleApprove = () => {
    if (!selections.value.length) {
      return
    }
    ElMessageBox.confirm('确定要通过选中的图书审核吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        approveBooks(selections.value.map((d) => Number(d.id)))
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
    reload: (where?: BookQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
