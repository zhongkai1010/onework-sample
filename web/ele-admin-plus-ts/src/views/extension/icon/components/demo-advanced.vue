<template>
  <ele-card header="进阶用法">
    <div style="max-width: 260px">
      <ele-icon-select
        clearable
        filterable
        :data="icons"
        v-model="selectedIcon"
        :hide-on-single-tab="true"
        placeholder="请选择"
        :popper-options="{ strategy: 'fixed' }"
      >
        <template #icon="{ icon, prefix }">
          <img
            :src="`/ele-file-list/ic_file_${icon}.png`"
            :style="
              prefix
                ? { maxWidth: '22px', maxHeight: '22px' }
                : {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '24px',
                    height: '24px'
                  }
            "
          />
        </template>
      </ele-icon-select>
    </div>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { IconItem } from 'ele-admin-plus/es/ele-icon-select/types';

  /** 选中值 */
  const selectedIcon = ref('');

  /** 图标数据 */
  const icons = ref<IconItem[]>([
    {
      title: '',
      children: [
        {
          title: '文档',
          icons: [
            'folder',
            'word',
            'excel',
            'ppt',
            'pdf',
            'visio',
            'text',
            'code',
            'htm',
            'fonts',
            'zip',
            'ps',
            'cad',
            'bt',
            'misc'
          ]
        },
        {
          title: '媒体',
          icons: ['flash', 'music', 'video', 'picture']
        },
        {
          title: '应用',
          icons: ['android', 'exe', 'ipa']
        }
      ]
    }
  ]);
</script>
