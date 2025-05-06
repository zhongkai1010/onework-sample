<template>
  <ele-modal v-model="visible" title="打印单据" width="800px" :destroy-on-close="true">
    <div class="print-content">
      <div class="print-header">
        <h2>藏品出库单</h2>
        <div class="print-info">
          <p>出库单号：{{ details?.code }}</p>
          <p>出库日期：{{ details?.outboundDate }}</p>
        </div>
      </div>
      <div class="print-body">
        <table class="print-table">
          <tr>
            <th>藏品编号</th>
            <th>藏品名称</th>
            <th>入库日期</th>
            <th>状态</th>
          </tr>
          <tr v-for="item in details?.collections" :key="item.collectionCode">
            <td>{{ item.collectionCode }}</td>
            <td>{{ item.collectionName }}</td>
            <td>{{ item.storageDate }}</td>
            <td>{{ getStatusText(item.status) }}</td>
          </tr>
        </table>
        <div class="print-footer">
          <div class="print-sign">
            <p>经办人：{{ details?.operator }}</p>
            <p>提借部门：{{ details?.borrowDepartment }}</p>
            <p>提借人：{{ details?.borrower }}</p>
            <p>提借类型：{{ details?.borrowType }}</p>
            <p>拟归日期：{{ details?.proposedReturnDate }}</p>
          </div>
          <div class="print-remarks">
            <p>备注：{{ details?.remarks }}</p>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { OutboundDetailInfo } from '@/api/inventory/outbound/model'
  import { getOutboundDetails } from '@/api/inventory/outbound'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 出库单详情
  const details = ref<OutboundDetailInfo>()

  // 当前出库单ID
  const currentId = ref<string>()

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap = {
      0: '未审核',
      1: '待出库',
      2: '已出库',
      3: '已归还'
    }
    return statusMap[status as keyof typeof statusMap] || '-'
  }

  // 设置出库单ID
  const setOutboundId = async (id: string) => {
    currentId.value = id
    try {
      const res = await getOutboundDetails({ id })
      details.value = res
      visible.value = true
    } catch (error: any) {
      ElMessage.error(error.message || '获取详情失败')
    }
  }

  // 处理打印
  const handlePrint = () => {
    window.print()
  }

  defineExpose({
    setOutboundId
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
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }

    .print-body {
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

      .print-footer {
        .print-sign {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;

          p {
            margin: 0;
          }
        }

        .print-remarks {
          p {
            margin: 0;
          }
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
