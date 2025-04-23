<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form
      label-width="72px"
      @keyup.enter.prevent="search"
      @submit.prevent=""
    >
      <el-row :gutter="8">
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="角色名称">
            <el-input
              clearable
              v-model.trim="form.roleName"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="角色标识">
            <el-input
              clearable
              v-model.trim="form.roleCode"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="8" :sm="24" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data';
  import type { RoleParam } from '@/api/system/role/model';

  const emit = defineEmits<{
    (e: 'search', where?: RoleParam): void;
  }>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<RoleParam>({
    roleName: '',
    roleCode: '',
    comments: ''
  });

  /** 搜索 */
  const search = () => {
    emit('search', { ...form });
  };

  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
