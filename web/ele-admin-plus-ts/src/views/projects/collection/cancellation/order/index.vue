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
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="cancellationOrderTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        v-model:selections="selections"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
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
            @click="() => handleDelete()"
            :disabled="!selections.length"
            >删除</el-button
          >
          <el-button
            type="warning"
            class="ele-btn-icon"
            :icon="PrinterOutlined"
            @click="handlePrint"
            :disabled="selections.length !== 1"
            >单据打印</el-button
          >
        </template>

        <!-- 单据图片列 -->
        <template #documentImage="{ row }">
          <el-image
            v-if="row.documentImage"
            :src="row.documentImage"
            :preview-src-list="[row.documentImage]"
            fit="cover"
            style="width: 50px; height: 50px"
          />
          <span v-else>无图片</span>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button
              type="success"
              size="small"
              @click="handleUploadImage(row)"
              v-if="row.status === 0"
              >上传图片</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="handleApprove(row)"
              v-if="row.status === 0"
              >审核</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
            <el-button
              type="success"
              size="small"
              @click="handleRecover(row)"
              v-if="row.status === 1"
              >恢复</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 单据打印组件 -->
    <print-document ref="printRef" />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { UploadOutlined, DeleteOutlined, PrinterOutlined } from '@/components/icons'
  import {
    getCancellationList,
    approveCancellation,
    recoverCancellation
  } from '@/api/collection/cancellation'
  import type { Cancellation } from '@/api/collection/cancellation/model'
  import SearchForm from './components/search-form.vue'
  import PrintDocument from './components/print-document.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()
  const printRef = ref<InstanceType<typeof PrintDocument>>()

  /* ==================== 状态管理 ==================== */
  const selections = ref<any[]>([]) // 表格选中的行

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'documentImage',
      label: '单据图片',
      width: 100,
      align: 'center',
      slot: 'documentImage'
    },
    {
      prop: 'code',
      label: '注销单号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationTime',
      label: '注销时间',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'approvalDepartment',
      label: '批准部门',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationReason',
      label: '注销原因',
      sortable: 'custom',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'action',
      label: '操作',
      width: 200,
      fixed: 'right',
      slot: 'action'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getCancellationList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 方法 ==================== */
  // 重新加载表格数据
  const reload = () => {
    tableRef.value?.reload()
  }

  // 获取状态类型
  const getStatusType = (status: number) => {
    switch (status) {
      case 0:
        return 'warning'
      case 1:
        return 'success'
      case 2:
        return 'info'
      default:
        return 'info'
    }
  }

  // 获取状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已恢复'
      default:
        return '未知'
    }
  }

  // 上传图片
  const handleUpload = () => {
    // TODO: 实现批量上传图片功能
    ElMessage.info('批量上传图片功能待实现')
  }

  // 上传图片
  const handleUploadImage = (_row: Cancellation) => {
    // TODO: 实现上传图片功能
    ElMessage.info('上传图片功能待实现')
  }

  // 审核
  const handleApprove = (row: Cancellation) => {
    ElMessageBox.confirm('确定要审核通过该注销单吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      try {
        await approveCancellation({ ids: [row.id] })
        ElMessage.success('审核成功')
        reload()
      } catch (error) {
        console.error('审核失败:', error)
      }
    })
  }

  // 恢复
  const handleRecover = (row: Cancellation) => {
    ElMessageBox.confirm('确定要恢复该注销单吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      try {
        await recoverCancellation({ ids: [row.id] })
        ElMessage.success('恢复成功')
        reload()
      } catch (error) {
        console.error('恢复失败:', error)
      }
    })
  }

  // 删除
  const handleDelete = async (row?: Cancellation) => {
    try {
      const _ids = row ? [row.id] : selections.value.map((item) => item.id)
      await ElMessageBox.confirm('确定要删除选中的注销单吗？', '提示', {
        type: 'warning'
      })
      // TODO: 实现删除功能
      ElMessage.info('删除功能待实现')
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  // 打印
  const handlePrint = () => {
    if (selections.value.length === 1) {
      printRef.value?.open(selections.value[0].id)
    }
  }
</script>

<style lang="scss" scoped></style>
