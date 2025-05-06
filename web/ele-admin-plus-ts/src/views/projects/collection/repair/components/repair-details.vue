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
            <el-tag
              :type="data.status === 0 ? 'warning' : data.status === 1 ? 'success' : 'info'"
              effect="light"
            >
              {{ data.status === 0 ? '待修复' : data.status === 1 ? '修复中' : '已完成' }}
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
            <el-image
              v-if="data.documentImage"
              :src="data.documentImage"
              :preview-src-list="[data.documentImage]"
              fit="contain"
            />
            <el-empty v-else description="暂无图片" />
          </div>
          <div class="image-item">
            <h3>修复前图片</h3>
            <el-image
              v-if="data.beforeRepairImage"
              :src="data.beforeRepairImage"
              :preview-src-list="[data.beforeRepairImage]"
              fit="contain"
            />
            <el-empty v-else description="暂无图片" />
          </div>
          <div class="image-item">
            <h3>修复后图片</h3>
            <el-image
              v-if="data.afterRepairImage"
              :src="data.afterRepairImage"
              :preview-src-list="[data.afterRepairImage]"
              fit="contain"
            />
            <el-empty v-else description="暂无图片" />
          </div>
        </div>
      </template>
    </div>
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

  /* ==================== 监听数据变化 ==================== */
  watch(
    () => props.id,
    (id) => {
      if (id) {
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

      .el-image {
        width: 100%;
        height: 200px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
    }
  }
</style>
