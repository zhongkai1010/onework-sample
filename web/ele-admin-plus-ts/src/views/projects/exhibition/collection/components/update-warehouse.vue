<template>
  <ele-modal
    v-model="visible"
    title="位置变更"
    width="500px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="展区位置" prop="warehouseId">
        <warehouse-select v-model="form.warehouseId" :type="2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'
  import { changeWarehouse } from '@/api/collection/ledger'
  import type { WarehouseCollection } from '@/api/inventory/warehouse/model'

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'done'): void
  }>()

  const props = defineProps<{
    /** 选中的藏品数据 */
    data: WarehouseCollection[]
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    warehouseId: undefined as number | undefined
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    warehouseId: [
      {
        required: true,
        message: '请选择仓库位置',
        type: 'number',
        trigger: 'submit'
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
      loading.value = true
      const collectionIds = props.data.map((item) => item.id).filter((id) => id != null)
      if (!collectionIds.length) {
        throw new Error('藏品ID不能为空')
      }
      await changeWarehouse({
        collectionIds,
        warehouseId: form.warehouseId?.toString() || ''
      })
      EleMessage.success('位置变更成功')
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
