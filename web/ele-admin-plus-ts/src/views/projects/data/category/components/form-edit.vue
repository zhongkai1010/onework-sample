<!-- 分类编辑弹窗 -->
<template>
  <ele-modal
    form
    :width="620"
    v-model="visible"
    :title="isUpdate ? '修改分类' : '添加分类'"
    destroy-on-close
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="上级分类" prop="parentId">
            <category-select v-model="form.parentId" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入分类名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分类码" prop="code">
            <el-input v-model="form.code" placeholder="请输入分类码" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              placeholder="请输入描述"
              :rows="3"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { Category, CategoryEditParams } from '@/api/data/category/model'
  import { addCategory, updateCategory } from '@/api/data/category'
  import CategorySelect from '@/components/CustomForm/CategorySelect.vue'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Category
    /** 添加时分类id */
    parentId?: number
    /** 分类数据 */
    categoryData?: Category[]
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
  const [form, resetFields, assignFields] = useFormData<CategoryEditParams>({
    name: '',
    code: '',
    description: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: '请输入分类名称',
        type: 'string',
        trigger: 'blur'
      }
    ]
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
      const saveOrUpdate = isUpdate.value ? updateCategory : addCategory
      saveOrUpdate({
        ...(isUpdate.value ? props.data : {}),
        ...form
      })
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
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({
        ...props.data
      })
      form.parentId = props.data.parentId == 0 ? undefined : props.data.parentId
      isUpdate.value = true
    } else {
      resetFields()
      form.parentId = props.parentId
      isUpdate.value = false
    }
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }
</script>
