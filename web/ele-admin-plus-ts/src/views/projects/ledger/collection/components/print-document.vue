<!-- 标签打印弹框 -->
<template>
  <ele-modal
    v-model="show"
    title="标签打印"
    width="800px"
    :destroy-on-close="true"
    @close="onClose"
    position="center"
  >
    <div class="print-content" ref="printContent">
      <div class="print-header">
        <h2>藏品标签</h2>
        <div class="print-info">
          <span>藏品编号：{{ row?.collectionCode }}</span>
          <span>打印日期：{{ new Date().toLocaleDateString() }}</span>
        </div>
      </div>

      <div class="print-body">
        <div class="print-section">
          <h3>基本信息</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="藏品名称">{{ row?.collectionName }}</el-descriptions-item>
            <el-descriptions-item label="藏品状态">
              <el-tag :type="getStatusType(row?.collectionStatus)">
                {{ getStatusText(row?.collectionStatus) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="藏品类别">{{ row?.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="存放位置">{{ row?.warehouseName }}</el-descriptions-item>
            <el-descriptions-item label="年代">{{ row?.era }}</el-descriptions-item>
            <el-descriptions-item label="实际质地">{{ row?.material }}</el-descriptions-item>
            <el-descriptions-item label="数量"
              >{{ row?.quantity }} {{ row?.unit }}</el-descriptions-item
            >
            <el-descriptions-item label="具体尺寸">{{
              row?.specificDimensions
            }}</el-descriptions-item>
            <el-descriptions-item label="完残状况">{{ row?.condition }}</el-descriptions-item>
            <el-descriptions-item label="保存状态">{{
              row?.preservationStatus
            }}</el-descriptions-item>
            <el-descriptions-item label="文物级别">{{ row?.culturalLevel }}</el-descriptions-item>
            <el-descriptions-item label="藏品来源">{{
              row?.collectionSource
            }}</el-descriptions-item>
            <el-descriptions-item label="入藏日期">{{ row?.collectionDate }}</el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">{{ row?.notes }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="print-section" v-if="row?.imageInfo">
          <h3>藏品图片</h3>
          <el-image
            :src="row.imageInfo"
            :preview-src-list="[row.imageInfo]"
            fit="contain"
            style="width: 200px; height: 200px"
          />
        </div>
      </div>

      <div class="print-footer">
        <div class="print-signature">
          <div class="signature-item">
            <span>打印人：</span>
            <span class="signature-line"></span>
          </div>
          <div class="signature-item">
            <span>审核人：</span>
            <span class="signature-line"></span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    modelValue: boolean
    rows: CollectionLedger[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
    (e: 'done'): void
  }>()

  // 显示状态
  const show = ref(false)

  // 打印内容引用
  const printContent = ref<HTMLElement>()

  // 当前行数据
  const row = ref<CollectionLedger | null>(null)

  // 监听显示状态
  watch(
    () => props.modelValue,
    (val) => {
      show.value = val
      if (val && props.rows.length === 1) {
        row.value = props.rows[0]
      }
    }
  )

  // 监听显示状态变化
  watch(show, (val) => {
    emit('update:modelValue', val)
    if (!val) {
      emit('close')
    }
  })

  // 获取状态类型
  const getStatusType = (status?: number) => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      0: 'success', // 在库
      1: 'warning', // 出库
      2: 'danger', // 修复中
      3: 'info', // 调拨中
      4: 'primary', // 已注销
      5: 'primary' // 其他
    }
    return statusMap[status || 0] || 'primary'
  }

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap: Record<number, string> = {
      0: '在库',
      1: '出库',
      2: '修复中',
      3: '调拨中',
      4: '已注销',
      5: '其他'
    }
    return statusMap[status || 0] || '未知'
  }

  // 关闭弹窗
  const onClose = () => {
    show.value = false
    row.value = null
  }

  // 打印
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
      @media print {
        .el-button { display: none; }
      }
    </style>
  `

    printWindow.document.write(`
    <html>
      <head>
        <title>藏品标签打印</title>
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

  @media print {
    :deep(.el-button) {
      display: none;
    }
  }
</style>
