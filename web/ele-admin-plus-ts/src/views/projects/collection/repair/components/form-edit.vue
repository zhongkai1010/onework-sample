<template>
  <ele-modal
    v-model="visible"
    title="添加修复"
    width="800px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" label-width="100px" @submit.prevent="" :rules="rules">
      <el-form-item label="藏品选择" prop="collectionId" required>
        <collection-select v-model="form.collectionId" />
      </el-form-item>
      <el-form-item label="送修部门">
        <el-input v-model="form.sendRepairDepartment" placeholder="请输入送修部门" clearable />
      </el-form-item>
      <el-form-item label="送修人">
        <el-input v-model="form.sentBy" placeholder="请输入送修人" clearable />
      </el-form-item>
      <el-form-item label="修复原因">
        <el-input v-model="form.repairReason" placeholder="请输入修复原因" clearable />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" clearable />
      </el-form-item>
      <el-form-item label="送修日期">
        <el-date-picker
          v-model="form.sendRepairDate"
          type="date"
          placeholder="请选择送修日期"
          clearable
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
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { AddRepairParams } from '@/api/collection/repair/model'

  import { addRepair } from '@/api/collection/repair'
  import CollectionSelect from '@/components/CustomForm/CollectionSelect.vue'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 表单验证规则 */
  const rules = ref<FormRules>({
    collectionId: [{ required: true, message: '请选择藏品', trigger: ['change', 'blur'] }]
  })

  /** 表单数据 */
  const [form, resetFields] = useFormData<AddRepairParams>({
    collectionId: undefined,
    registrationDate: new Date().toISOString().split('T')[0],
    sendRepairDepartment: '',
    sentBy: '',
    repairReason: '',
    remarks: '',
    sendRepairDate: ''
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      loading.value = true
      addRepair(form)
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
    } catch (error) {
      // 验证失败
      return
    }
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
    formRef.value?.clearValidate?.()
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    :deep(.el-upload__tip) {
      color: #909399;
      font-size: 12px;
      margin-top: 7px;
    }
  }
</style>
