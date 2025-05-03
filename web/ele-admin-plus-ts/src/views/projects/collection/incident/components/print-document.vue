<!-- 事故单据打印 -->
<template>
  <ele-modal v-model="visible" title="打印单据" position="center">
    <div class="print-content">
      <div class="document-content" v-loading="loading">
        <template v-if="data">
          <div class="document-header">
            <h2>事故处理单据</h2>
          </div>
          <div class="document-info">
            <div class="info-item">
              <span class="label">编号：</span>
              <span class="value">{{ data.id }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品编码：</span>
              <span class="value">{{ data.collectionCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品名称：</span>
              <span class="value">{{ data.collectionName }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故时间：</span>
              <span class="value">{{ data.incidentTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故地点：</span>
              <span class="value">{{ data.incidentLocation }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故原因：</span>
              <span class="value">{{ data.incidentCause }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故责任人：</span>
              <span class="value">{{ data.responsiblePerson }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品损坏情况：</span>
              <span class="value">{{ data.damageStatus }}</span>
            </div>
            <div class="info-item">
              <span class="label">处理状态：</span>
              <span class="value">{{ data.status === 0 ? '待处理' : '已处理' }}</span>
            </div>
            <div class="info-item">
              <span class="label">处理结果：</span>
              <span class="value">{{ data.processingResult }}</span>
            </div>
          </div>
          <div class="document-image" v-if="data.documentImage">
            <img :src="data.documentImage" alt="单据图片" />
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
    <ele-printer v-model="printing" target="_iframe">
      <div class="print-page">
        <div class="document-content">
          <div class="document-header">
            <h2>事故处理单据</h2>
          </div>
          <div class="document-info">
            <div class="info-item">
              <span class="label">编号：</span>
              <span class="value">{{ data?.id }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品编码：</span>
              <span class="value">{{ data?.collectionCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品名称：</span>
              <span class="value">{{ data?.collectionName }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故时间：</span>
              <span class="value">{{ data?.incidentTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故地点：</span>
              <span class="value">{{ data?.incidentLocation }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故原因：</span>
              <span class="value">{{ data?.incidentCause }}</span>
            </div>
            <div class="info-item">
              <span class="label">事故责任人：</span>
              <span class="value">{{ data?.responsiblePerson }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品损坏情况：</span>
              <span class="value">{{ data?.damageStatus }}</span>
            </div>
            <div class="info-item">
              <span class="label">处理状态：</span>
              <span class="value">{{ data?.status === 0 ? '待处理' : '已处理' }}</span>
            </div>
            <div class="info-item">
              <span class="label">处理结果：</span>
              <span class="value">{{ data?.processingResult }}</span>
            </div>
          </div>
          <div class="document-image" v-if="data?.documentImage">
            <img :src="data.documentImage" alt="单据图片" />
          </div>
        </div>
      </div>
    </ele-printer>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Accident } from '@/api/collection/accident/model'
  import { getAccidentDetails } from '@/api/collection/accident'

  const printing = ref(false)
  const loading = ref(false)
  const data = ref<Accident>()

  /** 弹窗是否打开 */
  const visible = defineModel<boolean>({ type: Boolean })

  /** 事故ID */
  const props = defineProps<{
    /** 事故记录ID */
    id?: number
  }>()

  /** 监听ID变化，加载数据 */
  watch(
    () => props.id,
    (id) => {
      if (id) {
        loadData(id)
      }
    },
    { immediate: true }
  )

  /** 加载事故详情 */
  const loadData = async (id: number) => {
    loading.value = true
    try {
      data.value = await getAccidentDetails(id)
    } catch (e: any) {
      EleMessage.error(e.message)
      handleClose()
    } finally {
      loading.value = false
    }
  }

  /** 关闭弹窗 */
  const handleClose = () => {
    visible.value = false
  }

  /** 打印单据 */
  const handlePrint = () => {
    printing.value = true
  }
</script>

<style lang="scss" scoped>
  .print-content {
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }

  .print-page {
    padding: 20px;
  }

  .document-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .document-header {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      margin: 0;
      font-size: 24px;
      color: #303133;
    }
  }

  .document-info {
    margin-bottom: 20px;
  }

  .info-item {
    margin-bottom: 10px;
    display: flex;
    line-height: 1.5;

    .label {
      width: 120px;
      color: #606266;
      font-weight: 500;
    }

    .value {
      flex: 1;
      color: #303133;
    }
  }

  .document-image {
    text-align: center;
    margin-top: 20px;

    img {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }
</style>
