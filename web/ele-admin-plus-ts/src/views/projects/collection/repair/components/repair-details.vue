<!-- 修复详情 -->
<template>
  <ele-modal
    v-model="visible"
    title="修复详情"
    width="800px"
    :destroy-on-close="true"
    @close="reset"
  >
    <div class="details-content" v-loading="loading">
      <template v-if="data">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="修复单号">{{ data.repairCode }}</el-descriptions-item>
          <el-descriptions-item label="登记日期">{{ data.registrationDate }}</el-descriptions-item>
          <el-descriptions-item label="藏品编码">{{ data.collectionCode }}</el-descriptions-item>
          <el-descriptions-item label="藏品名称">{{ data.collectionName }}</el-descriptions-item>
          <el-descriptions-item label="藏品分类">{{
            data.collectionCategory
          }}</el-descriptions-item>
          <el-descriptions-item label="送修部门">{{
            data.sendRepairDepartment
          }}</el-descriptions-item>
          <el-descriptions-item label="送修人">{{ data.sentBy }}</el-descriptions-item>
          <el-descriptions-item label="修复原因">{{ data.repairReason }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ data.remarks }}</el-descriptions-item>
          <el-descriptions-item label="送修日期">{{ data.sendRepairDate }}</el-descriptions-item>
          <el-descriptions-item label="工单状态">
            <el-tag :type="data.status === 0 ? 'warning' : 'success'" effect="light">
              {{ data.status === 0 ? '修复中' : '已修复' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="承担机构">{{
            data.undertakingOrganization
          }}</el-descriptions-item>
          <el-descriptions-item label="修复人">{{ data.repairPerson }}</el-descriptions-item>
          <el-descriptions-item label="资质证书">{{
            data.qualificationCertificate
          }}</el-descriptions-item>
          <el-descriptions-item label="修完日期">{{
            data.repairCompletionDate
          }}</el-descriptions-item>
          <el-descriptions-item label="修复情况及结果" :span="2">{{
            data.repairStatusAndResults
          }}</el-descriptions-item>
        </el-descriptions>

        <div class="image-section">
          <div class="image-item">
            <h3>单据图片</h3>
            <div
              v-if="data.documentImage"
              class="image-wrapper"
              @click="openPreview(data.documentImage)"
            >
              <el-image :src="data.documentImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </div>
          <div class="image-item">
            <h3>修复前图片</h3>
            <div
              v-if="data.beforeRepairImage"
              class="image-wrapper"
              @click="openPreview(data.beforeRepairImage)"
            >
              <el-image :src="data.beforeRepairImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </div>
          <div class="image-item">
            <h3>修复后图片</h3>
            <div
              v-if="data.afterRepairImage"
              class="image-wrapper"
              @click="openPreview(data.afterRepairImage)"
            >
              <el-image :src="data.afterRepairImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </div>
        </div>
      </template>
    </div>

    <!-- 图片预览组件 -->
    <ele-image-viewer v-model="showImageViewer" :images="viewerImages" :index="viewerIndex" />
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Repair } from '@/api/collection/repair/model'
  import { getRepairDetails } from '@/api/collection/repair'

  /* ==================== 状态管理 ==================== */
  const visible = defineModel<boolean>({ type: Boolean })
  const props = defineProps<{
    id?: number
  }>()

  /* ==================== 数据管理 ==================== */
  const loading = ref(false)
  const data = ref<Repair>()
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  /* ==================== 数据加载 ==================== */
  /**
   * 加载修复详情
   */
  const loadData = async (id: number) => {
    loading.value = true
    try {
      data.value = await getRepairDetails(id)
    } catch (e: any) {
      EleMessage.error(e.message)
      visible.value = false
    } finally {
      loading.value = false
    }
  }

  /**
   * 重置数据
   */
  const reset = () => {
    data.value = undefined
  }

  /**
   * 打开图片预览
   */
  const openPreview = (image: string) => {
    if (!image) return
    viewerImages.value = [image]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /* ==================== 监听数据变化 ==================== */
  watch(
    [() => visible.value, () => props.id],
    ([visible, id]) => {
      if (visible && id) {
        loadData(id)
      } else {
        reset()
      }
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  .details-content {
    padding: 20px;
  }

  .image-section {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .image-item {
      h3 {
        margin: 0 0 10px;
        font-size: 14px;
        color: #606266;
      }

      .image-wrapper {
        width: 100%;
        height: 200px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s;

        &:hover {
          border-color: #409eff;
          box-shadow: 0 0 8px rgba(64, 158, 255, 0.2);
        }

        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
