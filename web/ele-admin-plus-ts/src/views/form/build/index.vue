<template>
  <ele-page flex-table hide-footer :multi-card="false">
    <ele-card flex-table :body-style="{ padding: 0, overflow: 'hidden' }">
      <pro-form-builder v-model="config" />
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { TemplateFormConfig } from 'ele-admin-plus/es/ele-pro-form-builder/types';
  import ProFormBuilder from '@/components/ProFormBuilder/index.vue';

  defineOptions({ name: 'FormBuild' });

  /** 表单配置数据 */
  const config = ref<TemplateFormConfig>({});
</script>
