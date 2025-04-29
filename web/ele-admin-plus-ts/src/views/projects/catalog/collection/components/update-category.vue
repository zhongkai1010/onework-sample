<!-- 批量修改分类弹窗 -->
<template>
  <ele-modal form :width="'500px'" v-model="visible" title="批量修改分类" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="藏品分类" prop="categoryId">
        <category-select v-model="form.categoryId" placeholder="请选择藏品分类" clearable style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save" :disabled="!form.categoryId"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import { CategorySelect } from '@/components/CustomForm'
  import { updateCategory } from '@/api/collection/catalog'

  const props = defineProps<{
    /** 选中的藏品ID列表 */
    collectionIds: number[]
  }>()

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    categoryId: undefined as number | undefined
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    categoryId: [
      {
        required: true,
        message: '请选择藏品分类',
        type: 'number',
        trigger: 'change'
      }
    ]
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存修改 */
  const save = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      if (!form.categoryId) {
        EleMessage.warning('请选择藏品分类')
        return
      }
      loading.value = true
      const msg = await updateCategory({
        ids: props.collectionIds,
        categoryId: form.categoryId
      })
      EleMessage.success(msg)
      handleCancel()
      emit('done')
    } catch (e: any) {
      if (e.message) {
        EleMessage.error(e.message)
      }
    } finally {
      loading.value = false
    }
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    resetFields()
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }
</script>
