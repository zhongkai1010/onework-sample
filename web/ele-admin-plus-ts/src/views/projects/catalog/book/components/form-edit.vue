<template>
  <ele-modal
    form
    v-model="visible"
    :title="isUpdate ? '修改图书' : '添加图书'"
    :width="680"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="图片信息" prop="imageInfo">
        <CommonUpload
          v-model="imageUploadValue"
          :limit="1"
          accept="image/*"
          :multiple="false"
          :drag="false"
          listType="image"
          style="width: 178px"
        />
      </el-form-item>
      <el-form-item label="编号类别" prop="numberCategory">
        <dict-data
          :code="DIC_KEY_CODE_CATEGORY"
          v-model="form.numberCategory"
          placeholder="请选择编号类别"
          clearable
        />
      </el-form-item>
      <el-form-item label="图书名称" prop="collectionName">
        <el-input v-model="form.collectionName" placeholder="请输入图书名称" clearable />
      </el-form-item>
      <el-form-item label="图书编号" prop="collectionCode">
        <el-input v-model="form.collectionCode" placeholder="请输入图书编号" clearable />
      </el-form-item>
      <el-form-item v-if="isUpdate" label="藏品分类" prop="categoryId">
        <CategorySelect v-model="form.categoryId" placeholder="请选择藏品分类" />
      </el-form-item>

      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="form.isbn" placeholder="请输入ISBN" clearable />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="请输入作者" clearable />
      </el-form-item>
      <el-form-item label="所属仓库" prop="warehouseId">
        <WarehouseSelect v-model="form.warehouseId" placeholder="请选择仓库" />
      </el-form-item>
      <el-form-item label="藏品来源" prop="collectionSource">
        <dict-data
          :code="DIC_KEY_COLLECTION_SOURCE"
          v-model="form.collectionSource"
          placeholder="请选择编号类别"
          clearable
        />
      </el-form-item>
      <el-form-item label="图书价值" prop="bookValue">
        <el-input v-model="form.bookValue" placeholder="请输入图书价值" clearable />
      </el-form-item>
      <el-form-item label="保存状态" prop="preservationStatus">
        <dict-data
          :code="DIC_KEY_PRESERVATION_STATUS"
          v-model="form.preservationStatus"
          placeholder="请选择编号类别"
          clearable
        />
      </el-form-item>
      <el-form-item label="征集日期" prop="collectionDate">
        <el-date-picker
          v-model="form.collectionDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择征集日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="入藏年度" prop="collectionYear">
        <el-input v-model="form.collectionYear" placeholder="请输入入藏年度" clearable />
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input v-model="form.notes" type="textarea" placeholder="请输入备注" :rows="3" />
      </el-form-item>
      <el-form-item v-if="isUpdate" label="藏品状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择藏品状态" clearable>
          <el-option label="未审核" :value="0" />
          <el-option label="在藏" :value="1" />
          <el-option label="修复中" :value="2" />
          <el-option label="出库中" :value="3" />
          <el-option label="已注销" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isUpdate" label="类型" prop="type">
        <dict-data :code="DIC_KEY_COLLECTION_TYPE" v-model="form.type" placeholder="请选择类型" />
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
  import DictData from '@/components/DictData/index.vue'
  import {
    DIC_KEY_CODE_CATEGORY,
    DIC_KEY_COLLECTION_SOURCE,
    DIC_KEY_PRESERVATION_STATUS,
    DIC_KEY_COLLECTION_TYPE
  } from '@/config/setting'
  import { WarehouseSelect } from '@/components/CustomForm'
  import CommonUpload from '@/components/CommonUpload/index.vue'
  import { CategorySelect } from '@/components/CustomForm'

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
    imageInfo: '',
    numberCategory: '',
    collectionName: '',
    collectionCode: '',
    rfidCode: '',
    categoryId: void 0,
    type: '',
    isbn: '',
    author: '',
    warehouseId: void 0,
    collectionSource: '',
    bookValue: '',
    preservationStatus: '',
    collectionDate: '',
    collectionYear: '',
    status: void 0,
    notes: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({})

  /** 图片上传的值 */
  const imageUploadValue = ref<any[]>([])

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
      // 取图片url
      const imageUrl = imageUploadValue.value.length > 0 ? imageUploadValue.value[0].url : ''
      if (isUpdate.value && props.data) {
        updateBook({
          ...props.data,
          ...form,
          imageInfo: imageUrl
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
        addBook({
          ...form,
          imageInfo: imageUrl
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
      }
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      // 处理imageInfo为UploadItem[]
      let imageArr: any = []
      if (props.data.imageInfo && typeof props.data.imageInfo === 'string') {
        imageArr = [{ url: props.data.imageInfo, name: '图片', status: 'done', key: Date.now() }]
      }
      imageUploadValue.value = imageArr

      assignFields({
        ...props.data
      })
      isUpdate.value = true
    } else {
      resetFields()
      imageUploadValue.value = []
      isUpdate.value = false
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.()
      })
    })
  }
</script>
