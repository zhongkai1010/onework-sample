<template>
  <ele-modal
    v-model="visible"
    :title="isUpdate ? '修改盘点计划' : '添加盘点计划'"
    width="600px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-form-item label="盘点标题" prop="inventoryTitle">
        <el-input v-model="form.inventoryTitle" placeholder="请输入盘点标题" clearable />
      </el-form-item>
      <el-form-item label="盘点开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="请选择盘点开始时间"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item label="盘点结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="请选择盘点结束时间"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item label="盘点目的" prop="inventoryPurpose">
        <el-input v-model="form.inventoryPurpose" placeholder="请输入盘点目的" clearable />
      </el-form-item>
      <el-form-item label="盘点计划人" prop="planner">
        <el-input v-model="form.planner" placeholder="请输入盘点计划人" clearable />
      </el-form-item>
      <el-form-item label="盘点执行人" prop="executor">
        <el-input v-model="form.executor" placeholder="请输入盘点执行人" clearable />
      </el-form-item>
      <el-form-item label="存放地点" prop="storageLocation">
        <el-input v-model="form.storageLocation" placeholder="请输入存放地点" clearable />
      </el-form-item>
      <el-form-item label="类别" prop="categoryIds">
        <category-select v-model="form.categoryIds" multiple placeholder="请选择类别" />
      </el-form-item>
      <el-form-item label="验收日期" prop="acceptanceDate">
        <el-date-picker
          v-model="form.acceptanceDate"
          type="date"
          placeholder="请选择验收日期"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
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
  import { ref, reactive, nextTick } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { InventoryCheckPlan } from '@/api/inventory-check/plan/model'
  import { createInventoryCheckPlan, updateInventoryCheckPlan } from '@/api/inventory-check/plan'
  import CategorySelect from '@/components/CustomForm/CategorySelect.vue'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: InventoryCheckPlan
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
  const formRef = ref<FormInstance>()

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData({
    inventoryTitle: '',
    startTime: '',
    endTime: '',
    inventoryPurpose: '',
    planner: '',
    executor: '',
    storageLocation: '',
    categoryIds: [] as number[],
    acceptanceDate: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    inventoryTitle: [{ required: true, message: '请输入盘点标题', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择盘点开始时间', trigger: 'change' }],
    endTime: [{ required: true, message: '请选择盘点结束时间', trigger: 'change' }],
    inventoryPurpose: [{ required: true, message: '请输入盘点目的', trigger: 'blur' }],
    planner: [{ required: true, message: '请输入盘点计划人', trigger: 'blur' }],
    executor: [{ required: true, message: '请输入盘点执行人', trigger: 'blur' }],
    storageLocation: [{ required: true, message: '请输入存放地点', trigger: 'blur' }],
    categoryIds: [{ required: true, message: '请选择类别', trigger: 'change' }],
    acceptanceDate: [{ required: true, message: '请选择验收日期', trigger: 'change' }]
  })

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
        const updateData = {
          id: String(props.data.id),
          ...form
        }
        updateInventoryCheckPlan(updateData)
          .then(() => {
            loading.value = false
            EleMessage.success('更新成功')
            handleCancel()
            emit('done')
          })
          .catch((e) => {
            loading.value = false
            EleMessage.error(e.message)
          })
      } else {
        createInventoryCheckPlan(form)
          .then(() => {
            loading.value = false
            EleMessage.success('添加成功')
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
      assignFields(props.data)
      isUpdate.value = true
    } else {
      resetFields()
      isUpdate.value = false
    }
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
