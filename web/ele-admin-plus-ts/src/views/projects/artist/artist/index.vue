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
        cache-key="artistTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"> 添加 </el-button>
          <el-button type="danger" class="ele-btn-icon" :icon="DeleteOutlined" @click="() => handleRemove()" :disabled="!selections.length"> 删除 </el-button>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === '正常' ? 'success' : 'danger'" effect="light">
            {{ row.status }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="info" size="small" @click="handleDetail(row)">查看详情</el-button>
            <el-button type="danger" size="small" @click="() => handleRemove([row])">删除</el-button>
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 艺术家编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 艺术家详情弹窗 -->
      <artist-details v-model="detailVisible" :id="current?.id" />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined } from '@/components/icons'
  import type { Artist, GetArtistListParams } from '@/api/artist/artist/model'
  import { getArtistList, deleteArtist } from '@/api/artist/artist'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ArtistDetails from './components/artist-details.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Artist | undefined>(undefined) // 当前编辑的艺术家
  const showEdit = ref(false) // 是否显示编辑弹窗
  const selections = ref<Artist[]>([]) // 表格选中的行
  const detailVisible = ref(false) // 是否显示艺术家详情弹窗

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
      prop: 'name',
      label: '姓名',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'gender',
      label: '性别',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'ethnicity',
      label: '民族',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'hometown',
      label: '籍贯',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'artStyle',
      label: '艺术风格',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'mentor',
      label: '师承',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'graduation',
      label: '何时何校毕业',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'education',
      label: '学历',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'currentInstitution',
      label: '任职单位或机构',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'portrait',
      label: '肖像',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
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
    return getArtistList({
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
  const reload = (where?: GetArtistListParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加艺术家
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑艺术家
   * @param row 艺术家数据
   */
  const handleEdit = (row: Artist) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理查看详情
   * @param row 艺术家数据
   */
  const handleDetail = (row: Artist) => {
    current.value = row
    detailVisible.value = true
  }

  /**
   * 处理删除艺术家
   * @param rows 要删除的艺术家数据，不传则删除选中的艺术家
   */
  const handleRemove = (rows?: Artist[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的艺术家吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteArtist(data.map((d) => d.id))
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
    reload: (where?: GetArtistListParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
