<script setup lang="ts">
import ButtonCard from '@/components/ButtonCard.vue'
import FormCard from '@/components/FormCard.vue'
import MenuCard from '@/components/MenuCard.vue'
import { ElRow, ElCol } from 'element-plus'
</script>

<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="24" class="mb8">
        <FormCard />
      </el-col>
      <el-col :span="24" class="mb8">
        <ButtonCard />
      </el-col>
      <el-col :span="24" class="mb8">
        <MenuCard />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 8px;
}
.mb8 {
  margin-bottom: 8px;
}
</style>
