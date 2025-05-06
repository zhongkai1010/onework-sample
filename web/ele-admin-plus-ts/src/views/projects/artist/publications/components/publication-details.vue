<template>
  <ele-modal
    v-model="visible"
    title="出版著作详情"
    width="680px"
    :destroy-on-close="true"
    @open="handleOpen"
  >
    <el-descriptions :column="1" size="large" :border="true" :label-width="120">
      <el-descriptions-item label="出版物题名">{{ details?.bookTitle }}</el-descriptions-item>
      <el-descriptions-item label="艺术家名称">{{ details?.artistName }}</el-descriptions-item>
      <el-descriptions-item label="出版社">{{ details?.publisher }}</el-descriptions-item>
      <el-descriptions-item label="开本">{{ details?.format }}</el-descriptions-item>
      <el-descriptions-item label="编著">{{ details?.author }}</el-descriptions-item>
      <el-descriptions-item label="印次">{{ details?.edition }}</el-descriptions-item>
      <el-descriptions-item label="定价">¥{{ details?.price?.toFixed(2) }}</el-descriptions-item>
      <el-descriptions-item label="出版物封面">
        <div v-if="details?.coverImage" class="cover-image">
          <el-image
            :src="details.coverImage"
            :preview-src-list="[details.coverImage]"
            fit="cover"
            style="width: 200px; height: 280px; cursor: pointer"
          />
        </div>
        <span v-else>暂无封面</span>
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Publication } from '@/api/artist/published-work/model'
  import { getPublicationDetails } from '@/api/artist/published-work'

  const props = defineProps<{
    /** 出版著作数据 */
    data?: Publication
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 详情数据 */
  const details = ref<Publication>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.data?.id) {
      return
    }
    try {
      const loading = EleMessage.loading({
        message: '加载中..',
        plain: true
      })
      details.value = await getPublicationDetails(props.data.id)
      loading.close()
    } catch (e: any) {
      EleMessage.error(e.message)
      visible.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .cover-image {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
</style>
