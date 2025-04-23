<template>
  <div>
    <ele-pro-table
      :height="370"
      :border="true"
      :virtual="true"
      row-key="userId"
      :columns="columns"
      :datasource="datasource"
      :span-method="spanMethod"
      :toolbar="{ theme: 'default' }"
      :show-overflow-tooltip="true"
      :export-config="{ fileName: '成绩数据' }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type {
    DatasourceFunction,
    Columns
  } from 'ele-admin-plus/es/ele-pro-table/types';
  import { pageUserScores } from '@/api/example';

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center'
    },
    {
      columnKey: 'userName',
      prop: 'userName',
      label: '姓名'
    },
    {
      prop: 'courseName',
      label: '课程'
    },
    {
      prop: 'score',
      label: '得分'
    }
  ]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = () => {
    return pageUserScores();
  };

  /** 合并表格单元格 */
  const spanMethod = ({ row, column }) => {
    if (column.columnKey === 'userName') {
      return [row.userNameRowSpan, 1];
    }
    return [1, 1];
  };
</script>
