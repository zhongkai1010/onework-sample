<!-- 批量导入图片弹框表单 -->
<template>
  <ele-modal
    v-model="modelValue"
    :title="title"
    width="500px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="图片" prop="images">
        <common-upload
          v-model="images"
          accept="image/*"
          :multiple="false"
          :drag="true"
          :limit="1"
          :fileLimit="10"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import CommonUpload from '@/components/CommonUpload/index.vue'
  import type { UploadItem } from 'ele-admin-plus/es/ele-upload-list/types'
  import { imgsbatch } from '@/api/collection/ledger'

  const props = defineProps<{
    rows: CollectionLedger[]
    /** 进入方式：batch-批量导入，single-单个导入 */
    mode?: 'batch' | 'single'
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'done'): void
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 计算标题
  const title = computed(() => {
    return props.mode === 'single' ? '导入图片' : '批量导入图片'
  })

  // 表单实例
  const formRef = ref<FormInstance>()

  // 加载状态
  const loading = ref(false)

  // 图片列表
  const images = ref<UploadItem[]>([])

  // 表单数据
  const [form] = useFormData({
    images: []
  })

  // 表单校验规则
  const rules = {
    images: [
      {
        required: true,
        validator: (rule: any, value: any, callback: any) => {
          if (!images.value.length) {
            callback(new Error('请选择图片文件'))
          } else {
            callback()
          }
        },
        trigger: 'change'
      }
    ]
  }

  // 关闭弹窗
  const onClose = () => {
    modelValue.value = false
    formRef.value?.resetFields()
    images.value = []
  }

  // 提交表单
  const onSubmit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true
        // 获取上传的图片URL
        const imageUrl = images.value[0]?.url
        if (!imageUrl) {
          ElMessage.error('请先上传图片')
          loading.value = false
          return
        }

        console.log('props.rows:', props.rows)
        const ids = props.rows.map((row) => row.id)
        console.log('ids:', ids)

        // 调用批量上传图片接口
        imgsbatch({
          id: ids,
          documentImage: imageUrl
        })
          .then(() => {
            ElMessage.success('上传成功')
            emit('done')
            onClose()
          })
          .catch((error) => {
            ElMessage.error(error.message || '上传失败')
          })
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    width: 100%;
  }
</style>
