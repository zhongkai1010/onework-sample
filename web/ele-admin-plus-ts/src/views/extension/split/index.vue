<template>
  <ele-page
    hide-footer
    :flex-table="type !== 0"
    :multi-card="type === 0"
    :style="type === 0 ? void 0 : { minHeight: '420px' }"
  >
    <demo-basic v-if="type === 0" @change="handleChange" />
    <demo-table v-else @change="handleChange" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoBasic from './components/demo-basic.vue'
  import DemoTable from './components/demo-table.vue'

  defineOptions({ name: 'ExtensionSplit' })

  const type = ref(0)

  const handleChange = (value: number) => {
    type.value = value
  }
</script>
