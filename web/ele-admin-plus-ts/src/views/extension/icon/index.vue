<template>
  <ele-page>
    <ele-card header="基础用法">
      <div style="max-width: 260px">
        <icon-select
          clearable
          filterable="popper"
          :popper-width="460"
          :popper-height="388"
          :popper-options="{ strategy: 'fixed' }"
          placeholder="请选择图标"
          v-model="icon"
        />
      </div>
    </ele-card>
    <demo-basic />
    <demo-advanced />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import IconSelect from '@/components/IconSelect/index.vue';
  import DemoBasic from './components/demo-basic.vue';
  import DemoAdvanced from './components/demo-advanced.vue';

  defineOptions({ name: 'ExtensionIcon' });

  const icon = ref('');
</script>
