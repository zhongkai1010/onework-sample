<template>
  <ele-modal
    v-model="visible"
    title="出版著作详情"
    width="1200px"
    :destroy-on-close="true"
    @open="handleOpen"
  >
    <el-descriptions
      v-if="details"
      :column="2"
      border
      :label-width="120"
      :label-align="'right'"
      :cell-style="{ padding: '12px 16px' }"
      :content-style="{ width: '50%' }"
      class="publication-details"
    >
      <!-- 基本信息 -->
      <el-descriptions-item label="出版物题名" :span="2">
        <span class="text-lg font-bold">{{ details.bookTitle }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="ISBN">
        {{ details.isbn }}
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
      <el-descriptions-item label="所属类别">
        {{ details.category }}
      </el-descriptions-item>
      <el-descriptions-item label="申请人">
        {{ details.applicant }}
      </el-descriptions-item>
      <el-descriptions-item label="申请人部门">
        {{ details.applicantDepartment }}
      </el-descriptions-item>

      <!-- 内容提要 -->
      <el-descriptions-item label="内容提要" :span="2">
        <div class="summary-content">{{ details.summary }}</div>
      </el-descriptions-item>

      <!-- 目录 -->
      <el-descriptions-item label="目录" :span="2">
        <div class="catalog-content" v-html="details.catalog"></div>
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

      <!-- 相关文件 -->
      <el-descriptions-item label="相关文件" :span="2">
        <div v-if="details.relatedFiles" class="related-files">
          <el-link :href="details.relatedFiles" target="_blank" type="primary" class="file-link">
            查看文件
          </el-link>
        </div>
        <span v-else>暂无相关文件</span>
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
  .summary-content {
    white-space: pre-wrap;
    line-height: 1.6;
    color: #606266;
  }

  .catalog-content {
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
    min-height: 100px;
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

  .related-files {
    .file-link {
      font-size: 14px;
    }
  }
</style>
