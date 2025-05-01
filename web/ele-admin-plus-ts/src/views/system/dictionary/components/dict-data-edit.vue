<!-- 字典数据编辑弹窗 -->
<template>
  <ele-modal form :width="460" v-model="visible" :title="isUpdate ? '修改字典数据' : '添加字典数据'" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="94px" @submit.prevent="">
      <el-form-item label="字典数据名" prop="dictDataName">
        <el-input clearable :maxlength="20" v-model="form.dictDataName" placeholder="请输入字典数据名" />
      </el-form-item>
      <el-form-item label="字典数据值" prop="dictDataCode">
        <el-input clearable :maxlength="20" v-model="form.dictDataCode" placeholder="请输入字典数据值" />
      </el-form-item>
      <el-form-item label="排序号" prop="sortNumber">
        <el-input-number :min="0" :max="9999" v-model="form.sortNumber" placeholder="请输入排序号" controls-position="right" class="ele-fluid" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input :rows="4" type="textarea" :maxlength="200" v-model="form.comments" placeholder="请输入备注" />
      </el-form-item>
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
  import { addDictionaryData, updateDictionaryData } from '@/api/system/dictionary-data'
  import type { DictionaryData } from '@/api/system/dictionary-data/model'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: DictionaryData | null
    /** 字典id */
    dictId: number
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
  const [form, resetFields, assignFields] = useFormData<DictionaryData>({
    dictDataId: void 0,
    dictDataName: '',
    dictDataCode: '',
    sortNumber: void 0,
    comments: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    dictDataName: [
      {
        required: true,
        message: '请输入字典数据名',
        type: 'string',
        trigger: 'blur'
      }
    ],
    dictDataCode: [
      {
        required: true,
        message: '请输入字典数据值',
        type: 'string',
        trigger: 'blur'
      }
    ],
    sortNumber: [
      {
        required: true,
        message: '请输入排序号',
        type: 'number',
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
      const saveOrUpdate = isUpdate.value ? updateDictionaryData : addDictionaryData
      saveOrUpdate({
        ...form,
        dictId: props.dictId
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
      assignFields(props.data)
      isUpdate.value = true
    } else {
      resetFields()
      isUpdate.value = false
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.()
      })
    })
  }
</script>
