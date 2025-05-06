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
        cache-key="accidentTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        @row-click="handleRowClick"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >添加</el-button
          >
          <el-button
            type="success"
            class="ele-btn-icon"
            :icon="UploadOutlined"
            @click="handleUpload"
            >上传图片</el-button
          >
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleRemove()"
            :disabled="!selections.length"
            >删除</el-button
          >
          <el-button
            type="info"
            class="ele-btn-icon"
            :icon="EyeOutlined"
            @click="handleViewDetails"
            :disabled="selections.length !== 1"
            >查看详情</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            :icon="SettingOutlined"
            @click="handleProcessAccident"
            :disabled="selections.length !== 1"
            >处理</el-button
          >
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="PrinterOutlined"
            @click="handlePrintAccident"
            :disabled="selections.length !== 1"
            >单据打印</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="success" @click="handleUploadImage(row)">上传图片</el-button>
            <el-button type="danger" @click="() => handleRemove([row])">删除</el-button>
          </el-space>
        </template>

        <!-- 处理状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === 0 ? 'warning' : 'success'" effect="light">
            {{ row.status === 0 ? '待处理' : '已处理' }}
          </el-tag>
        </template>
      </ele-pro-table>

      <!-- 事故记录编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 事故记录详情弹窗 -->
      <accident-details v-model="showDetails" :id="current?.id" />

      <!-- 处理事故弹窗 -->
      <handle-incident v-model="showHandle" :id="current?.id" @done="reload" />

      <!-- 单据打印弹窗 -->
      <print-document v-model="showPrint" :id="current?.id" />
    </ele-card>
    <!-- 参考按钮 -->
    <reference-button
      title="事故记录"
      :imageUrl="pageImage"
      searchText="编号 藏品编码 藏品名称 事故时间 事故地点 事故原因 事故责任人 藏品损坏情况"
      operationText="添加 上传图片 删除 查看详情 处理 单据打印"
      tableFieldsText="编号 单据图片 藏品编码 藏品名称 事故时间 事故地点 事故原因 事故责任人 藏品损坏情况 处理状态 处理结果"
      tableOperationsText="上传图片 删除"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import {
    PlusOutlined,
    DeleteOutlined,
    UploadOutlined,
    EyeOutlined,
    SettingOutlined,
    PrinterOutlined
  } from '@/components/icons'
  import type { Accident, AccidentQueryParams } from '@/api/collection/accident/model'
  import { getAccidentList, deleteAccidents } from '@/api/collection/accident'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import AccidentDetails from './components/accident-details.vue'
  import HandleIncident from './components/handle-incident.vue'
  import PrintDocument from './components/print-document.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Accident | undefined>(undefined) // 当前编辑的事故记录
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const showHandle = ref(false) // 是否显示处理弹窗
  const showPrint = ref(false) // 是否显示打印弹窗
  const selections = ref<Accident[]>([]) // 表格选中的行

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
      prop: 'code',
      label: '编号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'documentImage',
      label: '单据图片',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编码',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'incidentTime',
      label: '事故时间',
      sortable: 'custom',
      width: 160,
      showOverflowTooltip: true
    },
    {
      prop: 'incidentLocation',
      label: '事故地点',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'incidentCause',
      label: '事故原因',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'responsiblePerson',
      label: '事故责任人',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'damageStatus',
      label: '藏品损坏情况',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '处理状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'processingResult',
      label: '处理结果',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 180,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getAccidentList({
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
  const reload = (where?: AccidentQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加事故记录
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理上传图片
   */
  const handleUpload = () => {
    // TODO: 实现上传图片功能
    EleMessage.info('上传图片功能开发中...')
  }

  /**
   * 处理删除事故记录
   * @param rows 要删除的事故记录数据，不传则删除选中的事故记录
   */
  const handleRemove = (rows?: Accident[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的事故记录吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteAccidents(data.map((d) => d.id))
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
   * 处理行上传图片
   */
  const handleUploadImage = (_row: Accident) => {
    // TODO: 实现行上传图片功能
    EleMessage.info('上传图片功能开发中...')
  }

  /**
   * 处理查看详情
   */
  const handleViewDetails = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    current.value = selections.value[0]
    showDetails.value = true
  }

  /**
   * 处理事故
   */
  const handleProcessAccident = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    current.value = selections.value[0]
    showHandle.value = true
  }

  /**
   * 处理单据打印
   */
  const handlePrintAccident = () => {
    if (selections.value.length !== 1) {
      EleMessage.warning('请选择一条记录')
      return
    }
    current.value = selections.value[0]
    showPrint.value = true
    console.log('showPrint:', showPrint.value) // 添加日志
  }

  /**
   * 处理行点击
   */
  const handleRowClick = (row: Accident) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: AccidentQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
