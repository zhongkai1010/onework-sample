<template>
  <ele-modal
    v-model="show"
    :title="data ? '修改库房' : '新增库房'"
    width="500px"
    :destroy-on-close="true"
    @closed="onClosed"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="上级库房" v-if="!data">
        <warehouse-select v-model="form.parentId" :type="1" :disabled="!!parentId" />
      </el-form-item>
      <el-form-item label="库房名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入库房名称" clearable />
      </el-form-item>
      <el-form-item label="库房编号" prop="code">
        <el-input v-model.trim="form.code" placeholder="请输入库房编号" clearable />
      </el-form-item>
      <template v-if="!data">
        <el-form-item label="级别" prop="tier">
          <el-select v-model="form.tier" placeholder="请选择级别" clearable>
            <el-option label="库" :value="1" />
            <el-option label="区" :value="2" />
          </el-select>
        </el-form-item>
        <template v-if="form.tier === 2">
          <el-form-item label="列数" prop="columnCount">
            <el-input-number
              v-model="form.columnCount"
              :min="0"
              :max="999"
              placeholder="请输入列数"
            />
          </el-form-item>
          <el-form-item label="节数" prop="sectionCount">
            <el-input-number
              v-model="form.sectionCount"
              :min="0"
              :max="999"
              placeholder="请输入节数"
            />
          </el-form-item>
          <el-form-item label="层数" prop="layerCount">
            <el-input-number
              v-model="form.layerCount"
              :min="0"
              :max="999"
              placeholder="请输入层数"
            />
          </el-form-item>
          <el-form-item label="固定列类型" prop="fixedColumnType">
            <el-select v-model="form.fixedColumnType" placeholder="请选择固定列类型" clearable>
              <el-option label="左列固定" value="左列固定" />
              <el-option label="右列固定" value="右列固定" />
              <el-option label="中间固定" value="中间固定" />
              <el-option label="不分左右" value="不分左右" />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <el-form-item label="备注" prop="remark" v-if="!data">
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
  import type {
    Warehouse,
    UpdateWarehouseParams,
    AddWarehouseParams
  } from '@/api/inventory/warehouse/model'
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
    tier: undefined as number | undefined,
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
    code: [
      {
        required: true,
        message: '请输入库房编号',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        message: '请输入库房名称',
        trigger: 'blur'
      }
    ],
    tier: [
      {
        required: true,
        message: '请选择级别',
        type: 'number' as const,
        trigger: 'change'
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
    if (!form.code || !form.name) {
      EleMessage.error('请填写必填项')
      return
    }

    loading.value = true
    if (props.data) {
      const updateParams: UpdateWarehouseParams = {
        id: props.data.id,
        code: form.code,
        name: form.name,
        type: props.data.type,
        tier: props.data.tier,
        parentId: props.data.parentId,
        remark: props.data.remark,
        columnCount: props.data.columnCount,
        sectionCount: props.data.sectionCount,
        layerCount: props.data.layerCount,
        fixedColumnType: props.data.fixedColumnType
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
        code: form.code,
        name: form.name,
        type: 1, //固定类型为库房
        tier: form.tier,
        parentId: form.parentId,
        remark: form.remark,
        columnCount: form.tier === 2 ? form.columnCount : undefined,
        sectionCount: form.tier === 2 ? form.sectionCount : undefined,
        layerCount: form.tier === 2 ? form.layerCount : undefined,
        fixedColumnType: form.tier === 2 ? form.fixedColumnType : undefined
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
