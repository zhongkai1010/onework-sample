<template>
  <ele-modal v-model="visible" title="入库登记" width="800px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="入库类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择入库类型" clearable style="width: 100%">
          <el-option label="初次入库" :value="1" />
          <el-option label="归还入库" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="藏品选择" prop="collectionIds">
        <el-select v-model="form.collectionIds" multiple filterable remote :remote-method="handleCollectionSearch" :loading="loading" placeholder="请选择藏品" style="width: 100%">
          <el-option v-for="item in collectionOptions" :key="item.id" :label="item.collectionName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="经办人" prop="operator">
        <el-input v-model="form.operator" placeholder="请输入经办人" clearable />
      </el-form-item>
      <el-form-item label="接收库房" prop="warehouseId">
        <el-input v-model.number="form.warehouseId" placeholder="请输入接收库房" clearable />
      </el-form-item>
      <el-form-item label="入库日期" prop="storageDate">
        <el-date-picker v-model="form.storageDate" type="date" placeholder="请选择入库日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" clearable />
      </el-form-item>
      <el-form-item label="单据图片" prop="documentImage">
        <el-upload class="upload-demo" action="/api/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload" :limit="1">
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">请上传单据图片</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { InboundCollection, InboundRegisterParams } from '@/api/inventory/inbound/model'
  import { createInbound, getCollectionsByType } from '@/api/inventory/inbound'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const submitting = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 藏品选项 */
  const collectionOptions = ref<InboundCollection[]>([])
  const loading = ref(false)

  /** 表单数据 */
  const [form, resetFields] = useFormData<InboundRegisterParams>({
    type: 1, // 默认选择初次入库
    collectionIds: [],
    operator: '',
    warehouseId: undefined,
    storageDate: '',
    remarks: ''
  })

  /** 单据图片 */
  const documentImage = ref('')

  /** 表单校验规则 */
  const rules = {
    type: [{ required: true, message: '请选择入库类型', trigger: 'change' }],
    collectionIds: [{ required: true, message: '请选择藏品', trigger: 'change' }],
    operator: [{ required: true, message: '请输入经办人', trigger: 'blur' }],
    warehouseId: [{ required: true, message: '请输入接收库房', trigger: 'blur' }],
    storageDate: [{ required: true, message: '请选择入库日期', trigger: 'change' }]
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        submitting.value = true
        const submitData = {
          ...form,
          documentImage: documentImage.value
        }
        createInbound(submitData)
          .then((msg) => {
            submitting.value = false
            EleMessage.success(msg)
            handleCancel()
            emit('done')
          })
          .catch((e) => {
            submitting.value = false
            EleMessage.error(e.message)
          })
      }
    })
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
  }

  /** 藏品搜索 */
  const handleCollectionSearch = (query: string) => {
    if (query) {
      loading.value = true
      const type = form.type || 1 // 确保 type 不为 undefined
      getCollectionsByType(type)
        .then((data) => {
          collectionOptions.value = data
        })
        .catch((e) => {
          EleMessage.error(e.message)
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      collectionOptions.value = []
    }
  }

  /** 上传成功回调 */
  const handleUploadSuccess = (response: any) => {
    if (response.code === 0) {
      documentImage.value = response.data.url
      EleMessage.success('上传成功')
    } else {
      EleMessage.error(response.message || '上传失败')
    }
  }

  /** 上传失败回调 */
  const handleUploadError = () => {
    EleMessage.error('上传失败')
  }

  /** 上传前校验 */
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      EleMessage.error('只能上传图片文件')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      EleMessage.error('图片大小不能超过 2MB')
      return false
    }
    return true
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    width: 100%;
  }
</style>
