<template>
  <ele-modal
    v-model="visible"
    title="打印入库单"
    width="800px"
    :destroy-on-close="true"
    @closed="reset"
    position="center"
  >
    <div class="print-content" ref="printContent">
      <div class="print-header">
        <h2>入库单</h2>
        <div class="print-info">
          <span>入库单号：{{ data?.code }}</span>
          <span>入库日期：{{ data?.storageDate }}</span>
        </div>
      </div>

      <div class="print-body">
        <div class="print-section">
          <h3>基本信息</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="入库类型">
              {{ data?.type === 1 ? '初次入库' : '归还入库' }}
            </el-descriptions-item>
            <el-descriptions-item label="单据状态">
              <el-tag :type="getStatusType(data?.status)">
                {{ getStatusText(data?.status) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="经办人">{{ data?.operator }}</el-descriptions-item>
            <el-descriptions-item label="接收库房">{{ data?.warehouseName }}</el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">{{ data?.remarks }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="print-section">
          <h3>藏品列表</h3>
          <el-table :data="data?.collections" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="collectionCode" label="藏品编号" width="120" />
            <el-table-column
              prop="collectionName"
              label="藏品名称"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column prop="categoryName" label="藏品类别" width="120" />
            <el-table-column prop="warehouseName" label="存放位置" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="print-section">
          <h3>单据图片</h3>
          <el-image
            v-if="data?.documentImage"
            :src="data.documentImage"
            :preview-src-list="[data.documentImage]"
            fit="contain"
            style="width: 200px; height: 200px"
          />
          <span v-else>暂无图片</span>
        </div>
      </div>

      <div class="print-footer">
        <div class="print-signature">
          <div class="signature-item">
            <span>经办人：</span>
            <span class="signature-line"></span>
          </div>
          <div class="signature-item">
            <span>审核人：</span>
            <span class="signature-line"></span>
          </div>
          <div class="signature-item">
            <span>接收人：</span>
            <span class="signature-line"></span>
          </div>
        </div>
        <div class="print-date">
          <span>打印日期：{{ new Date().toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleCancel">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { InboundOrderDetail } from '@/api/inventory/inbound/model'
  import { getInboundOrderDetail } from '@/api/inventory/inbound'
  import { ElMessage } from 'element-plus'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 打印内容引用 */
  const printContent = ref<HTMLElement>()

  /** 当前数据 */
  const data = ref<InboundOrderDetail>()

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 重置数据 */
  const reset = () => {
    data.value = undefined
  }

  /** 获取状态类型 */
  const getStatusType = (status?: number) => {
    switch (status) {
      case 0:
        return 'info'
      case 1:
        return 'success'
      case 2:
        return 'warning'
      default:
        return 'info'
    }
  }

  /** 获取状态文本 */
  const getStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已入库'
      default:
        return '未知'
    }
  }

  /** 打开弹窗 */
  const open = async (id: number) => {
    if (!id) {
      ElMessage.error('入库单ID不能为空')
      return
    }
    visible.value = true
    try {
      data.value = await getInboundOrderDetail({ id })
    } catch (e: any) {
      ElMessage.error(e.message || '获取入库单详情失败')
      visible.value = false
    }
  }

  /** 打印 */
  const handlePrint = () => {
    if (!printContent.value) return

    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const style = `
      <style>
        body { margin: 0; padding: 20px; }
        .print-content { max-width: 800px; margin: 0 auto; }
        .print-header { text-align: center; margin-bottom: 20px; }
        .print-header h2 { margin: 0 0 10px; }
        .print-info { display: flex; justify-content: space-between; }
        .print-section { margin-bottom: 20px; }
        .print-section h3 { margin: 0 0 10px; }
        .print-footer { margin-top: 40px; }
        .print-signature { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .signature-item { display: flex; align-items: center; }
        .signature-line { display: inline-block; width: 100px; height: 1px; background: #000; margin-left: 10px; }
        .print-date { text-align: right; }
        @media print {
          .el-button { display: none; }
        }
      </style>
    `

    printWindow.document.write(`
      <html>
        <head>
          <title>入库单打印</title>
          ${style}
        </head>
        <body>
          ${printContent.value.innerHTML}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  defineExpose({
    open
  })
</script>

<style lang="scss" scoped>
  .print-content {
    padding: 20px;
    background-color: #fff;
  }

  .print-header {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      margin: 0 0 10px;
      font-size: 24px;
      font-weight: 500;
    }
  }

  .print-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .print-section {
    margin-bottom: 20px;

    h3 {
      margin: 0 0 10px;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .print-footer {
    margin-top: 40px;
  }

  .print-signature {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .signature-item {
    display: flex;
    align-items: center;
  }

  .signature-line {
    display: inline-block;
    width: 100px;
    height: 1px;
    background: #000;
    margin-left: 10px;
  }

  .print-date {
    text-align: right;
  }

  @media print {
    :deep(.el-button) {
      display: none;
    }
  }
</style>
