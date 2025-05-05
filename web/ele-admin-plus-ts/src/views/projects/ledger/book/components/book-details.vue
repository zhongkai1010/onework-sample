<template>
  <ele-modal v-model="modelValue" title="图书详情" width="800px" :destroy-on-close="true" @close="onClose">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="编号类别">{{ row?.numberCategory }}</el-descriptions-item>
      <el-descriptions-item label="藏品名称">{{ row?.collectionName }}</el-descriptions-item>
      <el-descriptions-item label="RFID编号">{{ row?.rfidCode }}</el-descriptions-item>
      <el-descriptions-item label="藏品分类">{{ row?.categoryName }}</el-descriptions-item>
      <el-descriptions-item label="ISBN">{{ row?.isbn }}</el-descriptions-item>
      <el-descriptions-item label="作者">{{ row?.author }}</el-descriptions-item>
      <el-descriptions-item label="仓库">{{ row?.warehouseName }}</el-descriptions-item>
      <el-descriptions-item label="藏品来源">{{ row?.collectionSource }}</el-descriptions-item>
      <el-descriptions-item label="图书价值">{{ row?.bookValue }}</el-descriptions-item>
      <el-descriptions-item label="保存状态">{{ row?.preservationStatus }}</el-descriptions-item>
      <el-descriptions-item label="征集日期">{{ row?.collectionDate }}</el-descriptions-item>
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
  import type { BooksLedger } from '@/api/collection/ledger/model/index'

  const { row } = defineProps<{
    row: BooksLedger | null
  }>()

  const modelValue = defineModel<boolean>('modelValue')

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
