<!-- 藏品铭牌打印 -->
<template>
  <ele-modal
    v-model="visible"
    title="铭牌打印"
    position="center"
    :width="'auto'"
    :min-width="400"
    class="nameplate-modal"
  >
    <div class="print-content">
      <div class="nameplate-grid">
        <div class="nameplate-item">
          <div class="nameplate-header">
            <div class="museum-name">{{ museumName }}</div>
            <div class="collection-code">编号：{{ nameplateData[0]?.code }}</div>
          </div>
          <div class="nameplate-body">
            <div class="collection-name">{{ nameplateData[0]?.collectionName }}</div>
            <div class="collection-info">
              <div v-if="nameplateData[0]?.categoryName"
                >类别：{{ nameplateData[0]?.categoryName }}</div
              >
              <div v-if="nameplateData[0]?.era">年代：{{ nameplateData[0]?.era }}</div>
              <div v-if="nameplateData[0]?.region">地域：{{ nameplateData[0]?.region }}</div>
              <div v-if="nameplateData[0]?.material">质地：{{ nameplateData[0]?.material }}</div>
              <div v-if="nameplateData[0]?.warehouseName"
                >存放位置：{{ nameplateData[0]?.warehouseName }}</div
              >
            </div>
          </div>
          <div class="nameplate-footer">
            <div class="barcode">
              <ele-bar-code :value="nameplateData[0]?.code" :tag="tag" :options="options" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
    <ele-printer v-model="printing" target="_iframe">
      <div class="print-page">
        <div class="nameplate-grid">
          <div class="nameplate-item">
            <div class="nameplate-header">
              <div class="museum-name">{{ museumName }}</div>
              <div class="collection-code">编号：{{ nameplateData[0]?.code }}</div>
            </div>
            <div class="nameplate-body">
              <div class="collection-name">{{ nameplateData[0]?.collectionName }}</div>
              <div class="collection-info">
                <div v-if="nameplateData[0]?.categoryName"
                  >类别：{{ nameplateData[0]?.categoryName }}</div
                >
                <div v-if="nameplateData[0]?.era">年代：{{ nameplateData[0]?.era }}</div>
                <div v-if="nameplateData[0]?.region">地域：{{ nameplateData[0]?.region }}</div>
                <div v-if="nameplateData[0]?.material">质地：{{ nameplateData[0]?.material }}</div>
                <div v-if="nameplateData[0]?.warehouseName"
                  >存放位置：{{ nameplateData[0]?.warehouseName }}</div
                >
              </div>
            </div>
            <div class="nameplate-footer">
              <div class="barcode">
                <ele-bar-code :value="nameplateData[0]?.code" :tag="tag" :options="options" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ele-printer>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch, reactive } from 'vue'
  import type { Collection } from '@/api/collection/catalog/model'
  import { getDetails } from '@/api/collection/catalog'
  import type { Options } from 'jsbarcode'
  import type { BarCodeTag } from 'ele-admin-plus/es/ele-bar-code/types'

  const props = defineProps<{
    /** 藏品ID */
    id?: number
  }>()

  const visible = defineModel<boolean>({ type: Boolean })
  const printing = ref(false)
  const museumName = '博物馆名称'
  const nameplateData = ref<Collection[]>([])

  // 条码渲染方式和参数配置
  const tag = ref<BarCodeTag>('img')
  const options = reactive<Options>({
    height: 40,
    width: 2,
    margin: 2,
    displayValue: false,
    format: 'CODE128'
  })

  const handleClose = () => {
    visible.value = false
  }
  const handlePrint = () => {
    printing.value = true
  }
  const getDetailsData = async () => {
    if (!props.id) return
    try {
      const data = await getDetails(props.id)
      nameplateData.value = [data]
    } catch (e) {
      console.error('获取藏品详情失败:', e)
    }
  }
  watch(
    () => props.id,
    () => {
      if (props.id) {
        getDetailsData()
      }
    },
    { immediate: true }
  )
</script>

<style scoped>
  .nameplate-modal {
    :deep(.el-dialog) {
      margin: 0 !important;
    }
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }
  .print-content {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .print-page {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nameplate-grid {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nameplate-item {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 300px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }
  .nameplate-header {
    text-align: center;
    margin-bottom: 15px;
  }
  .museum-name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .collection-code {
    font-size: 14px;
    color: #606266;
  }
  .nameplate-body {
    flex: 1;
    margin-bottom: 15px;
  }
  .collection-name {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }
  .collection-info {
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    text-align: center;
  }
  .nameplate-footer {
    text-align: center;
  }
  .barcode {
    display: inline-block;
    margin-top: 10px;
  }
</style>
