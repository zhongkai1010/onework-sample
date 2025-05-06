<!-- 事故记录详情弹窗 -->
<template>
  <ele-modal
    :width="'900px'"
    v-model="visible"
    title="事故记录详情"
    position="center"
    @open="handleOpen"
  >
    <el-descriptions v-if="data" :column="2" border class="accident-details">
      <!-- 基本信息 -->
      <el-descriptions-item label="编号" :span="2">
        <span class="text-lg font-bold">{{ data.id }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="藏品编码">
        {{ data.collectionCode }}
      </el-descriptions-item>
      <el-descriptions-item label="藏品名称">
        {{ data.collectionName }}
      </el-descriptions-item>
      <el-descriptions-item label="事故时间">
        {{ data.incidentTime }}
      </el-descriptions-item>
      <el-descriptions-item label="事故地点">
        {{ data.incidentLocation }}
      </el-descriptions-item>
      <el-descriptions-item label="事故原因" :span="2">
        {{ data.incidentCause }}
      </el-descriptions-item>
      <el-descriptions-item label="事故责任人">
        {{ data.responsiblePerson }}
      </el-descriptions-item>
      <el-descriptions-item label="藏品损坏情况">
        {{ data.damageStatus }}
      </el-descriptions-item>
      <el-descriptions-item label="处理状态">
        <el-tag :type="data.status === 0 ? 'warning' : 'success'" effect="light">
          {{ data.status === 0 ? '待处理' : '已处理' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="处理结果" :span="2">
        {{ data.processingResult }}
      </el-descriptions-item>

      <!-- 单据图片 -->
      <el-descriptions-item label="单据图片" :span="2">
        <el-image
          v-if="data.documentImage"
          :src="data.documentImage"
          :preview-src-list="[data.documentImage]"
          fit="cover"
          class="w-40 h-40"
        />
        <el-empty v-else description="暂无单据图片" :image-size="40" />
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Accident } from '@/api/collection/accident/model'
  import { getAccidentDetails } from '@/api/collection/accident'

  const props = defineProps<{
    /** 事故记录ID */
    id?: number
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 事故记录详情数据 */
  const data = ref<Accident>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.id) {
      EleMessage.error('事故记录ID不能为空')
      handleClose()
      return
    }
    try {
      const res = await getAccidentDetails(props.id)
      data.value = res
    } catch (e: any) {
      if (e.message) {
        EleMessage.error(e.message)
      }
      handleClose()
    }
  }

  /** 关闭弹窗 */
  const handleClose = () => {
    visible.value = false
    data.value = undefined
  }
</script>

<style lang="scss" scoped>
  .accident-details {
    :deep(.el-descriptions__label) {
      width: 120px;
      min-width: 120px;
      text-align: left;
    }

    :deep(.el-descriptions__content) {
      width: 100px;
      min-width: 100px;
    }
  }
</style>
