<!-- 修复单据打印 -->
<template>
  <ele-modal v-model="visible" title="打印单据" width="900px" :destroy-on-close="true" @close="reset">
    <div class="print-content" v-loading="loading">
      <div class="document-content">
        <template v-if="data">
          <div class="document-header">
            <h2>修复单据</h2>
          </div>
          <div class="document-info">
            <div class="info-item">
              <span class="label">修复单号：</span>
              <span class="value">{{ data.repairCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">登记日期：</span>
              <span class="value">{{ data.registrationDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品编码：</span>
              <span class="value">{{ data.collectionCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品名称：</span>
              <span class="value">{{ data.collectionName }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品分类：</span>
              <span class="value">{{ data.collectionCategory }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修部门：</span>
              <span class="value">{{ data.sendRepairDepartment }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修人：</span>
              <span class="value">{{ data.sentBy }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复原因：</span>
              <span class="value">{{ data.repairReason }}</span>
            </div>
            <div class="info-item">
              <span class="label">备注：</span>
              <span class="value">{{ data.remarks }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修日期：</span>
              <span class="value">{{ data.sendRepairDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">工单状态：</span>
              <span class="value">{{ data.status === 0 ? '待修复' : data.status === 1 ? '修复中' : '已完成' }}</span>
            </div>
            <div class="info-item">
              <span class="label">承担机构：</span>
              <span class="value">{{ data.undertakingOrganization }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复人：</span>
              <span class="value">{{ data.repairPerson }}</span>
            </div>
            <div class="info-item">
              <span class="label">资质证书：</span>
              <span class="value">{{ data.qualificationCertificate }}</span>
            </div>
            <div class="info-item">
              <span class="label">修完日期：</span>
              <span class="value">{{ data.repairCompletionDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复情况及结果：</span>
              <span class="value">{{ data.repairStatusAndResults }}</span>
            </div>
          </div>
          <div class="document-image" v-if="data.documentImage">
            <img :src="data.documentImage" alt="单据图片" />
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="handlePrint">打印</el-button>
    </template>
    <ele-printer v-model="printing" target="_iframe">
      <div class="print-page">
        <div class="document-content">
          <div class="document-header">
            <h2>修复单据</h2>
          </div>
          <div class="document-info">
            <div class="info-item">
              <span class="label">修复单号：</span>
              <span class="value">{{ data?.repairCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">登记日期：</span>
              <span class="value">{{ data?.registrationDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品编码：</span>
              <span class="value">{{ data?.collectionCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品名称：</span>
              <span class="value">{{ data?.collectionName }}</span>
            </div>
            <div class="info-item">
              <span class="label">藏品分类：</span>
              <span class="value">{{ data?.collectionCategory }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修部门：</span>
              <span class="value">{{ data?.sendRepairDepartment }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修人：</span>
              <span class="value">{{ data?.sentBy }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复原因：</span>
              <span class="value">{{ data?.repairReason }}</span>
            </div>
            <div class="info-item">
              <span class="label">备注：</span>
              <span class="value">{{ data?.remarks }}</span>
            </div>
            <div class="info-item">
              <span class="label">送修日期：</span>
              <span class="value">{{ data?.sendRepairDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">工单状态：</span>
              <span class="value">{{ data?.status === 0 ? '待修复' : data?.status === 1 ? '修复中' : '已完成' }}</span>
            </div>
            <div class="info-item">
              <span class="label">承担机构：</span>
              <span class="value">{{ data?.undertakingOrganization }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复人：</span>
              <span class="value">{{ data?.repairPerson }}</span>
            </div>
            <div class="info-item">
              <span class="label">资质证书：</span>
              <span class="value">{{ data?.qualificationCertificate }}</span>
            </div>
            <div class="info-item">
              <span class="label">修完日期：</span>
              <span class="value">{{ data?.repairCompletionDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">修复情况及结果：</span>
              <span class="value">{{ data?.repairStatusAndResults }}</span>
            </div>
          </div>
          <div class="document-image" v-if="data?.documentImage">
            <img :src="data.documentImage" alt="单据图片" />
          </div>
        </div>
      </div>
    </ele-printer>
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
  const printing = ref(false)

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
   * 打印单据
   */
  const handlePrint = () => {
    printing.value = true
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
  .print-content {
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }

  .print-page {
    padding: 20px;
  }

  .document-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .document-header {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      margin: 0;
      font-size: 24px;
      color: #303133;
    }
  }

  .document-info {
    margin-bottom: 20px;
  }

  .info-item {
    margin-bottom: 10px;
    display: flex;
    line-height: 1.5;

    .label {
      width: 120px;
      color: #606266;
      font-weight: 500;
    }

    .value {
      flex: 1;
      color: #303133;
    }
  }

  .document-image {
    text-align: center;
    margin-top: 20px;

    img {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
  }
</style>
