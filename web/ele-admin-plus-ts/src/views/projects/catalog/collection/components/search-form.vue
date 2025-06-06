<!-- 搜索表单 -->
<template>
  <el-form @keyup.enter="search" @submit.prevent="" :inline="true" label-position="left">
    <el-form-item label="藏品编号">
      <el-input clearable v-model.trim="form.code" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="藏品名称">
      <el-input clearable v-model.trim="form.collectionName" placeholder="请输入" />
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
    <el-form-item label="入藏日期范围">
      <dict-data
        style="width: 190px"
        :code="DIC_KEY_ACQUISITION_DATE_RANGE"
        v-model="form.collectionDateRange"
        placeholder="请选择入藏日期范围"
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
  import {
    DIC_KEY_REGION_TYPE,
    DIC_KEY_COLLECTION_SOURCE,
    DIC_KEY_COLLECTION_TYPE,
    DIC_KEY_ACQUISITION_DATE_RANGE
  } from '@/config/setting'

  const emit = defineEmits<{
    (e: 'search', where?: CollectionQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<CollectionQueryParams>({
    /** 藏品编号 */
    code: undefined,
    /** 藏品名称 */
    collectionName: undefined,
    /** 藏品类别ID */
    categoryId: undefined,
    /** 地域类型 */
    regionType: undefined,
    /** 地域 */
    region: undefined,
    /** 藏品来源 */
    collectionSource: undefined,
    /** 入藏日期范围 */
    collectionDateRange: undefined,
    /** 类型 */
    type: undefined
  })

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
