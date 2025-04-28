<template>
  <div class="group-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>藏品组管理</span>
          <reference-button />
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" link @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ReferenceButton from './reference-button.vue';

  const tableData = ref([
    {
      name: '示例藏品组',
      description: '这是一个示例藏品组',
      createTime: '2024-01-01 12:00:00'
    }
  ]);

  const handleEdit = (row: any) => {
    console.log('编辑:', row);
  };

  const handleDelete = (row: any) => {
    console.log('删除:', row);
  };
</script>

<style lang="scss" scoped>
  .group-container {
    padding: 20px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
