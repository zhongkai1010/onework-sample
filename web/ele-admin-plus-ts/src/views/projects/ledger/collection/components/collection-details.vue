<!-- 藏品详情弹框 -->
<template>
  <ele-modal
    v-model="modelValue"
    title="藏品详情"
    width="960px"
    position="center"
    class="details-modal"
  >
    <div class="details-content">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="藏品编号" class-name="equal-width">{{
          row?.collectionCode
        }}</el-descriptions-item>
        <el-descriptions-item label="藏品状态" class-name="equal-width">
          <el-tag :type="getStatusType(row?.status)">{{ getStatusText(row?.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="藏品名称" class-name="equal-width">{{
          row?.collectionName
        }}</el-descriptions-item>
        <el-descriptions-item label="藏品类别" class-name="equal-width">{{
          row?.categoryName
        }}</el-descriptions-item>
        <el-descriptions-item label="存放位置" class-name="equal-width">{{
          row?.warehouseName
        }}</el-descriptions-item>
        <el-descriptions-item label="年代" class-name="equal-width">{{
          row?.era
        }}</el-descriptions-item>
        <el-descriptions-item label="实际质地" class-name="equal-width">{{
          row?.material
        }}</el-descriptions-item>
        <el-descriptions-item label="数量" class-name="equal-width"
          >{{ row?.quantity }} {{ row?.unit }}</el-descriptions-item
        >
        <el-descriptions-item label="具体尺寸" class-name="equal-width">{{
          row?.specificDimensions
        }}</el-descriptions-item>
        <el-descriptions-item label="完残状况" class-name="equal-width">{{
          row?.condition
        }}</el-descriptions-item>
        <el-descriptions-item label="保存状态" class-name="equal-width">{{
          row?.preservationStatus
        }}</el-descriptions-item>
        <el-descriptions-item label="文物级别" class-name="equal-width">{{
          row?.culturalLevel
        }}</el-descriptions-item>
        <el-descriptions-item label="藏品来源" class-name="equal-width">{{
          row?.collectionSource
        }}</el-descriptions-item>
        <el-descriptions-item label="入藏日期" class-name="equal-width">{{
          row?.collectionDate
        }}</el-descriptions-item>
        <el-descriptions-item label="入藏年度" class-name="equal-width">{{
          row?.collectionYear
        }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ row?.notes }}</el-descriptions-item>
        <el-descriptions-item label="图片信息" :span="2" v-if="row?.imageInfo">
          <el-image
            :src="row.imageInfo"
            :preview-src-list="[row.imageInfo]"
            fit="cover"
            class="w-40 h-40"
          />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  defineProps<{
    row: CollectionLedger | null
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 获取状态类型
  const getStatusType = (status?: number) => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      0: 'danger', // 未审核
      1: 'success', // 在藏
      2: 'warning', // 待出库
      3: 'danger', // 已出库
      4: 'warning', // 待拨库
      5: 'danger', // 修复中
      6: 'warning', // 待注销
      7: 'primary' // 已注销
    }
    return statusMap[status || 0] || 'primary'
  }

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap: Record<number, string> = {
      0: '未审核',
      1: '在藏',
      2: '待出库',
      3: '已出库',
      4: '待拨库',
      5: '修复中',
      6: '待注销',
      7: '已注销'
    }
    return statusMap[status || 0] || '其他'
  }

  // 关闭弹窗
  const onClose = () => {
    modelValue.value = false
  }
</script>

<style scoped>
  .details-modal {
    :deep(.el-dialog) {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
    }
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .details-content {
    height: calc(80vh - 120px);
    overflow-y: auto;
    padding: 20px;
  }

  :deep(.equal-width) {
    width: 40%;
  }
</style>
