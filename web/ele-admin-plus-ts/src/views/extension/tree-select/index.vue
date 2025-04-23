<template>
  <ele-page :multi-card="true">
    <demo-basic />
    <demo-multiple />
    <demo-strategy />
    <demo-search />
    <demo-lazy />
  </ele-page>
</template>

<script lang="ts" setup>
  import DemoBasic from './components/demo-basic.vue';
  import DemoMultiple from './components/demo-multiple.vue';
  import DemoStrategy from './components/demo-strategy.vue';
  import DemoSearch from './components/demo-search.vue';
  import DemoLazy from './components/demo-lazy.vue';

  defineOptions({ name: 'ExtensionTreeSelect' });
</script>
