<!-- 藏品详情弹窗 -->
<template>
  <ele-modal
    :width="960"
    v-model="visible"
    title="藏品详情"
    position="center"
    @open="handleOpen"
    class="details-modal"
  >
    <div class="details-content">
      <el-descriptions v-if="data" :column="2" border>
        <!-- 基本信息 -->
        <el-descriptions-item label="藏品名称" :span="2">
          <span class="text-lg font-bold">{{ data.collectionName }}</span>
        </el-descriptions-item>

        <el-descriptions-item label="藏品编号" class-name="equal-width">
          {{ data.code }}
        </el-descriptions-item>
        <el-descriptions-item label="编号类别" class-name="equal-width">
          {{ data.numberCategory }}
        </el-descriptions-item>
        <el-descriptions-item label="藏品类别" class-name="equal-width">
          {{ data.categoryName }}
        </el-descriptions-item>

        <el-descriptions-item label="文物级别" class-name="equal-width">
          {{ data.culturalLevel }}
        </el-descriptions-item>

        <!-- 图片信息 -->
        <el-descriptions-item label="图片信息" :span="2">
          <el-image
            v-if="data.imageInfo"
            :src="data.imageInfo"
            :preview-src-list="[data.imageInfo]"
            fit="cover"
            class="w-40 h-40"
          />
          <el-empty v-else description="暂无图片" :image-size="40" />
        </el-descriptions-item>

        <!-- 数量信息 -->
        <el-descriptions-item label="数量" class-name="equal-width">
          {{ data.quantity }}
        </el-descriptions-item>
        <el-descriptions-item label="数量单位" class-name="equal-width">
          {{ data.unit }}
        </el-descriptions-item>

        <!-- 年代信息 -->
        <el-descriptions-item label="年代" class-name="equal-width">
          {{ data.era }}
        </el-descriptions-item>

        <!-- 地域信息 -->
        <el-descriptions-item label="地域类型" class-name="equal-width">
          {{ data.regionType }}
        </el-descriptions-item>
        <el-descriptions-item label="地域" class-name="equal-width">
          {{ data.region }}
        </el-descriptions-item>

        <!-- 质地信息 -->
        <el-descriptions-item label="质地类型" class-name="equal-width">
          {{ data.materialType }}
        </el-descriptions-item>
        <el-descriptions-item label="质地" class-name="equal-width">
          {{ data.material }}
        </el-descriptions-item>

        <!-- 尺寸信息 -->
        <el-descriptions-item label="通长(底径cm)" class-name="equal-width">
          {{ data.overallLength }}
        </el-descriptions-item>
        <el-descriptions-item label="通宽(口径cm)" class-name="equal-width">
          {{ data.overallWidth }}
        </el-descriptions-item>
        <el-descriptions-item label="通高(cm)" class-name="equal-width">
          {{ data.totalHeight }}
        </el-descriptions-item>
        <el-descriptions-item label="具体尺寸" class-name="equal-width">
          {{ data.specificDimensions }}
        </el-descriptions-item>

        <!-- 质量信息 -->
        <el-descriptions-item label="质量范围" class-name="equal-width">
          {{ data.weightRange }}
        </el-descriptions-item>
        <el-descriptions-item label="具体质量" class-name="equal-width">
          {{ data.specificWeight }}
        </el-descriptions-item>
        <el-descriptions-item label="质量单位" class-name="equal-width">
          {{ data.weightUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="价格" class-name="equal-width">
          {{ typeof data.price === 'number' ? data.price.toFixed(2) : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="产品来源" class-name="equal-width">
          {{ data.productSource }}
        </el-descriptions-item>
        <el-descriptions-item label="创作" class-name="equal-width">
          {{ data.create }}
        </el-descriptions-item>

        <!-- 颜色信息 -->
        <el-descriptions-item label="颜色类别" class-name="equal-width">
          {{ data.colorCategory }}
        </el-descriptions-item>
        <el-descriptions-item label="颜色描述" class-name="equal-width">
          {{ data.colorDescription }}
        </el-descriptions-item>

        <!-- 状态信息 -->
        <el-descriptions-item label="完残状况" class-name="equal-width">
          {{ data.condition }}
        </el-descriptions-item>
        <el-descriptions-item label="保存状态" class-name="equal-width">
          {{ data.preservationStatus }}
        </el-descriptions-item>

        <!-- 来源信息 -->
        <el-descriptions-item label="藏品来源" class-name="equal-width">
          {{ data.collectionSource }}
        </el-descriptions-item>
        <el-descriptions-item label="艺术家" class-name="equal-width">
          {{ data.artist }}
        </el-descriptions-item>

        <!-- 日期信息 -->
        <el-descriptions-item label="入藏年度" class-name="equal-width">
          {{ data.collectionYear }}
        </el-descriptions-item>

        <!-- 时间信息 -->
        <el-descriptions-item label="入藏时间" class-name="equal-width">
          {{ data.collectionTime }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import { getDetails } from '@/api/collection/catalog'
  import type { Collection } from '@/api/collection/catalog/model'

  const props = defineProps<{
    /** 藏品ID */
    id?: number
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 藏品详情数据 */
  const data = ref<Collection>()

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.id) {
      EleMessage.error('藏品ID不能为空')
      handleClose()
      return
    }
    try {
      data.value = await getDetails(props.id)
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

<style scoped>
  .details-modal {
    :deep(.el-dialog) {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
    }
    :deep(.el-dialog__body) {
      padding: 0;
    }
  }

  .details-content {
    height: calc(80vh - 120px);
    overflow-y: auto;
    padding: 20px;
  }

  .text-content {
    white-space: pre-wrap;
    word-break: break-all;
  }

  :deep(.equal-width) {
    width: 40%;
  }
</style>
