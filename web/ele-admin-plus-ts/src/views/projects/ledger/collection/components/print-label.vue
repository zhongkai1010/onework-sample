<!-- 标签打印弹框 -->
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
          <div class="label-container">
            <div class="label-header">
              <h3>藏品标签</h3>
              <div class="label-info">
                <span>藏品编号：{{ item.collectionCode }}</span>
                <span>打印日期：{{ new Date().toLocaleDateString() }}</span>
              </div>
            </div>
            <div class="label-body">
              <div class="label-section">
                <div class="label-row">
                  <span class="label-field">藏品名称：</span>
                  <span class="label-value">{{ item.collectionName }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">藏品类别：</span>
                  <span class="label-value">{{ item.categoryName }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">存放位置：</span>
                  <span class="label-value">{{ item.warehouseName }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">年代：</span>
                  <span class="label-value">{{ item.era }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">实际质地：</span>
                  <span class="label-value">{{ item.material }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">数量：</span>
                  <span class="label-value">{{ item.quantity }} {{ item.unit }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">具体尺寸：</span>
                  <span class="label-value">{{ item.specificDimensions }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">完残状况：</span>
                  <span class="label-value">{{ item.condition }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">保存状态：</span>
                  <span class="label-value">{{ item.preservationStatus }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">文物级别：</span>
                  <span class="label-value">{{ item.culturalLevel }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">藏品来源：</span>
                  <span class="label-value">{{ item.collectionSource }}</span>
                </div>
                <div class="label-row">
                  <span class="label-field">入藏日期：</span>
                  <span class="label-value">{{ item.collectionDate }}</span>
                </div>
              </div>
              <div class="label-section" v-if="item.imageInfo">
                <div class="label-image">
                  <el-image
                    :src="item.imageInfo"
                    fit="contain"
                    style="width: 100px; height: 100px"
                  />
                </div>
              </div>
            </div>
            <div class="label-footer">
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
        <div class="label-container">
          <div class="label-header">
            <h3>藏品标签</h3>
            <div class="label-info">
              <span>藏品编号：{{ item.collectionCode }}</span>
              <span>打印日期：{{ new Date().toLocaleDateString() }}</span>
            </div>
          </div>
          <div class="label-body">
            <div class="label-section">
              <div class="label-row">
                <span class="label-field">藏品名称：</span>
                <span class="label-value">{{ item.collectionName }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">藏品类别：</span>
                <span class="label-value">{{ item.categoryName }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">存放位置：</span>
                <span class="label-value">{{ item.warehouseName }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">年代：</span>
                <span class="label-value">{{ item.era }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">实际质地：</span>
                <span class="label-value">{{ item.material }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">数量：</span>
                <span class="label-value">{{ item.quantity }} {{ item.unit }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">具体尺寸：</span>
                <span class="label-value">{{ item.specificDimensions }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">完残状况：</span>
                <span class="label-value">{{ item.condition }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">保存状态：</span>
                <span class="label-value">{{ item.preservationStatus }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">文物级别：</span>
                <span class="label-value">{{ item.culturalLevel }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">藏品来源：</span>
                <span class="label-value">{{ item.collectionSource }}</span>
              </div>
              <div class="label-row">
                <span class="label-field">入藏日期：</span>
                <span class="label-value">{{ item.collectionDate }}</span>
              </div>
            </div>
            <div class="label-section" v-if="item.imageInfo">
              <div class="label-image">
                <el-image :src="item.imageInfo" fit="contain" style="width: 100px; height: 100px" />
              </div>
            </div>
          </div>
          <div class="label-footer">
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
    </div>
  </ele-printer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    /** 是否显示 */
    modelValue: boolean
    /** 选中的行数据 */
    rows: CollectionLedger[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  /** 是否显示弹窗 */
  const show = ref(false)

  /** 是否打印中 */
  const printing = ref(false)

  /** 打印数据 */
  const printData = ref<CollectionLedger[]>([])

  /** 监听显示状态 */
  watch(
    () => props.modelValue,
    (value) => {
      show.value = value
      if (value) {
        printData.value = [...props.rows]
      }
    }
  )

  /** 监听选中数据变化 */
  watch(
    () => props.rows,
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
    padding: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: calc(50% - 10px);
    min-width: 400px;
    background-color: #fff;
  }

  .label-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .label-header {
    text-align: center;
    border-bottom: 2px solid #409eff;
    padding-bottom: 10px;

    h3 {
      margin: 0 0 10px;
      font-size: 20px;
      color: #409eff;
    }
  }

  .label-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
  }

  .label-body {
    display: flex;
    gap: 20px;
  }

  .label-section {
    flex: 1;
  }

  .label-row {
    display: flex;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;
  }

  .label-field {
    color: #666;
    width: 80px;
    flex-shrink: 0;
  }

  .label-value {
    color: #333;
    flex: 1;
  }

  .label-image {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee;
    padding: 5px;
  }

  .label-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .signature-item {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .signature-line {
    display: inline-block;
    width: 100px;
    height: 1px;
    background: #000;
    margin-left: 10px;
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
