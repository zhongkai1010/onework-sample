<!-- 登记盘盈弹窗 -->
<template>
  <ele-modal form v-model="visible" title="登记盘盈" width="80%" position="center">
    <div class="form-content">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
        <el-row :gutter="16">
          <!-- 基本信息 -->
          <el-col :span="8">
            <el-form-item label="藏品名称" prop="collectionName">
              <el-input v-model="form.collectionName" placeholder="请输入藏品名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="藏品类别" prop="categoryId">
              <category-select
                v-model="form.categoryId"
                placeholder="请选择藏品类别"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文物级别" prop="culturalLevel">
              <dict-data
                :code="DIC_KEY_CULTURAL_LEVEL"
                v-model="form.culturalLevel"
                placeholder="文物级别"
              />
            </el-form-item>
          </el-col>

          <!-- 编号信息 -->
          <el-col :span="8">
            <el-form-item label="编号分类" prop="numberCategory">
              <dict-data
                :code="DIC_KEY_CODE_CATEGORY"
                v-model="form.numberCategory"
                placeholder="请选择编号分类"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="藏品编号" prop="code">
              <el-input v-model="form.code" placeholder="请输入藏品编号" clearable />
            </el-form-item>
          </el-col>
          <!-- 数量信息 -->
          <el-col :span="8">
            <el-form-item label="数量" prop="quantity">
              <el-input-number
                v-model="form.quantity"
                :min="0"
                placeholder="请输入数量"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量单位" prop="unit">
              <dict-data
                :code="DIC_KEY_QUANTITY_UNIT"
                v-model="form.unit"
                placeholder="请输入数量单位"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="年代" prop="era">
              <el-input v-model="form.era" placeholder="请输入年代" clearable />
            </el-form-item>
          </el-col>

          <!-- 地域信息 -->
          <el-col :span="8">
            <el-form-item label="地域类型" prop="regionType">
              <dict-data
                :code="DIC_KEY_REGION_TYPE"
                v-model="form.regionType"
                placeholder="请输入地域类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地域" prop="region">
              <el-input v-model="form.region" placeholder="请输入地域" clearable />
            </el-form-item>
          </el-col>

          <!-- 质地信息 -->
          <el-col :span="8">
            <el-form-item label="质地类型" prop="materialType">
              <dict-data
                :code="DIC_KEY_TEXTURE_TYPE"
                v-model="form.materialType"
                placeholder="请输入质地类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="质地" prop="material">
              <el-input v-model="form.material" placeholder="请输入质地" clearable />
            </el-form-item>
          </el-col>

          <!-- 尺寸信息 -->
          <el-col :span="8">
            <el-form-item label="通长(底径cm)" prop="overallLength">
              <el-input-number
                v-model="form.overallLength"
                :min="0"
                placeholder="请输入通长"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通宽(口径cm)" prop="overallWidth">
              <el-input-number
                v-model="form.overallWidth"
                :min="0"
                placeholder="请输入通宽"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通高(cm)" prop="totalHeight">
              <el-input-number
                v-model="form.totalHeight"
                :min="0"
                placeholder="请输入通高"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体尺寸" prop="specificDimensions">
              <el-input v-model="form.specificDimensions" placeholder="请输入具体尺寸" clearable />
            </el-form-item>
          </el-col>

          <!-- 质量信息 -->
          <el-col :span="8">
            <el-form-item label="质量范围" prop="weightRange">
              <dict-data
                :code="DIC_KEY_QUALITY_RANGE"
                v-model="form.weightRange"
                placeholder="请输入质量范围"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体质量" prop="specificWeight">
              <el-input-number
                v-model="form.specificWeight"
                :min="0"
                placeholder="请输入具体质量"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="质量单位" prop="weightUnit">
              <dict-data
                :code="DIC_KEY_QUALITY_UNIT"
                v-model="form.weightUnit"
                placeholder="请输入质量单位"
              />
            </el-form-item>
          </el-col>

          <!-- 颜色信息 -->
          <el-col :span="8">
            <el-form-item label="颜色类别" prop="colorCategory">
              <dict-data
                :code="DIC_KEY_COLOR_CATEGORY"
                v-model="form.colorCategory"
                placeholder="请输入颜色类别"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="颜色描述" prop="colorDescription">
              <el-input v-model="form.colorDescription" placeholder="请输入颜色描述" clearable />
            </el-form-item>
          </el-col>

          <!-- 状态信息 -->
          <el-col :span="8">
            <el-form-item label="完残状况" prop="condition">
              <dict-data
                :code="DIC_KEY_COMPLETENESS"
                v-model="form.condition"
                placeholder="请输入完残状况"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保存状态" prop="preservationStatus">
              <dict-data
                :code="DIC_KEY_PRESERVATION_STATUS"
                v-model="form.preservationStatus"
                placeholder="请输入保存状态"
              />
            </el-form-item>
          </el-col>

          <!-- 来源信息 -->
          <el-col :span="8">
            <el-form-item label="藏品来源" prop="collectionSource">
              <dict-data
                :code="DIC_KEY_COLLECTION_SOURCE"
                v-model="form.collectionSource"
                placeholder="请输入藏品来源"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="艺术家" prop="artist">
              <el-input v-model="form.artist" placeholder="请输入艺术家" clearable />
            </el-form-item>
          </el-col>

          <!-- 日期信息 -->
          <el-col :span="8">
            <el-form-item label="征集日期" prop="collectionDate">
              <el-date-picker
                v-model="form.collectionDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择征集日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏日期范围" prop="collectionDateRange">
              <dict-data
                :code="DIC_KEY_ACQUISITION_DATE_RANGE"
                v-model="form.collectionDateRange"
                placeholder="请输入入藏日期范围"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏年度" prop="collectionYear">
              <el-date-picker
                v-model="form.collectionYear"
                type="year"
                value-format="YYYY"
                placeholder="请选择入藏年度"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 时间信息 -->
          <el-col :span="8">
            <el-form-item label="入馆时间" prop="museumEntryTime">
              <el-date-picker
                v-model="form.museumEntryTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择入馆时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏时间" prop="collectionTime">
              <el-date-picker
                v-model="form.collectionTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择入藏时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录时间" prop="loginTime">
              <el-date-picker
                v-model="form.loginTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择登录时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入柜时间" prop="cabinetEntryTime">
              <el-date-picker
                v-model="form.cabinetEntryTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择入柜时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 类型信息 -->
          <el-col :span="8">
            <el-form-item label="类型" prop="type">
              <dict-data
                :code="DIC_KEY_COLLECTION_TYPE"
                v-model="form.type"
                placeholder="请输入类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人文类型" prop="culturalType">
              <dict-data
                :code="DIC_KEY_HUMANITIES_TYPE"
                v-model="form.culturalType"
                placeholder="请输入人文类型"
              />
            </el-form-item>
          </el-col>

          <!-- 多媒体信息 -->
          <el-col :span="8">
            <el-form-item label="文本类型" prop="textType">
              <dict-data
                :code="DIC_KEY_TEXT_TYPE"
                v-model="form.textType"
                placeholder="请输入文本类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="声像载体类型" prop="audioVisualCarrierType">
              <dict-data
                :code="DIC_KEY_AUDIOVISUAL_CARRIER_TYPE"
                v-model="form.audioVisualCarrierType"
                placeholder="请输入声像载体类型"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="声像载体存放位置" prop="audioVisualStorageLocation">
              <el-input
                v-model="form.audioVisualStorageLocation"
                placeholder="请输入声像载体存放位置"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计算机磁盘路径" prop="diskPath">
              <el-input v-model="form.diskPath" placeholder="请输入计算机磁盘路径" clearable />
            </el-form-item>
          </el-col>

          <!-- 文本信息 -->
          <el-col :span="24">
            <el-form-item label="藏品介绍" prop="collectionIntroduction">
              <el-input
                v-model="form.collectionIntroduction"
                type="textarea"
                placeholder="请输入藏品介绍"
                :rows="3"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="notes">
              <el-input v-model="form.notes" type="textarea" placeholder="请输入备注" :rows="3" />
            </el-form-item>
          </el-col>

          <!-- 图片信息 -->
          <el-col :span="24">
            <el-form-item label="图片信息" prop="imageInfo">
              <CommonUpload
                v-model="imageUploadValue"
                :limit="1"
                accept="image/*"
                :multiple="false"
                :drag="false"
                listType="image"
                style="width: 178px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="save">保 存</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { AddInventoryCheckCollectionParams } from '@/api/inventory-check/check/model'
  import { addInventoryCheckCollection } from '@/api/inventory-check/check'
  import { CategorySelect } from '@/components/CustomForm'
  import CommonUpload from '@/components/CommonUpload/index.vue'
  import DictData from '@/components/DictData/index.vue'
  import {
    DIC_KEY_CULTURAL_LEVEL,
    DIC_KEY_QUALITY_UNIT,
    DIC_KEY_CODE_CATEGORY,
    DIC_KEY_PRESERVATION_STATUS,
    DIC_KEY_QUANTITY_UNIT,
    DIC_KEY_HUMANITIES_TYPE,
    DIC_KEY_TEXT_TYPE,
    DIC_KEY_AUDIOVISUAL_CARRIER_TYPE,
    DIC_KEY_COLLECTION_TYPE,
    DIC_KEY_COLLECTION_SOURCE,
    DIC_KEY_COMPLETENESS,
    DIC_KEY_COLOR_CATEGORY,
    DIC_KEY_QUALITY_RANGE,
    DIC_KEY_REGION_TYPE,
    DIC_KEY_TEXTURE_TYPE,
    DIC_KEY_ACQUISITION_DATE_RANGE
  } from '@/config/setting'

  /** 图片上传的值 */
  const imageUploadValue = ref<any[]>([])

  const props = defineProps<{
    /** 计划ID */
    planId: string
  }>()

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<AddInventoryCheckCollectionParams>({
    planId: 0,
    collectionName: '',
    categoryId: 0,
    culturalLevel: '',
    numberCategory: '',
    code: '',
    quantity: 0,
    unit: '',
    era: '',
    regionType: '',
    region: '',
    materialType: '',
    material: '',
    overallLength: 0,
    overallWidth: 0,
    totalHeight: 0,
    specificDimensions: '',
    weightRange: '',
    specificWeight: 0,
    weightUnit: '',
    colorCategory: '',
    colorDescription: '',
    condition: '',
    preservationStatus: '',
    collectionSource: '',
    artist: '',
    collectionDate: '',
    collectionDateRange: [] as any,
    collectionYear: '',
    museumEntryTime: '',
    collectionTime: '',
    loginTime: '',
    cabinetEntryTime: '',
    type: '',
    culturalType: '',
    collectionIntroduction: '',
    textType: '',
    audioVisualCarrierType: '',
    audioVisualStorageLocation: '',
    diskPath: '',
    notes: '',
    imageInfo: '',
    warehouseId: 0
  })

  /** 表单验证规则 */
  const rules = {
    collectionName: [{ required: true, message: '请输入藏品名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入藏品编号', trigger: 'blur' }]
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    resetFields()
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        try {
          loading.value = true
          // 取图片url
          const imageUrl = imageUploadValue.value.length > 0 ? imageUploadValue.value[0].url : ''
          await addInventoryCheckCollection({
            ...form,
            planId: Number(props.planId),
            imageInfo: imageUrl
          })
          EleMessage.success('登记盘盈成功')
          handleCancel()
          emit('done')
        } catch (error: any) {
          EleMessage.error(error.message || '登记盘盈失败')
        } finally {
          loading.value = false
        }
      }
    })
  }
</script>

<style scoped>
  .form-modal {
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

  .form-content {
    height: calc(80vh - 120px);
    overflow-y: auto;
    padding: 20px;
  }
</style>
