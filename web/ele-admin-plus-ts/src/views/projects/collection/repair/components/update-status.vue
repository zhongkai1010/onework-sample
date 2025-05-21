<template>
  <ele-modal
    v-model="visible"
    title="修复入藏"
    width="800px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" label-width="100px" @submit.prevent="">
      <el-form-item label="修复人">
        <el-input v-model="form.repairPerson" placeholder="请输入修复人" clearable />
      </el-form-item>
      <el-form-item label="资质证书">
        <file-upload
          v-model="form.qualificationCertificate"
          :limit="1"
          :fileLimit="10"
          :preview="true"
          :drag="true"
          :tools="true"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </el-form-item>
      <el-form-item label="修完日期">
        <el-date-picker
          v-model="form.repairCompletionDate"
          type="date"
          placeholder="请选择修完日期"
          clearable
        />
      </el-form-item>
      <el-form-item label="修复情况及结果">
        <el-input
          v-model="form.repairStatusAndResults"
          type="textarea"
          placeholder="请输入修复情况及结果"
          clearable
        />
      </el-form-item>
      <el-form-item label="修复后图片">
        <image-upload
          v-model="form.afterRepairImage"
          :limit="1"
          :fileLimit="10"
          :preview="true"
          :drag="true"
          :tools="true"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { Repair } from '@/api/collection/repair/model'
  import { repairInbound } from '@/api/collection/repair'
  import ImageUpload from '@/components/ImageUpload/index.vue'
  import FileUpload from '@/components/FileUpload/index.vue'

  const props = defineProps<{
    /** 修复记录数据 */
    data: Repair
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
  const [form, resetFields] = useFormData<Partial<Repair>>({
    repairPerson: '',
    qualificationCertificate: '',
    repairCompletionDate: '',
    repairStatusAndResults: '',
    afterRepairImage: ''
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    loading.value = true
    const updateData: Repair = {
      ...props.data,
      ...form
    }
    repairInbound(updateData)
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

  /** 弹窗打开事件 */
  const handleOpen = () => {
    resetFields()
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }

  /** 重置表单 */
  const reset = () => {
    resetFields()
  }
</script>

<style lang="scss" scoped></style>
