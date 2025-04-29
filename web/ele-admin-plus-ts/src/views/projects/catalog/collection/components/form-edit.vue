<!-- 藏品编辑弹窗 -->
<template>
  <ele-modal form :width="'80%'" v-model="visible" :title="isUpdate ? '修改藏品' : '添加藏品'" @open="handleOpen" class="form-modal" position="center">
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
              <category-select v-model="form.categoryId" placeholder="请选择藏品类别" clearable style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文物级别" prop="culturalLevel">
              <el-input v-model="form.culturalLevel" placeholder="请输入文物级别" clearable />
            </el-form-item>
          </el-col>

          <!-- 编号信息 -->
          <el-col :span="8">
            <el-form-item label="编号类别" prop="numberCategory">
              <el-input v-model="form.numberCategory" placeholder="请输入编号类别" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="藏品编号" prop="code">
              <el-input v-model="form.code" placeholder="请输入藏品编号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="RFID编号" prop="rfidCode">
              <el-input v-model="form.rfidCode" placeholder="请输入RFID编号" clearable />
            </el-form-item>
          </el-col>

          <!-- 数量信息 -->
          <el-col :span="8">
            <el-form-item label="数量" prop="quantity">
              <el-input-number v-model="form.quantity" :min="0" placeholder="请输入数量" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量单位" prop="unit">
              <el-input v-model="form.unit" placeholder="请输入数量单位" clearable />
            </el-form-item>
          </el-col>

          <!-- 年代信息 -->
          <el-col :span="8">
            <el-form-item label="年代类型" prop="eraType">
              <el-input v-model="form.eraType" placeholder="请输入年代类型" clearable />
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
              <el-input v-model="form.regionType" placeholder="请输入地域类型" clearable />
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
              <el-input v-model="form.materialType" placeholder="请输入质地类型" clearable />
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
              <el-input-number v-model="form.overallLength" :min="0" placeholder="请输入通长" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通宽(口径cm)" prop="overallWidth">
              <el-input-number v-model="form.overallWidth" :min="0" placeholder="请输入通宽" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通高(cm)" prop="totalHeight">
              <el-input-number v-model="form.totalHeight" :min="0" placeholder="请输入通高" style="width: 100%" />
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
              <el-input v-model="form.weightRange" placeholder="请输入质量范围" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体质量" prop="specificWeight">
              <el-input-number v-model="form.specificWeight" :min="0" placeholder="请输入具体质量" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="质量单位" prop="weightUnit">
              <el-input v-model="form.weightUnit" placeholder="请输入质量单位" clearable />
            </el-form-item>
          </el-col>

          <!-- 颜色信息 -->
          <el-col :span="8">
            <el-form-item label="颜色类别" prop="colorCategory">
              <el-input v-model="form.colorCategory" placeholder="请输入颜色类别" clearable />
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
              <el-input v-model="form.condition" placeholder="请输入完残状况" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保存状态" prop="preservationStatus">
              <el-input v-model="form.preservationStatus" placeholder="请输入保存状态" clearable />
            </el-form-item>
          </el-col>

          <!-- 来源信息 -->
          <el-col :span="8">
            <el-form-item label="藏品来源" prop="collectionSource">
              <el-input v-model="form.collectionSource" placeholder="请输入藏品来源" clearable />
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
              <el-date-picker v-model="form.collectionDate" type="date" placeholder="请选择征集日期" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏日期范围" prop="collectionDateRange">
              <el-date-picker v-model="form.collectionDateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏年度" prop="collectionYear">
              <el-input v-model="form.collectionYear" placeholder="请输入入藏年度" clearable />
            </el-form-item>
          </el-col>

          <!-- 时间信息 -->
          <el-col :span="8">
            <el-form-item label="入馆时间" prop="museumEntryTime">
              <el-date-picker v-model="form.museumEntryTime" type="datetime" placeholder="请选择入馆时间" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入藏时间" prop="collectionTime">
              <el-date-picker v-model="form.collectionTime" type="datetime" placeholder="请选择入藏时间" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录时间" prop="loginTime">
              <el-date-picker v-model="form.loginTime" type="datetime" placeholder="请选择登录时间" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入柜时间" prop="cabinetEntryTime">
              <el-date-picker v-model="form.cabinetEntryTime" type="datetime" placeholder="请选择入柜时间" style="width: 100%" />
            </el-form-item>
          </el-col>

          <!-- 类型信息 -->
          <el-col :span="8">
            <el-form-item label="类型" prop="type">
              <el-input v-model="form.type" placeholder="请输入类型" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人文类型" prop="culturalType">
              <el-input v-model="form.culturalType" placeholder="请输入人文类型" clearable />
            </el-form-item>
          </el-col>

          <!-- 多媒体信息 -->
          <el-col :span="8">
            <el-form-item label="文本类型" prop="textType">
              <el-input v-model="form.textType" placeholder="请输入文本类型" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="声像载体类型" prop="audioVisualCarrierType">
              <el-input v-model="form.audioVisualCarrierType" placeholder="请输入声像载体类型" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="声像载体存放位置" prop="audioVisualStorageLocation">
              <el-input v-model="form.audioVisualStorageLocation" placeholder="请输入声像载体存放位置" clearable />
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
              <el-input v-model="form.collectionIntroduction" type="textarea" placeholder="请输入藏品介绍" :rows="3" />
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
              <el-upload class="avatar-uploader" action="#" :show-file-list="false" :before-upload="beforeImageUpload">
                <img v-if="form.imageInfo" :src="form.imageInfo" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { Collection, AddCollectionParams } from '@/api/collection/catalog/model'
  import { register, update } from '@/api/collection/catalog'
  import { CategorySelect } from '@/components/CustomForm'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Collection
  }>()

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 是否是修改 */
  const isUpdate = ref(false)

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<AddCollectionParams>({
    imageInfo: '',
    numberCategory: '',
    code: '',
    collectionName: '',
    categoryId: 0,
    rfidCode: '',
    quantity: 0,
    unit: '',
    eraType: '',
    era: '',
    artist: '',
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
    culturalLevel: '',
    collectionSource: '',
    condition: '',
    preservationStatus: '',
    collectionDate: '',
    collectionDateRange: '',
    collectionYear: '',
    type: '',
    culturalType: '',
    collectionIntroduction: '',
    textType: '',
    audioVisualCarrierType: '',
    audioVisualStorageLocation: '',
    diskPath: '',
    colorCategory: '',
    colorDescription: '',
    notes: '',
    museumEntryTime: '',
    collectionTime: '',
    loginTime: '',
    cabinetEntryTime: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    collectionName: [
      {
        required: true,
        message: '请输入藏品名称',
        type: 'string',
        trigger: 'blur'
      }
    ],
    categoryId: [
      {
        required: true,
        message: '请选择藏品类别',
        type: 'number',
        trigger: 'change'
      }
    ],
    material: [
      {
        required: true,
        message: '请输入质地',
        type: 'string',
        trigger: 'blur'
      }
    ]
  })

  /** 图片上传前的处理 */
  const beforeImageUpload = (_file: File) => {
    // TODO: Implement image upload logic
    return false
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return
      }
      loading.value = true
      if (isUpdate.value && props.data) {
        // For update operation, we need to include all required fields from props.data
        const updateData: Collection = {
          ...props.data,
          ...form,
          // Ensure required fields are not undefined
          imageInfo: form.imageInfo ?? props.data.imageInfo,
          numberCategory: form.numberCategory ?? props.data.numberCategory,
          collectionCode: form.code ?? props.data.collectionCode,
          collectionName: form.collectionName ?? props.data.collectionName,
          categoryId: form.categoryId ?? props.data.categoryId,
          rfidCode: form.rfidCode ?? props.data.rfidCode,
          quantity: form.quantity ?? props.data.quantity,
          unit: form.unit ?? props.data.unit,
          eraType: form.eraType ?? props.data.eraType,
          era: form.era ?? props.data.era,
          artist: form.artist ?? props.data.artist,
          regionType: form.regionType ?? props.data.regionType,
          region: form.region ?? props.data.region,
          materialType: form.materialType ?? props.data.materialType,
          material: form.material ?? props.data.material,
          overallLength: form.overallLength ?? props.data.overallLength,
          overallWidth: form.overallWidth ?? props.data.overallWidth,
          totalHeight: form.totalHeight ?? props.data.totalHeight,
          specificDimensions: form.specificDimensions ?? props.data.specificDimensions,
          weightRange: form.weightRange ?? props.data.weightRange,
          specificWeight: form.specificWeight ?? props.data.specificWeight,
          weightUnit: form.weightUnit ?? props.data.weightUnit,
          culturalLevel: form.culturalLevel ?? props.data.culturalLevel,
          collectionSource: form.collectionSource ?? props.data.collectionSource,
          condition: form.condition ?? props.data.condition,
          preservationStatus: form.preservationStatus ?? props.data.preservationStatus,
          collectionDate: form.collectionDate ?? props.data.collectionDate,
          collectionDateRange: form.collectionDateRange ?? props.data.collectionDateRange,
          collectionYear: form.collectionYear ?? props.data.collectionYear,
          type: form.type ?? props.data.type,
          culturalType: form.culturalType ?? props.data.culturalType,
          collectionIntroduction: form.collectionIntroduction ?? props.data.collectionIntroduction,
          textType: form.textType ?? props.data.textType,
          audioVisualCarrierType: form.audioVisualCarrierType ?? props.data.audioVisualCarrierType,
          audioVisualStorageLocation: form.audioVisualStorageLocation ?? props.data.audioVisualStorageLocation,
          diskPath: form.diskPath ?? props.data.diskPath,
          colorCategory: form.colorCategory ?? props.data.colorCategory,
          colorDescription: form.colorDescription ?? props.data.colorDescription,
          notes: form.notes ?? props.data.notes,
          museumEntryTime: form.museumEntryTime ?? props.data.museumEntryTime,
          collectionTime: form.collectionTime ?? props.data.collectionTime,
          loginTime: form.loginTime ?? props.data.loginTime,
          cabinetEntryTime: form.cabinetEntryTime ?? props.data.cabinetEntryTime
        }
        update(updateData)
          .then((msg) => {
            loading.value = false
            EleMessage.success(msg)
            handleCancel()
            emit('done')
          })
          .catch((e) => {
            loading.value = false
            EleMessage.error(e.message)
          })
      } else {
        // For register operation, we can use the form data directly
        register(form)
          .then((msg) => {
            loading.value = false
            EleMessage.success(msg)
            handleCancel()
            emit('done')
          })
          .catch((e) => {
            loading.value = false
            EleMessage.error(e.message)
          })
      }
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({
        ...props.data,
        categoryId: props.data.categoryId
      })
      isUpdate.value = true
    } else {
      resetFields()
      isUpdate.value = false
    }
    nextTick(() => {
      formRef.value?.clearValidate?.()
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

  .avatar-uploader {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader:hover {
    border-color: var(--el-color-primary);
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
