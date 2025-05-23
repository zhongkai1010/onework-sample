<template>
  <ele-modal
    v-model="visible"
    title="注销单打印"
    width="800px"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <div v-if="details" class="print-content">
      <!-- 头部信息 -->
      <div class="print-header">
        <h2>注销单</h2>
        <div class="print-info">
          <p>注销单号：{{ details.code }}</p>
          <p>注销时间：{{ details.cancellationTime }}</p>
          <p>批准部门：{{ details.approvalDepartment }}</p>
          <p>注销原因：{{ details.cancellationReason }}</p>
        </div>
      </div>

      <!-- 藏品列表 -->
      <div class="print-body">
        <h3>藏品列表</h3>
        <table class="print-table">
          <tr>
            <th>序号</th>
            <th>藏品编号</th>
            <th>藏品名称</th>
            <th>注销日期</th>
            <th>状态</th>
          </tr>
          <tr v-for="(item, index) in details.details" :key="item.collectionCode">
            <td>{{ index + 1 }}</td>
            <td>{{ item.collectionCode }}</td>
            <td>{{ item.collectionName }}</td>
            <td>{{ item.cancellationTime }}</td>
            <td>{{ getStatusText(item.status) }}</td>
          </tr>
        </table>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { getCancellationDetails } from '@/api/collection/cancellation'
  import type { CancellationDetailInfo } from '@/api/collection/cancellation/model'

  const visible = ref(false)
  const details = ref<CancellationDetailInfo>()

  // 打开弹窗
  const open = async (id: number) => {
    try {
      details.value = await getCancellationDetails(id)
      visible.value = true
    } catch (error) {
      console.error('获取注销单详情失败:', error)
    }
  }

  // 关闭弹窗
  const handleClose = () => {
    visible.value = false
    details.value = undefined
  }

  // 打印
  const handlePrint = () => {
    window.print()
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

  defineExpose({
    open
  })
</script>

<style lang="scss" scoped>
  .print-content {
    padding: 20px;
    background: #fff;

    .print-header {
      text-align: center;
      margin-bottom: 20px;

      h2 {
        margin: 0 0 10px;
        font-size: 24px;
      }

      .print-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;

        p {
          margin: 0;
          width: 45%;
          text-align: left;
        }
      }
    }

    .print-body {
      h3 {
        margin-bottom: 15px;
      }

      .print-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;

        th,
        td {
          border: 1px solid #dcdfe6;
          padding: 8px;
          text-align: center;
        }

        th {
          background-color: #f5f7fa;
        }
      }
    }
  }

  @media print {
    :deep(.el-dialog) {
      position: static;
      margin: 0;
      box-shadow: none;
    }

    :deep(.el-dialog__header),
    :deep(.el-dialog__footer) {
      display: none;
    }

    :deep(.el-dialog__body) {
      padding: 0;
    }
  }
</style>
