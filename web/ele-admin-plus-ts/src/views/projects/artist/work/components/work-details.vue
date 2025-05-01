<template>
  <ele-modal :width="'900px'" v-model="visible" title="艺术家作品详情" position="center" @open="handleOpen">
    <el-descriptions v-if="data" :column="2" border class="work-details">
      <!-- 基本信息 -->
      <el-descriptions-item label="作品名称" :span="2">
        <span class="text-lg font-bold">{{ data.workTitle }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="艺术家名称">
        {{ data.artistName }}
      </el-descriptions-item>
      <el-descriptions-item label="创作年代">
        {{ data.creationYear }}
      </el-descriptions-item>
      <el-descriptions-item label="尺寸">
        {{ data.dimensions }}
      </el-descriptions-item>
      <el-descriptions-item label="材质">
        {{ data.material }}
      </el-descriptions-item>
      <el-descriptions-item label="题材">
        {{ data.theme }}
      </el-descriptions-item>
      <el-descriptions-item label="装裱">
        {{ data.framing }}
      </el-descriptions-item>

      <!-- 作品图片 -->
      <el-descriptions-item label="作品图片" :span="2">
        <el-image v-if="data.workImage" :src="data.workImage" :preview-src-list="[data.workImage]" fit="cover" class="w-40 h-40" />
        <el-empty v-else description="暂无图片" :image-size="40" />
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { ArtistWork } from '@/api/artist/work/model'
  import { getArtistWorkDetails } from '@/api/artist/work'

  const props = defineProps<{
    /** 作品数据 */
    data?: ArtistWork
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 作品详情数据 */
  const detailsData = ref<ArtistWork>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.data?.id) {
      EleMessage.error('作品数据不完整')
      handleClose()
      return
    }
    try {
      detailsData.value = await getArtistWorkDetails(props.data.id)
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
    detailsData.value = undefined
  }
</script>

<style lang="scss" scoped>
  .work-details {
    :deep(.el-descriptions__label) {
      width: 80px;
      min-width: 80px;
      text-align: left;
    }
  }
</style>
