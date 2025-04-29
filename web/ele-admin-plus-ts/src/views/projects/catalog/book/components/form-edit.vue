<template>
  <ele-modal v-model="visible" :title="isUpdate ? '修改图书' : '添加图书'" width="680px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入编号" clearable />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="请输入作者" clearable />
      </el-form-item>
      <el-form-item label="图书价值" prop="bookValue">
        <el-input v-model="form.bookValue" placeholder="请输入图书价值" clearable />
      </el-form-item>
      <el-form-item label="仓库" prop="warehouse">
        <el-input v-model="form.warehouse" placeholder="请输入仓库" clearable />
      </el-form-item>
      <el-form-item label="地址编码" prop="addressCode">
        <el-input v-model="form.addressCode" placeholder="请输入地址编码" clearable />
      </el-form-item>
      <el-form-item label="处理状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择处理状态" clearable style="width: 100%">
          <el-option label="待审核" value="待审核" />
          <el-option label="已审核" value="已审核" />
        </el-select>
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
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { BookCollection, AddBookParams } from '@/api/collection/book/model'
  import { addBook, updateBook } from '@/api/collection/book'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: BookCollection
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
  const [form, resetFields, assignFields] = useFormData<AddBookParams>({
    code: '',
    documentImage: '',
    collectionId: '',
    author: '',
    warehouse: '',
    bookValue: '',
    addressCode: '',
    status: '待审核'
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    code: [
      {
        required: true,
        message: '请输入编号',
        type: 'string',
        trigger: 'blur'
      }
    ],
    author: [
      {
        required: true,
        message: '请输入作者',
        type: 'string',
        trigger: 'blur'
      }
    ],
    bookValue: [
      {
        required: true,
        message: '请输入图书价值',
        type: 'string',
        trigger: 'blur'
      }
    ],
    status: [
      {
        required: true,
        message: '请选择处理状态',
        type: 'string',
        trigger: 'change'
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
      if (isUpdate.value && props.data) {
        updateBook({
          ...props.data,
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
      } else {
        addBook(form)
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
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({
        ...props.data
      })
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
    Object.assign(form, {
      code: '',
      documentImage: '',
      collectionId: '',
      author: '',
      warehouse: '',
      bookValue: '',
      addressCode: '',
      status: '待审核'
    })
  }
</script>
