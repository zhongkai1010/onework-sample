<template>
  <ele-modal
    v-model="show"
    title="标签打印"
    width="1000px"
    :destroy-on-close="true"
    @closed="onClosed"
  >
    <div class="print-content">
      <div class="print-preview">
        <div v-for="item in printData" :key="item.id" class="label-item">
          <div class="barcode-container">
            <div class="barcode-wrapper">
              <ele-bar-code :value="item.code" :options="{ height: 60 }" />
            </div>
            <div class="label-info">
              <div class="label-name">{{ item.name }}</div>
              <div class="label-code">{{ item.code }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" :loading="printing" @click="handlePrint">打印</el-button>
    </template>
  </ele-modal>

  <ele-printer
    v-model="printing"
    :direction="'portrait'"
    :target="'_iframe'"
    :static="false"
    :body-style="{ overflow: 'hidden' }"
  >
    <div class="print-preview">
      <div v-for="item in printData" :key="item.id" class="label-item">
        <div class="barcode-container">
          <div class="barcode-wrapper">
            <ele-bar-code :value="item.code" :options="{ height: 60 }" />
          </div>
          <div class="label-info">
            <div class="label-name">{{ item.name }}</div>
            <div class="label-code">{{ item.code }}</div>
          </div>
        </div>
      </div>
    </div>
  </ele-printer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Warehouse } from '@/api/inventory/warehouse/model'

  const props = defineProps<{
    /** 是否显示 */
    modelValue: boolean
    /** 选中的行数据 */
    selectedRows: Warehouse[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  /** 是否显示弹窗 */
  const show = ref(false)

  /** 是否打印中 */
  const printing = ref(false)

  /** 打印数据 */
  const printData = ref<Warehouse[]>([])

  /** 监听显示状态 */
  watch(
    () => props.modelValue,
    (value) => {
      show.value = value
      if (value) {
        printData.value = [...props.selectedRows]
      }
    }
  )

  /** 监听选中数据变化 */
  watch(
    () => props.selectedRows,
    (rows) => {
      if (show.value) {
        printData.value = [...rows]
      }
    },
    { deep: true }
  )

  /** 监听弹窗显示状态 */
  watch(show, (value) => {
    emit('update:modelValue', value)
  })

  /** 弹窗关闭后 */
  const onClosed = () => {
    printData.value = []
  }

  /** 打印标签 */
  const handlePrint = () => {
    if (printData.value.length === 0) {
      EleMessage.warning('没有可打印的数据')
      return
    }
    printing.value = true
  }
</script>

<style lang="scss" scoped>
  .print-content {
    padding: 20px;
    height: 600px;
    overflow: auto;
  }

  .print-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
  }

  .label-item {
    padding: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: calc(25% - 15px);
    min-width: 200px;
  }

  .barcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .barcode-wrapper {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label-info {
    margin-top: 10px;
    text-align: center;
    width: 100%;
  }

  .label-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    word-break: break-all;
  }

  .label-code {
    font-size: 14px;
    color: #666;
    word-break: break-all;
  }

  @media print {
    .ele-modal__wrapper {
      display: none;
    }
    .print-preview {
      display: block;
    }
    .label-item {
      page-break-inside: avoid;
      margin-bottom: 20px;
      width: 100%;
    }
  }
</style>
