<!-- 搜索表单 -->
<template>
  <el-form
    label-width="100px"
    @keyup.enter="search"
    @submit.prevent=""
    :inline="true"
    label-position="left"
  >
    <el-form-item label="藏品编号">
      <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="藏品名称">
      <el-input clearable v-model.trim="form.collectionName" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="藏品分类">
      <category-select v-model="form.categoryId" placeholder="请选择" style="width: 192px" />
    </el-form-item>

    <el-form-item label="地域类型">
      <dict-data
        :code="DIC_KEY_REGION_TYPE"
        v-model="form.regionType"
        style="width: 192px"
        placeholder="请选择地域类型"
      />
    </el-form-item>
    <el-form-item label="地域">
      <el-input clearable v-model.trim="form.region" placeholder="请输入地域" />
    </el-form-item>
    <el-form-item label="藏品来源">
      <dict-data
        :code="DIC_KEY_COLLECTION_SOURCE"
        style="width: 192px"
        v-model="form.collectionSource"
        placeholder="请选择藏品来源"
      />
    </el-form-item>
    <el-form-item label="入藏日期">
      <el-date-picker
        v-model="form.collectionTime"
        type="date"
        placeholder="请选择"
        style="width: 192px"
      />
    </el-form-item>

    <el-form-item label="类型">
      <dict-data
        :code="DIC_KEY_COLLECTION_TYPE"
        v-model="form.type"
        style="width: 192px"
        placeholder="请选择藏品类型"
      />
    </el-form-item>
    <el-form-item label-width="16px">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { CollectionQueryParams } from '@/api/collection/catalog/model'
  import { CategorySelect } from '@/components/CustomForm'
  import {
    DIC_KEY_REGION_TYPE,
    DIC_KEY_COLLECTION_SOURCE,
    DIC_KEY_COLLECTION_TYPE
  } from '@/config/setting'

  const emit = defineEmits<{
    (e: 'search', where?: CollectionQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<CollectionQueryParams>({})

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /**  重置 */
  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({ resetFields })
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 0px 0px 0px 0px;
  }
</style>
