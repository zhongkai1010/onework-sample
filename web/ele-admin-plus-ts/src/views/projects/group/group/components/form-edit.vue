<template>
  <ele-modal v-model="visible" :title="isEdit ? '编辑藏品组' : '新增藏品组'" width="500px" :destroy-on-close="true" @closed="handleClosed">
    <el-form :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="藏品组名称" prop="groupName">
        <el-input v-model="form.groupName" placeholder="请输入藏品组名称" clearable />
      </el-form-item>
      <el-form-item label="负责人" prop="personInCharge">
        <el-input v-model="form.personInCharge" placeholder="请输入负责人" clearable />
      </el-form-item>
      <el-form-item label="备注说明" prop="remarks">
        <el-input v-model="form.remarks" type="textarea" :rows="3" placeholder="请输入备注说明" />
      </el-form-item>
      <el-form-item label="排序" prop="sortOrder">
        <el-input-number v-model="form.sortOrder" :min="0" :max="999" placeholder="请输入排序" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { GroupEditParams } from '@/api/data/group/model'
  import { addGroup, updateGroup, getGroupDetails } from '@/api/data/group'
  import type { FormRules } from 'element-plus'

  const props = defineProps<{
    modelValue: boolean
    id?: number
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', visible: boolean): void
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 是否是修改 */
  const isEdit = ref(false)

  /** 提交状态 */
  const loading = ref(false)

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<GroupEditParams>({
    groupName: '',
    personInCharge: '',
    remarks: '',
    sortOrder: 0
  })

  /** 表单验证规则 */
  const rules: FormRules = {
    groupName: [
      { required: true, message: '请输入藏品组名称', trigger: 'blur' },
      { max: 50, message: '藏品组名称不能超过50个字符', trigger: 'blur' }
    ],
    personInCharge: [{ max: 50, message: '负责人不能超过50个字符', trigger: 'blur' }],
    remarks: [{ max: 500, message: '备注说明不能超过500个字符', trigger: 'blur' }],
    sortOrder: [{ type: 'number', message: '排序必须为数字', trigger: 'blur' }]
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 弹窗关闭后 */
  const handleClosed = () => {
    resetFields()
  }

  /** 保存编辑 */
  const save = () => {
    if (isEdit.value && props.id) {
      loading.value = true
      updateGroup({ ...form, id: props.id })
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
      loading.value = true
      addGroup(form)
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
  }

  /** 监听id变化 */
  watch(
    () => props.id,
    async (val) => {
      isEdit.value = !!val
      if (val) {
        try {
          const data = await getGroupDetails(val)
          assignFields(data)
        } catch (e) {
          EleMessage.error(e instanceof Error ? e.message : '获取详情失败')
        }
      } else {
        resetFields()
      }
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped></style>
