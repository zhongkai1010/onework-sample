<!-- 藏品详情弹框 -->
<template>
  <ele-modal v-model="modelValue" title="藏品详情" width="800px" :destroy-on-close="true" @close="onClose">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="藏品编号">{{ row?.collectionCode }}</el-descriptions-item>
      <el-descriptions-item label="藏品状态">
        <el-tag :type="getStatusType(row?.collectionStatus)">{{ getStatusText(row?.collectionStatus) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="藏品名称">{{ row?.collectionName }}</el-descriptions-item>
      <el-descriptions-item label="藏品类别">{{ row?.categoryName }}</el-descriptions-item>
      <el-descriptions-item label="存放位置">{{ row?.warehouseName }}</el-descriptions-item>
      <el-descriptions-item label="年代">{{ row?.era }}</el-descriptions-item>
      <el-descriptions-item label="实际质地">{{ row?.material }}</el-descriptions-item>
      <el-descriptions-item label="数量">{{ row?.quantity }} {{ row?.unit }}</el-descriptions-item>
      <el-descriptions-item label="具体尺寸">{{ row?.specificDimensions }}</el-descriptions-item>
      <el-descriptions-item label="完残状况">{{ row?.condition }}</el-descriptions-item>
      <el-descriptions-item label="保存状态">{{ row?.preservationStatus }}</el-descriptions-item>
      <el-descriptions-item label="文物级别">{{ row?.culturalLevel }}</el-descriptions-item>
      <el-descriptions-item label="藏品来源">{{ row?.collectionSource }}</el-descriptions-item>
      <el-descriptions-item label="入藏日期">{{ row?.collectionDate }}</el-descriptions-item>
      <el-descriptions-item label="入藏年度">{{ row?.collectionYear }}</el-descriptions-item>
      <el-descriptions-item label="备注" :span="2">{{ row?.notes }}</el-descriptions-item>
    </el-descriptions>
    <div class="image-preview" v-if="row?.imageInfo">
      <h4>图片信息</h4>
      <el-image :src="row.imageInfo" :preview-src-list="[row.imageInfo]" fit="contain" />
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
    modelValue.value = false
  }
</script>

<style lang="scss" scoped>
  .image-preview {
    margin-top: 20px;

    h4 {
      margin-bottom: 10px;
    }

    .el-image {
      width: 200px;
      height: 200px;
    }
  }
</style>
