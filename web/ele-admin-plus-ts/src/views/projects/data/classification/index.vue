<template>
  <ele-page
    flex-table
    :multi-card="false"
    hide-footer
    style="min-height: 420px"
  >
    <ele-card flex-table>
      <!---搜索条件--->
      <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
        <el-row :gutter="8">
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="用户账号">
              <el-input
                clearable
                v-model.trim="form.username"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="用户名">
              <el-input
                clearable
                v-model.trim="form.nickname"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="性别">
              <dict-data code="sex" v-model="form.sex" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label-width="16px">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!---表格--->
      <ele-pro-table
        ref="tableRef"
        row-key="userId"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :export-config="{ fileName: '用户数据', datasource: exportSource }"
        :print-config="{ datasource: exportSource }"
        :style="{ paddingBottom: '16px' }"
        cache-key="listUserTable"
      >
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined">
            新建
          </el-button>
          <el-button type="danger" class="ele-btn-icon" :icon="DeleteOutlined">
            删除
          </el-button>
        </template>
        <template #roles="{ row }">
          <el-tag
            v-for="item in row.roles"
            :key="item.roleId"
            size="small"
            :disable-transitions="true"
          >
            {{ item.roleName }}
          </el-tag>
        </template>
        <template #action>
          <el-link type="primary" :underline="false"> 修改 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <ReferenceButton />
  </ele-page>
</template>

<script lang="ts" setup>
  import ReferenceButton from './components/reference-button.vue';
  import { useFormData } from '@/utils/use-form-data';
  import { ref } from 'vue';
  import type {
    DatasourceFunction,
    Columns
  } from 'ele-admin-plus/es/ele-pro-table/types';
  import { PlusOutlined, DeleteOutlined } from '@/components/icons';
  import { pageUsers, listUsers } from '@/api/system/user';
  import type { User, UserParam } from '@/api/system/user/model';

  /** 表单数据 */
  const [form, resetFields] = useFormData<UserParam>({
    username: '',
    nickname: '',
    sex: void 0
  });
  /**  重置 */
  const reset = () => {
    resetFields();
    search();
  };

  /** 搜索 */
  const search = () => {};

  /** 表格选中数据 */
  const selections = ref<User[]>([]);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'username',
      label: '用户账号',
      sortable: 'custom',
      minWidth: 110
    },
    {
      prop: 'nickname',
      label: '用户名',
      sortable: 'custom',
      minWidth: 110
    },
    {
      prop: 'sexName',
      label: '性别',
      sortable: 'custom',
      width: 90,
      align: 'center'
    },
    {
      columnKey: 'roles',
      label: '角色',
      minWidth: 120,
      slot: 'roles',
      align: 'center',
      formatter: (row) => row.roles.map((d: any) => d.roleName).join(',')
    },
    {
      prop: 'createTime',
      label: '创建时间',
      sortable: 'custom',
      width: 180,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      width: 90,
      align: 'center',
      sortable: 'custom',
      slot: 'status',
      formatter: (row) => (row.status == 0 ? '正常' : '冻结')
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 128,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUsers({
      ...where,
      ...orders,
      ...pages
    });
  };

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return listUsers({
      ...where,
      ...orders
    });
  };
</script>

<style lang="scss" scoped></style>
