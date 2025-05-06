<!-- 搜索表单 -->
<template>
  <el-form label-width="100px" @keyup.enter="search" @submit.prevent="">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品编号" label-width="auto">
          <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品名称" label-width="auto">
          <el-input clearable v-model.trim="form.collectionName" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品分类" label-width="auto">
          <category-select v-model="form.categoryId" placeholder="请选择" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="地域类型" label-width="auto">
          <el-select clearable v-model="form.regionType" placeholder="请选择" style="width: 100%">
            <el-option label="国内" value="国内" />
            <el-option label="国外" value="国外" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="地域" label-width="auto">
          <el-input clearable v-model.trim="form.region" placeholder="请输入地域" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品来源" label-width="auto">
          <el-select
            clearable
            v-model="form.collectionSource"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="征集" value="征集" />
            <el-option label="捐赠" value="捐赠" />
            <el-option label="考古发掘" value="考古发掘" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="入藏日期" label-width="auto">
          <el-date-picker
            v-model="form.collectionTime"
            type="date"
            placeholder="请选择"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="类型" label-width="auto">
          <el-select clearable v-model="form.type" placeholder="请选择" style="width: 100%">
            <el-option label="文物" value="文物" />
            <el-option label="艺术品" value="艺术品" />
            <el-option label="文献" value="文献" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label-width="16px">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { CollectionQueryParams } from '@/api/collection/catalog/model'
  import { CategorySelect } from '@/components/CustomForm'

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
    padding: 16px 0px 0px 0px;
  }
</style>
