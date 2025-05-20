<template>
  <ele-modal
    v-model="visible"
    :title="isUpdate ? '修改艺术家作品' : '添加艺术家作品'"
    width="600px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="作品名称" prop="workTitle">
        <el-input v-model="form.workTitle" placeholder="请输入作品名称" clearable />
      </el-form-item>
      <el-form-item label="创作年代" prop="creationYear">
        <el-input v-model="form.creationYear" placeholder="请输入创作年代" clearable />
      </el-form-item>
      <el-form-item label="尺寸" prop="dimensions">
        <el-input v-model="form.dimensions" placeholder="请输入尺寸" clearable />
      </el-form-item>
      <el-form-item label="材质" prop="material">
        <el-input v-model="form.material" placeholder="请输入材质" clearable />
      </el-form-item>
      <el-form-item label="题材" prop="theme">
        <el-input v-model="form.theme" placeholder="请输入题材" clearable />
      </el-form-item>
      <el-form-item label="装裱" prop="framing">
        <el-input v-model="form.framing" placeholder="请输入装裱" clearable />
      </el-form-item>
      <el-form-item label="艺术家名称" prop="artistName">
        <el-input v-model="form.artistName" placeholder="请输入艺术家名称" clearable />
      </el-form-item>
      <el-form-item label="作品图片" prop="workImage">
        <CommonUpload
          v-model="form.workImage"
          :limit="1"
          :drag="true"
          :tools="true"
          accept="image/*"
          :sortable="false"
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
  import type {
    ArtistWork,
    CreateArtistWorkParams,
    UpdateArtistWorkParams
  } from '@/api/artist/work/model'
  import { addArtistWork, updateArtistWork } from '@/api/artist/work'
  import CommonUpload from '@/components/CommonUpload/index.vue'
  import type { UploadItem } from 'ele-admin-plus/es/ele-upload-list/types'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: ArtistWork
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
  const [form, resetFields, assignFields] = useFormData<
    Omit<CreateArtistWorkParams, 'workImage'> & { workImage: UploadItem[] }
  >({
    workTitle: '',
    creationYear: '',
    dimensions: '',
    material: '',
    theme: '',
    framing: '',
    artistName: '',
    workImage: []
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    workTitle: [{ required: true, message: '请输入作品名称', trigger: 'blur' }]
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
      const apiData = {
        ...form,
        workImage: form.workImage[0]?.url || ''
      }
      if (isUpdate.value && props.data) {
        const updateData: UpdateArtistWorkParams = {
          id: props.data.id,
          ...apiData
        }
        updateArtistWork(updateData)
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
        addArtistWork(apiData)
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
        workTitle: props.data.workTitle,
        creationYear: props.data.creationYear,
        dimensions: props.data.dimensions,
        material: props.data.material,
        theme: props.data.theme,
        framing: props.data.framing,
        artistName: props.data.artistName,
        workImage: props.data.workImage
          ? [{ key: String(Date.now()), url: props.data.workImage, status: 'done' }]
          : []
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
    resetFields()
  }
</script>
