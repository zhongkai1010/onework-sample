<!-- 藏品标签打印 -->
<template>
  <ele-modal v-model="visible" title="打印标签" position="center">
    <div class="print-content">
      <div class="label-grid">
        <div v-for="(item, index) in props.data" :key="index" class="label-item">
          <div class="label-barcode">
            <ele-bar-code
              :value="item.collectionCode"
              :display-value="false"
              :options="{ height: 60 }"
            />
          </div>
          <div class="label-name">{{ item.collectionName }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
    <ele-printer v-model="printing" target="_iframe">
      <div class="print-page">
        <div class="label-grid">
          <div v-for="(item, index) in props.data" :key="index" class="label-item">
            <div class="label-barcode">
              <ele-bar-code
                :value="item.collectionCode"
                :display-value="false"
                :options="{ height: 60 }"
              />
            </div>
            <div class="label-name">{{ item.collectionName }}</div>
          </div>
        </div>
      </div>
    </ele-printer>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EleBarCode } from 'ele-admin-plus/es'
  import type { Collection } from '@/api/collection/catalog/model'

  const printing = ref(false)
  const props = defineProps<{
    /** 藏品数据 */
    data: Collection[]
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel<boolean>({ type: Boolean })

  /** 关闭弹窗 */
  const handleClose = () => {
    visible.value = false
  }

  /** 打印标签 */
  const handlePrint = () => {
    printing.value = true
  }
</script>

<style scoped>
  .print-content {
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }

  .print-page {
    padding: 20px;
  }

  .label-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    justify-content: start;
  }

  .label-item {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 8px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .label-barcode {
    margin-bottom: 4px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label-name {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    word-break: break-all;
    margin-top: 4px;
  }
</style>
