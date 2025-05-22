<template>
  <ele-modal
    v-model="dialogVisible"
    :title="type === 'add' ? '登记分馆' : '编辑分馆'"
    width="500px"
    destroy-on-close
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="分馆名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分馆名称" />
      </el-form-item>
      <el-form-item label="启动自动编号" prop="status">
        <el-switch v-model="form.status" :active-value="'1'" :inactive-value="'0'" />
      </el-form-item>
      <el-form-item label="自动编号前缀" prop="numberPrefix" v-if="form.status === '1'">
        <el-input v-model="form.numberPrefix" placeholder="请输入自动编号前缀" />
      </el-form-item>
      <el-form-item label="自动编号长度" prop="numberLength" v-if="form.status === '1'">
        <el-input-number
          :model-value="parseInt(form.numberLength)"
          :min="1"
          :max="10"
          @update:model-value="handleNumberLengthChange"
        />
      </el-form-item>
      <el-form-item label="初始编号值" prop="numberPrice" v-if="form.status === '1'">
        <el-input-number
          :model-value="parseInt(form.numberPrice)"
          :min="0"
          @update:model-value="handleNumberPriceChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { EleMessage } from 'ele-admin-plus/es'
  import { addBranch, updateBranch } from '@/api/data/branch'
  import type { BranchInfo, BranchAddParams, BranchUpdateParams } from '@/api/data/branch/model'

  const props = defineProps<{
    type: 'add' | 'edit'
    data?: BranchInfo
  }>()

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'done'): void
  }>()

  const dialogVisible = defineModel<boolean>('visible')
  const formRef = ref<FormInstance>()
  const submitting = ref(false)
  const [form, resetFields] = useFormData<BranchAddParams & { id: string }>({
    id: '',
    name: '',
    status: '0',
    numberPrefix: '',
    numberLength: '6',
    numberPrice: '1'
  })

  // 表单验证规则
  const rules: FormRules = {
    name: [
      { required: true, message: '请输入分馆名称', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
    ],
    numberPrefix: [{ required: true, message: '请输入自动编号前缀', trigger: 'blur' }],
    numberLength: [{ required: true, message: '请输入自动编号长度', trigger: 'blur' }],
    numberPrice: [{ required: true, message: '请输入初始编号值', trigger: 'blur' }]
  }

  // 监听data变化
  watch(
    () => props.data,
    (val) => {
      if (val) {
        Object.assign(form, val)
      }
    },
    { immediate: true }
  )

  // 处理数字输入变化
  const handleNumberLengthChange = (value: number) => {
    form.numberLength = value.toString()
  }

  const handleNumberPriceChange = (value: number) => {
    form.numberPrice = value.toString()
  }

  // 关闭对话框
  const handleClose = () => {
    dialogVisible.value = false
    resetFields()
  }

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
      if (valid) {
        submitting.value = true
        try {
          if (props.type === 'add') {
            await addBranch(form)
          } else {
            await updateBranch(form as BranchUpdateParams)
          }
          EleMessage.success(props.type === 'add' ? '添加成功' : '更新成功')
          emit('done')
        } catch (error: any) {
          EleMessage.error(error.message || '保存失败')
        } finally {
          submitting.value = false
        }
      }
    })
  }

  defineExpose({
    formRef,
    form
  })
</script>
