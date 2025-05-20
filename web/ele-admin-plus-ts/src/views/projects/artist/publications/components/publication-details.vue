<template>
  <ele-modal
    v-model="visible"
    title="出版著作详情"
    width="680px"
    :destroy-on-close="true"
    @open="handleOpen"
  >
    <el-descriptions v-if="details" :column="2" border class="publication-details">
      <!-- 基本信息 -->
      <el-descriptions-item label="出版物题名" :span="2">
        <span class="text-lg font-bold">{{ details.bookTitle }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="艺术家名称">
        {{ details.artistName }}
      </el-descriptions-item>
      <el-descriptions-item label="出版社">
        {{ details.publisher }}
      </el-descriptions-item>
      <el-descriptions-item label="开本">
        {{ details.format }}
      </el-descriptions-item>
      <el-descriptions-item label="编著">
        {{ details.author }}
      </el-descriptions-item>
      <el-descriptions-item label="印次">
        {{ details.edition }}
      </el-descriptions-item>
      <el-descriptions-item label="定价">
        {{ details.price ? `¥${Number(details.price).toFixed(2)}` : '暂无定价' }}
      </el-descriptions-item>

      <!-- 封面图片 -->
      <el-descriptions-item label="封面" :span="2">
        <div v-if="details.coverImage" class="cover-image">
          <el-image
            :src="details.coverImage"
            :preview-src-list="[details.coverImage]"
            fit="cover"
            style="width: 200px; height: 280px; cursor: pointer"
          >
            <template #error>
              <div class="image-error">
                <el-icon><Picture /></el-icon>
                <span>加载失败</span>
              </div>
            </template>
          </el-image>
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
  import { Picture } from '@element-plus/icons-vue'

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
      details.value = await getPublicationDetails(props.data.id)
    } catch (e: any) {
      EleMessage.error(e.message)
      visible.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .publication-details {
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

  .cover-image {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: #f5f7fa;
    border-radius: 4px;

    .image-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 280px;
      color: #909399;
      font-size: 14px;

      .el-icon {
        font-size: 24px;
        margin-bottom: 8px;
      }
    }
  }
</style>
