<template>
  <ele-modal
    v-model="visible"
    title="入库登记"
    width="800px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="入库类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择入库类型" clearable style="width: 100%">
          <el-option label="初次入库" :value="1" />
          <el-option label="归还入库" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="藏品选择" prop="collectionIds">
        <ele-table-select
          multiple
          clearable
          placeholder="请选择"
          value-key="id"
          label-key="collectionName"
          v-model="form.collectionIds"
          :table-props="tableProps"
          :popper-width="580"
          :max-tag-text-length="3"
          :max-tag-count="5"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="operator">
        <el-input v-model="form.operator" placeholder="请输入经办人" clearable />
      </el-form-item>
      <el-form-item label="接收库房" prop="warehouseId">
        <warehouse-select v-model="form.warehouseId" />
      </el-form-item>
      <el-form-item label="入库日期" prop="storageDate">
        <el-date-picker
          v-model="form.storageDate"
          type="date"
          placeholder="请选择入库日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" clearable />
      </el-form-item>
      <el-form-item label="单据图片" prop="imgs">
        <image-upload v-model="documentImage" :limit="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, nextTick, watch, reactive } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { InboundRegisterParams } from '@/api/inventory/inbound/model'
  import { createInbound, getCollectionsByType } from '@/api/inventory/inbound'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'
  import ImageUpload from '@/components/ImageUpload/index.vue'

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

  const loading = ref(false)

  // 表格配置
  const tableProps = reactive({
    datasource: [],
    columns: [
      {
        type: 'selection',
        columnKey: 'selection',
        width: 48,
        align: 'center',
        fixed: 'left',
        reserveSelection: true
      },
      {
        type: 'index',
        columnKey: 'index',
        width: 48,
        align: 'center',
        showOverflowTooltip: true,
        fixed: 'left'
      },
      {
        prop: 'code',
        label: '藏品编号',
        sortable: 'custom',
        showOverflowTooltip: true
      },
      {
        prop: 'collectionName',
        label: '藏品名称',
        sortable: 'custom',
        showOverflowTooltip: true
      }
    ],
    toolbar: false,
    pagination: {
      pageSize: 6,
      layout: 'total, prev, pager, next, jumper'
    },
    footerStyle: { padding: '0px' },
    rowClickChecked: true
  })

  /** 表单数据 */
  const [form, resetFields] = useFormData<InboundRegisterParams>({
    type: 1, // 默认选择初次入库
    collectionIds: [],
    operator: '',
    warehouseId: undefined,
    storageDate: '',
    remark: ''
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

  /** 监听入库类型变化 */
  watch(
    () => form.type,
    (newType) => {
      // 清空已选择的藏品
      form.collectionIds = []
      if (newType) {
        handleCollectionSearch()
      } else {
        tableProps.datasource = []
      }
    }
  )

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
          imgs: documentImage.value
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
      // 加载藏品选项数据
      if (form.type) {
        handleCollectionSearch()
      }
    })
  }

  /** 重置表单 */
  const reset = () => {
    resetFields()
  }

  /** 藏品搜索 */
  const handleCollectionSearch = () => {
    loading.value = true
    const type = form.type || 1 // 确保 type 不为 undefined
    getCollectionsByType(type)
      .then((res) => {
        console.log('11111111', res)
        tableProps.datasource = res as any
      })
      .catch((e) => {
        EleMessage.error(e.message)
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    width: 100%;
  }
</style>
