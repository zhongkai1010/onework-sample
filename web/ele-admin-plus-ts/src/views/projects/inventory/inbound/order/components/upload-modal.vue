<template>
  <ele-modal
    v-model="visible"
    title="上传单据图片"
    width="500px"
    :destroy-on-close="true"
    @closed="handleClosed"
  >
    <image-upload v-model="uploadImage" :limit="1" />
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="uploading">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import ImageUpload from '@/components/ImageUpload/index.vue'
  import { warehouseCollectionImgs } from '@/api/inventory/inbound'

  const props = defineProps<{
    modelValue: boolean
    id?: number
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'success'): void
  }>()

  const visible = ref(false)
  const uploadImage = ref('')
  const uploading = ref(false)

  watch(
    () => props.modelValue,
    (val) => {
      visible.value = val
    }
  )

  watch(
    () => visible.value,
    (val) => {
      emit('update:modelValue', val)
    }
  )

  /**
   * 处理弹窗关闭
   */
  const handleClosed = () => {
    uploadImage.value = ''
  }

  /**
   * 处理取消
   */
  const handleCancel = () => {
    visible.value = false
  }

  /**
   * 处理提交
   */
  const handleSubmit = async () => {
    if (!uploadImage.value) {
      EleMessage.warning('请选择要上传的图片')
      return
    }
    if (!props.id) {
      return
    }

    uploading.value = true
    try {
      await warehouseCollectionImgs({
        id: props.id,
        imgs: uploadImage.value
      })
      EleMessage.success('上传成功')
      visible.value = false
      emit('success')
    } catch (error: any) {
      EleMessage.error(error.message || '上传失败')
    } finally {
      uploading.value = false
    }
  }
</script>
