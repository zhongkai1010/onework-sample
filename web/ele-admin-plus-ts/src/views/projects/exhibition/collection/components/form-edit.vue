<template>
  <ele-dialog v-model="visible" :title="data ? '修改藏品' : '新增藏品'" width="500px" :destroy-on-close="true" @submit="handleSubmit">
    <ele-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="藏品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入藏品名称" />
      </el-form-item>
      <el-form-item label="藏品编号" prop="code">
        <el-input v-model="form.code" placeholder="请输入藏品编号" />
      </el-form-item>
      <el-form-item label="藏品类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择藏品类型">
          <el-option label="文物" :value="1" />
          <el-option label="艺术品" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="藏品级别" prop="level">
        <el-select v-model="form.level" placeholder="请选择藏品级别">
          <el-option label="一级" :value="1" />
          <el-option label="二级" :value="2" />
          <el-option label="三级" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </ele-form>
  </ele-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { FormInstance } from 'element-plus'
  import type { Collection } from '@/api/exhibition/collection/model'
  import { addCollection, updateCollection } from '@/api/exhibition/collection'

  const props = defineProps<{
    /** 是否显示 */
    modelValue: boolean
    /** 修改回显的数据 */
    data?: Collection
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'done'): void
  }>()

  const visible = ref(false)
  const formRef = ref<FormInstance>()
  const form = ref<Collection>({
    name: '',
    code: '',
    type: 1,
    level: 1,
    remark: ''
  })

  const rules = {
    name: [{ required: true, message: '请输入藏品名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入藏品编号', trigger: 'blur' }],
    type: [{ required: true, message: '请选择藏品类型', trigger: 'change' }],
    level: [{ required: true, message: '请选择藏品级别', trigger: 'change' }]
  }

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

  watch(
    () => props.data,
    (val) => {
      if (val) {
        form.value = { ...val }
      } else {
        form.value = {
          name: '',
          code: '',
          type: 1,
          level: 1,
          remark: ''
        }
      }
    },
    { immediate: true }
  )

  const handleSubmit = async () => {
    if (!formRef.value) return
    await formRef.value.validate()
    const loading = EleMessage.loading({
      message: '请求中..',
      plain: true
    })
    try {
      const msg = props.data ? await updateCollection(form.value) : await addCollection(form.value)
      loading.close()
      EleMessage.success(msg)
      emit('done')
      visible.value = false
    } catch (e: any) {
      loading.close()
      EleMessage.error(e.message)
    }
  }
</script>

<style lang="scss" scoped></style>
