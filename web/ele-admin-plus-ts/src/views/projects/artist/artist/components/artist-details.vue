<!-- 艺术家详情弹窗 -->
<template>
  <ele-modal :width="'900px'" v-model="visible" title="艺术家详情" position="center" @open="handleOpen">
    <el-descriptions v-if="data" :column="2" border class="artist-details">
      <!-- 基本信息 -->
      <el-descriptions-item label="姓名" :span="2">
        <span class="text-lg font-bold">{{ data.name }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ data.gender }}
      </el-descriptions-item>
      <el-descriptions-item label="民族">
        {{ data.ethnicity }}
      </el-descriptions-item>
      <el-descriptions-item label="籍贯">
        {{ data.hometown }}
      </el-descriptions-item>
      <el-descriptions-item label="艺术风格">
        {{ data.artStyle }}
      </el-descriptions-item>
      <el-descriptions-item label="师承">
        {{ data.mentor }}
      </el-descriptions-item>
      <el-descriptions-item label="何时何校毕业">
        {{ data.graduation }}
      </el-descriptions-item>
      <el-descriptions-item label="学历">
        {{ data.education }}
      </el-descriptions-item>
      <el-descriptions-item label="任职单位或机构">
        {{ data.currentInstitution }}
      </el-descriptions-item>

      <!-- 肖像图片 -->
      <el-descriptions-item label="肖像" :span="2">
        <el-image v-if="data.portrait" :src="data.portrait" :preview-src-list="[data.portrait]" fit="cover" class="w-40 h-40" />
        <el-empty v-else description="暂无肖像" :image-size="40" />
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
  import type { Artist } from '@/api/artist/artist/model'
  import { getArtistDetail } from '@/api/artist/artist'

  const props = defineProps<{
    /** 艺术家ID */
    id?: number
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 艺术家详情数据 */
  const data = ref<Artist>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.id) {
      EleMessage.error('艺术家ID不能为空')
      handleClose()
      return
    }
    try {
      data.value = await getArtistDetail(props.id)
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
  .artist-details {
    :deep(.el-descriptions__label) {
      width: 80px;
      min-width: 80px;
      text-align: left;
    }

    :deep(.el-descriptions__content) {
      width: 100px;
      min-width: 100px;
    }
  }
</style>
