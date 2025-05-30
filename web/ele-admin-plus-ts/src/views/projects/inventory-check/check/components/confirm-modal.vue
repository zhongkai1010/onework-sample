<template>
  <ele-modal
    form
    v-model="visible"
    title="确认盘点"
    width="500px"
    :destroy-on-close="true"
    position="center"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="盘点状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择盘点状态"
          style="width: 100%"
          @change="handleStatusChange"
        >
          <el-option label="已盘点" value="1" />
          <el-option label="已盘亏" value="2" />
          <el-option label="已盘盈" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="explanation" :rules="remarksRules">
        <el-input
          v-model="form.explanation"
          type="textarea"
          :rows="3"
          placeholder="请输入备注信息"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { InventoryCheckCollection } from '@/api/inventory-check/check/model'
  import { updateInventoryCheckCollectionStatus } from '@/api/inventory-check/check'
  import { useFormData } from '@/utils/use-form-data'

  /* Props 定义 */
  const props = defineProps<{
    /** 选中的藏品列表 */
    selections: InventoryCheckCollection[]
  }>()

  /* Emits 定义 */
  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /* 表单引用 */
  const formRef = ref<FormInstance>()

  /* 加载状态 */
  const loading = ref(false)

  /* 表单数据 */
  const [form, resetFields] = useFormData({
    status: '',
    explanation: ''
  })

  /* 备注验证规则 */
  const remarksRules = computed(() => {
    return []
  })

  /* 表单校验规则 */
  const rules = {
    status: [{ required: true, message: '请选择盘点状态', trigger: 'change' }]
  }

  /* 处理状态变更 */
  const handleStatusChange = () => {
    // 当状态变更为已盘点时，清空备注
    if (form.status === '1') {
      form.explanation = ''
    }
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    resetFields()
    visible.value = false
  }

  /* 处理提交 */
  const handleSubmit = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        try {
          loading.value = true
          await updateInventoryCheckCollectionStatus({
            ids: props.selections.map((item) => item.id),
            status: Number(form.status),
            explanation: form.explanation
          })
          EleMessage.success('确认盘点成功')
          handleCancel()
          emit('done')
        } catch (error: any) {
          EleMessage.error(error.message || '确认盘点失败')
        } finally {
          loading.value = false
        }
      }
    })
  }
</script>

<style lang="scss" scoped></style>
