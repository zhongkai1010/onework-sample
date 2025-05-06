<template>
  <ele-modal v-model="visible" title="注销单打印" width="800px" :destroy-on-close="true" @close="handleClose">
    <div v-if="details" class="print-content">
      <!-- 头部信息 -->
      <div class="header">
        <h2>注销单</h2>
        <div class="info">
          <div class="info-item">
            <span class="label">注销单号：</span>
            <span class="value">{{ details.code }}</span>
          </div>
          <div class="info-item">
            <span class="label">注销时间：</span>
            <span class="value">{{ details.cancellationTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">批准部门：</span>
            <span class="value">{{ details.approvalDepartment }}</span>
          </div>
          <div class="info-item">
            <span class="label">注销原因：</span>
            <span class="value">{{ details.cancellationReason }}</span>
          </div>
        </div>
      </div>

      <!-- 藏品列表 -->
      <div class="collections">
        <h3>藏品列表</h3>
        <el-table :data="details.collections" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="collectionCode" label="藏品编号" width="120" show-overflow-tooltip />
          <el-table-column prop="collectionName" label="藏品名称" min-width="200" show-overflow-tooltip />
          <el-table-column prop="cancellationTime" label="注销日期" width="120" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)" effect="light">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
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

  defineExpose({
    open
  })
</script>

<style lang="scss" scoped>
  .print-content {
    padding: 20px;

    .header {
      text-align: center;
      margin-bottom: 30px;

      h2 {
        margin-bottom: 20px;
      }

      .info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 50px;

        .info-item {
          width: 45%;
          margin-bottom: 10px;

          .label {
            font-weight: bold;
            margin-right: 10px;
          }
        }
      }
    }

    .collections {
      h3 {
        margin-bottom: 15px;
      }
    }
  }

  @media print {
    :deep(.el-button) {
      display: none;
    }
  }
</style>
