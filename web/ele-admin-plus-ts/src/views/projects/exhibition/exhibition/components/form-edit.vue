<template>
  <ele-modal v-model="show" :title="data ? '修改库房' : '新增库房'" width="500px" :destroy-on-close="true" @closed="onClosed">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-form-item label="上级库房" prop="parentId">
        <warehouse-select v-model="form.parentId" :disabled="!!parentId" />
      </el-form-item>
      <el-form-item label="库房名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入库房名称" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="form.remark" type="textarea" :rows="3" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="submit">保存</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { FormInstance } from 'element-plus'
  import type { Warehouse, UpdateWarehouseParams, AddWarehouseParams } from '@/api/inventory/warehouse/model'
  import { addWarehouse, updateWarehouse } from '@/api/inventory/warehouse'
  import { useFormData } from '@/utils/use-form-data'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'

  const props = defineProps<{
    /** 是否显示 */
    modelValue: boolean
    /** 修改回显的数据 */
    data?: Warehouse
    /** 上级库房id */
    parentId?: number
    /** 选择数据 */
    selectData: Warehouse[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'done'): void
  }>()

  /** 是否显示弹窗 */
  const show = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 加载状态 */
  const loading = ref(false)

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    parentId: undefined as number | undefined,
    code: '',
    name: '',
    type: 1, //固定类型为库房
    tier: 1, //固定级别为库
    remark: '',
    columnCount: undefined as number | undefined,
    sectionCount: undefined as number | undefined,
    layerCount: undefined as number | undefined,
    fixedColumnType: ''
  })

  /** 表单验证规则 */
  const rules = {
    parentId: [
      {
        required: true,
        message: '请选择上级库房',
        type: 'number' as const,
        trigger: 'change'
      }
    ],
    name: [
      {
        required: true,
        message: '请输入库房名称',
        trigger: 'blur'
      }
    ]
  }

  /** 监听显示状态 */
  watch(
    () => props.modelValue,
    (value) => {
      show.value = value
      if (value) {
        if (props.data) {
          // 修改
          Object.assign(form, props.data)
        } else {
          // 新增
          form.parentId = props.parentId
        }
      }
    }
  )

  /** 监听弹窗显示状态 */
  watch(show, (value) => {
    emit('update:modelValue', value)
  })

  /** 弹窗关闭后 */
  const onClosed = () => {
    resetFields()
  }

  /** 提交表单 */
  const submit = () => {
    if (!form.parentId || !form.name) {
      EleMessage.error('请填写必填项')
      return
    }

    loading.value = true
    if (props.data) {
      const updateParams: UpdateWarehouseParams = {
        id: props.data.id,
        name: form.name,
        remark: form.remark
      }
      updateWarehouse(updateParams)
        .then((msg) => {
          loading.value = false
          EleMessage.success(msg)
          show.value = false
          emit('done')
        })
        .catch((e) => {
          loading.value = false
          EleMessage.error(e.message)
        })
    } else {
      const addParams: AddWarehouseParams = {
        name: form.name,
        parentId: form.parentId,
        remark: form.remark,
        type: 1, //固定类型为库房
        tier: 1 //固定级别为库
      }
      addWarehouse(addParams)
        .then((msg) => {
          loading.value = false
          EleMessage.success(msg)
          show.value = false
          emit('done')
        })
        .catch((e) => {
          loading.value = false
          EleMessage.error(e.message)
        })
    }
  }
</script>

<style lang="scss" scoped></style>
