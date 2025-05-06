<!-- 展览详情弹窗 -->
<template>
  <ele-modal
    :width="'900px'"
    v-model="visible"
    title="展览详情"
    position="center"
    @open="handleOpen"
  >
    <el-descriptions v-if="data" :column="2" border class="exhibition-details">
      <!-- 基本信息 -->
      <el-descriptions-item label="展览标题" :span="2">
        <span class="text-lg font-bold">{{ data.exhibitionTitle }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="展览时间">
        {{ data.exhibitionStartDate }} 至 {{ data.exhibitionEndDate }}
      </el-descriptions-item>
      <el-descriptions-item label="展览机构">
        {{ data.exhibitionInstitution }}
      </el-descriptions-item>
      <el-descriptions-item label="展览城市">
        {{ data.exhibitionCity }}
      </el-descriptions-item>
      <el-descriptions-item label="展览地址">
        {{ data.exhibitionAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="艺术家">
        {{ data.artistName }}
      </el-descriptions-item>

      <!-- 封面图片 -->
      <el-descriptions-item label="封面" :span="2">
        <el-image
          v-if="data.coverImage"
          :src="data.coverImage"
          :preview-src-list="[data.coverImage]"
          fit="cover"
          class="w-40 h-40"
        />
        <el-empty v-else description="暂无封面" :image-size="40" />
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
  import type { Exhibition } from '@/api/artist/exhibition/model'
  import { getExhibitionDetail } from '@/api/artist/exhibition'

  const props = defineProps<{
    /** 展览ID */
    id?: string
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 展览详情数据 */
  const data = ref<Exhibition>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.id) {
      EleMessage.error('展览ID不能为空')
      handleClose()
      return
    }
    try {
      data.value = await getExhibitionDetail(props.id)
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
  .exhibition-details {
    :deep(.el-descriptions__label) {
      width: 80px;
      min-width: 80px;
      text-align: left;
    }
  }
</style>
