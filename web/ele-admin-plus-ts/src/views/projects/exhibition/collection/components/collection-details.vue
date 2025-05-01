<template>
  <ele-modal v-model="visible" title="藏品详情" width="800px" :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="藏品编号">{{ data?.collectionCode }}</el-descriptions-item>
      <el-descriptions-item label="藏品名称">{{ data?.collectionName }}</el-descriptions-item>
      <el-descriptions-item label="藏品分类">{{ data?.categoryName }}</el-descriptions-item>
      <el-descriptions-item label="藏品状态">
        <el-tag :type="data?.collectionStatus === 1 ? 'success' : 'info'" effect="light">
          {{ data?.collectionStatus === 1 ? '正常' : '异常' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="仓库位置">{{ data?.warehouseName }}</el-descriptions-item>
      <el-descriptions-item label="存放位置">{{ data?.warehouseName }}</el-descriptions-item>
      <el-descriptions-item label="年代">{{ data?.era }}</el-descriptions-item>
      <el-descriptions-item label="数量">{{ data?.quantity }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ data?.unit }}</el-descriptions-item>
      <el-descriptions-item label="具体尺寸">{{ data?.specificDimensions }}</el-descriptions-item>
      <el-descriptions-item label="完残程度">{{ data?.condition }}</el-descriptions-item>
      <el-descriptions-item label="完残状况">{{ data?.preservationStatus }}</el-descriptions-item>
      <el-descriptions-item label="地址码">{{ data?.rfidCode }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { WarehouseCollection } from '@/api/inventory/warehouse/model'

  const props = defineProps<{
    modelValue: boolean
    data?: WarehouseCollection
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const visible = ref(false)

  watch(
    () => props.modelValue,
    (val) => {
      visible.value = val
    }
  )

  watch(
    () => visible.value,
    (val) => {
      emit('update:modelValue', val)
    }
  )
</script>
