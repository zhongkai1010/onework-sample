<!-- 编入藏品组弹框表单 -->
<template>
  <ele-modal v-model="modelValue" title="编入藏品组" width="500px" :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="藏品组" prop="groupId">
        <el-select v-model="form.groupId" placeholder="请选择藏品组" clearable filterable style="width: 100%">
          <el-option v-for="item in groupOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { changeClassification } from '@/api/collection/ledger'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    rows: CollectionLedger[]
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'done'): void
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 表单实例
  const formRef = ref<FormInstance>()

  // 加载状态
  const loading = ref(false)

  // 表单数据
  const [form] = useFormData({
    groupId: ''
  })

  // 表单校验规则
  const rules = {
    groupId: [{ required: true, message: '请选择藏品组', trigger: 'change' }]
  }

  // 藏品组选项
  const groupOptions = ref([
    { id: '1', name: '书画组' },
    { id: '2', name: '陶瓷组' },
    { id: '3', name: '玉器组' },
    { id: '4', name: '青铜器组' }
  ])

  // 关闭弹窗
  const onClose = () => {
    modelValue.value = false
    formRef.value?.resetFields()
  }

  // 提交表单
  const onSubmit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true
        changeClassification({
          collectionIds: props.rows.map((row) => Number(row.id)),
          groupId: form.groupId
        })
          .then((msg) => {
            ElMessage.success(msg)
            emit('done')
            onClose()
          })
          .catch((e) => {
            ElMessage.error(e.message)
          })
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<style lang="scss" scoped></style>
