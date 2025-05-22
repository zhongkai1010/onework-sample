<!-- 修复详情 -->
<template>
  <ele-modal
    v-model="visible"
    title="修复详情"
    width="800px"
    :destroy-on-close="true"
    @close="reset"
  >
    <div v-loading="loading" style="max-height: 600px; overflow-y: auto">
      <template v-if="data">
        <el-descriptions :column="2" border :label-width="140">
          <el-descriptions-item label="修复单号" class-name="repair-details-item">{{
            data.repairCode
          }}</el-descriptions-item>
          <el-descriptions-item label="登记日期" class-name="repair-details-item">{{
            formatDate(data.registrationDate)
          }}</el-descriptions-item>
          <el-descriptions-item label="藏品编码" class-name="repair-details-item">{{
            data.collectionCode
          }}</el-descriptions-item>
          <el-descriptions-item label="藏品名称" class-name="repair-details-item">{{
            data.collectionName
          }}</el-descriptions-item>
          <el-descriptions-item label="藏品分类" class-name="repair-details-item">{{
            data.collectionCategory
          }}</el-descriptions-item>
          <el-descriptions-item label="送修部门" class-name="repair-details-item">{{
            data.sendRepairDepartment
          }}</el-descriptions-item>
          <el-descriptions-item label="送修人" class-name="repair-details-item">{{
            data.sentBy
          }}</el-descriptions-item>
          <el-descriptions-item label="修复原因" class-name="repair-details-item">{{
            data.repairReason
          }}</el-descriptions-item>
          <el-descriptions-item label="备注" class-name="repair-details-item">{{
            data.remarks
          }}</el-descriptions-item>
          <el-descriptions-item label="送修日期" class-name="repair-details-item">{{
            formatDate(data.sendRepairDate)
          }}</el-descriptions-item>
          <el-descriptions-item label="工单状态" class-name="repair-details-item">
            <el-tag :type="data.status === 0 ? 'warning' : 'success'" effect="light">
              {{ data.status === 0 ? '修复中' : '已修复' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="承担机构" class-name="repair-details-item">{{
            data.undertakingOrganization
          }}</el-descriptions-item>
          <el-descriptions-item label="修复人" class-name="repair-details-item">{{
            data.repairPerson
          }}</el-descriptions-item>
          <el-descriptions-item label="资质证书" class-name="repair-details-item">
            <el-link v-if="parsedCertificate" :href="parsedCertificate.url" target="_blank">{{
              parsedCertificate.name
            }}</el-link>
            <span v-else>暂无证书</span>
          </el-descriptions-item>
          <el-descriptions-item label="修完日期" class-name="repair-details-item">{{
            formatDate(data.repairCompletionDate)
          }}</el-descriptions-item>
          <el-descriptions-item label="修复情况及结果" :span="2" class-name="repair-details-item">{{
            data.repairStatusAndResults
          }}</el-descriptions-item>
          <el-descriptions-item label="单据图片" :span="2" class-name="repair-details-item">
            <div
              v-if="data.documentImage"
              class="image-wrapper"
              @click="openPreview(data.documentImage)"
            >
              <el-image :src="data.documentImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </el-descriptions-item>
          <el-descriptions-item label="修复前图片" :span="2" class-name="repair-details-item">
            <div
              v-if="data.beforeRepairImage"
              class="image-wrapper"
              @click="openPreview(data.beforeRepairImage)"
            >
              <el-image :src="data.beforeRepairImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </el-descriptions-item>
          <el-descriptions-item label="修复后图片" :span="2" class-name="repair-details-item">
            <div
              v-if="data.afterRepairImage"
              class="image-wrapper"
              @click="openPreview(data.afterRepairImage)"
            >
              <el-image :src="data.afterRepairImage" fit="contain" />
            </div>
            <el-empty v-else description="暂无图片" />
          </el-descriptions-item>
        </el-descriptions>
      </template>

      <!-- 图片预览组件 -->
      <ele-image-viewer
        v-model="showImageViewer"
        :urlList="viewerImages"
        :initialIndex="viewerIndex"
        :infinite="false"
        :hide-on-click-modal="true"
      />
    </div>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { Repair } from '@/api/collection/repair/model'
  import { getRepairDetails } from '@/api/collection/repair'
  import dayjs from 'dayjs'

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

  /* ==================== 计算属性 ==================== */
  const parsedCertificate = computed(() => {
    if (!data.value?.qualificationCertificate) return null
    try {
      return JSON.parse(data.value.qualificationCertificate)
    } catch (e) {
      return null
    }
  })

  /* ==================== 工具函数 ==================== */
  const formatDate = (date: string | undefined) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : ''
  }
</script>

<style lang="scss" scoped>
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
  :deep(.repair-details-item) {
    width: 30% !important;
  }
</style>
