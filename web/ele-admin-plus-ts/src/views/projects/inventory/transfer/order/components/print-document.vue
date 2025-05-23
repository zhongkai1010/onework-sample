<template>
  <ele-modal v-model="visible" title="打印单据" width="800px" :destroy-on-close="true">
    <div class="print-content">
      <div class="print-header">
        <h2>藏品调拨单</h2>
        <div class="print-info">
          <p>调拨单号：{{ data?.code }}</p>
          <p>调拨日期：{{ data?.transferDate }}</p>
        </div>
      </div>
      <div class="print-body">
        <table class="print-table">
          <tr>
            <th>藏品编号</th>
            <th>藏品名称</th>
            <th>原仓库</th>
            <th>现仓库</th>
            <th>状态</th>
          </tr>
          <tr v-for="item in data?.collections" :key="item.id">
            <td>{{ item.collectionCode }}</td>
            <td>{{ item.collectionName }}</td>
            <td>{{ item.originalWarehouse }}</td>
            <td>{{ item.currentWarehouse }}</td>
            <td>{{ getStatusText(Number(item.status)) }}</td>
          </tr>
        </table>
        <div class="print-footer">
          <div class="print-sign">
            <p>接收人：{{ data?.receiver }}</p>
            <p>调拨仓库：{{ data?.warehouseName }}</p>
            <p>调拨原因：{{ data?.transferReason }}</p>
            <p>单据状态：{{ getStatusText(Number(data?.status)) }}</p>
          </div>
          <div class="print-remarks">
            <p>备注：{{ data?.remark }}</p>
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
  import type { TransferDetailInfo } from '@/api/inventory/transfer/model'
  import { getTransferDetails } from '@/api/inventory/transfer'
  import { ElMessage } from 'element-plus'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 调拨单详情
  const data = ref<TransferDetailInfo>()

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap = {
      0: '待审核',
      1: '已审核',
      2: '已确认'
    }
    return statusMap[status as keyof typeof statusMap] || '-'
  }

  /** 打开弹窗 */
  const open = async (id: number) => {
    if (!id) {
      ElMessage.error('调拨单ID不能为空')
      return
    }
    visible.value = true
    try {
      data.value = await getTransferDetails({ id })
    } catch (e: any) {
      ElMessage.error(e.message || '获取调拨单详情失败')
      visible.value = false
    }
  }

  /** 打印 */
  const handlePrint = () => {
    window.print()
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
