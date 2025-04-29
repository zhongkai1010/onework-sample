<!-- 藏品详情弹窗 -->
<template>
  <ele-modal
    :width="'900px'"
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
        <el-descriptions-item label="藏品状态">
          <el-tag :type="getStatusType(data.collectionStatus)" effect="light">
            {{ data.collectionStatus }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="藏品编号">
          {{ data.collectionCode }}
        </el-descriptions-item>
        <el-descriptions-item label="编号类别">
          {{ data.numberCategory }}
        </el-descriptions-item>
        <el-descriptions-item label="藏品类别">
          {{ data.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="RFID编号">
          {{ data.rfidCode }}
        </el-descriptions-item>
        <el-descriptions-item label="文物级别">
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
        <el-descriptions-item label="数量">
          {{ data.quantity }}
        </el-descriptions-item>
        <el-descriptions-item label="数量单位">
          {{ data.unit }}
        </el-descriptions-item>

        <!-- 年代信息 -->
        <el-descriptions-item label="年代类型">
          {{ data.eraType }}
        </el-descriptions-item>
        <el-descriptions-item label="年代">
          {{ data.era }}
        </el-descriptions-item>

        <!-- 地域信息 -->
        <el-descriptions-item label="地域类型">
          {{ data.regionType }}
        </el-descriptions-item>
        <el-descriptions-item label="地域">
          {{ data.region }}
        </el-descriptions-item>

        <!-- 质地信息 -->
        <el-descriptions-item label="质地类型">
          {{ data.materialType }}
        </el-descriptions-item>
        <el-descriptions-item label="质地">
          {{ data.material }}
        </el-descriptions-item>

        <!-- 尺寸信息 -->
        <el-descriptions-item label="通长(底径cm)">
          {{ data.overallLength }}
        </el-descriptions-item>
        <el-descriptions-item label="通宽(口径cm)">
          {{ data.overallWidth }}
        </el-descriptions-item>
        <el-descriptions-item label="通高(cm)">
          {{ data.totalHeight }}
        </el-descriptions-item>
        <el-descriptions-item label="具体尺寸">
          {{ data.specificDimensions }}
        </el-descriptions-item>

        <!-- 质量信息 -->
        <el-descriptions-item label="质量范围">
          {{ data.weightRange }}
        </el-descriptions-item>
        <el-descriptions-item label="具体质量">
          {{ data.specificWeight }}
        </el-descriptions-item>
        <el-descriptions-item label="质量单位">
          {{ data.weightUnit }}
        </el-descriptions-item>

        <!-- 颜色信息 -->
        <el-descriptions-item label="颜色类别">
          {{ data.colorCategory }}
        </el-descriptions-item>
        <el-descriptions-item label="颜色描述">
          {{ data.colorDescription }}
        </el-descriptions-item>

        <!-- 状态信息 -->
        <el-descriptions-item label="完残状况">
          {{ data.condition }}
        </el-descriptions-item>
        <el-descriptions-item label="保存状态">
          {{ data.preservationStatus }}
        </el-descriptions-item>

        <!-- 来源信息 -->
        <el-descriptions-item label="藏品来源">
          {{ data.collectionSource }}
        </el-descriptions-item>
        <el-descriptions-item label="艺术家">
          {{ data.artist }}
        </el-descriptions-item>

        <!-- 日期信息 -->
        <el-descriptions-item label="征集日期">
          {{ data.collectionDate }}
        </el-descriptions-item>
        <el-descriptions-item label="入藏日期范围">
          {{ data.collectionDateRange }}
        </el-descriptions-item>
        <el-descriptions-item label="入藏年度">
          {{ data.collectionYear }}
        </el-descriptions-item>

        <!-- 时间信息 -->
        <el-descriptions-item label="入馆时间">
          {{ data.museumEntryTime }}
        </el-descriptions-item>
        <el-descriptions-item label="入藏时间">
          {{ data.collectionTime }}
        </el-descriptions-item>
        <el-descriptions-item label="登录时间">
          {{ data.loginTime }}
        </el-descriptions-item>
        <el-descriptions-item label="入柜时间">
          {{ data.cabinetEntryTime }}
        </el-descriptions-item>

        <!-- 类型信息 -->
        <el-descriptions-item label="类型">
          {{ data.type }}
        </el-descriptions-item>
        <el-descriptions-item label="人文类型">
          {{ data.culturalType }}
        </el-descriptions-item>

        <!-- 多媒体信息 -->
        <el-descriptions-item label="文本类型">
          {{ data.textType }}
        </el-descriptions-item>
        <el-descriptions-item label="声像载体类型">
          {{ data.audioVisualCarrierType }}
        </el-descriptions-item>
        <el-descriptions-item label="声像载体存放位置">
          {{ data.audioVisualStorageLocation }}
        </el-descriptions-item>
        <el-descriptions-item label="计算机磁盘路径">
          {{ data.diskPath }}
        </el-descriptions-item>

        <!-- 文本信息 -->
        <el-descriptions-item label="藏品介绍" :span="2">
          <div class="text-content">{{ data.collectionIntroduction }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">
          <div class="text-content">{{ data.notes }}</div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EleMessage } from 'ele-admin-plus/es';
  import { getDetails } from '@/api/collection/catalog';
  import type { Collection } from '@/api/collection/catalog/model';

  const props = defineProps<{
    /** 藏品ID */
    id?: number;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 藏品详情数据 */
  const data = ref<Collection>();

  /** 获取状态类型对应的标签类型 */
  const getStatusType = (status: string) => {
    switch (status) {
      case '待审核':
        return 'warning';
      case '已审核':
        return 'success';
      case '已退回':
        return 'danger';
      default:
        return 'info';
    }
  };

  /** 弹窗打开事件 */
  const handleOpen = async () => {
    if (!props.id) {
      EleMessage.error('藏品ID不能为空');
      handleClose();
      return;
    }
    try {
      data.value = await getDetails(props.id);
    } catch (e: any) {
      if (e.message) {
        EleMessage.error(e.message);
      }
      handleClose();
    }
  };

  /** 关闭弹窗 */
  const handleClose = () => {
    visible.value = false;
    data.value = undefined;
  };
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
</style>
