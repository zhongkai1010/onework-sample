<template>
  <ele-page
    flex-table
    :multi-card="false"
    hide-footer
    style="min-height: 420px"
  >
    <ele-card
      flex-table
      :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }"
    >
      <ele-split-panel
        ref="splitRef"
        flex-table
        size="256px"
        allow-collapse
        :custom-style="{ borderWidth: '0 1px 0 0', padding: '16px 0' }"
        :body-style="{ padding: '16px 16px 0 0', overflow: 'hidden' }"
        :style="{ height: '100%', overflow: 'visible' }"
      >
        <div style="padding: 0 16px 12px 0">
          <el-input
            clearable
            :maxlength="20"
            v-model="keywords"
            placeholder="请输入搜索关键字"
            :prefix-icon="SearchOutlined"
          />
        </div>
        <ele-loading
          :loading="treeLoading"
          :style="{ flex: 1, paddingRight: '16px', overflow: 'auto' }"
        >
          <el-tree
            ref="treeRef"
            :data="treeData"
            highlight-current
            node-key="id"
            :props="{ label: 'name' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{ '--ele-tree-item-height': '34px' }"
          >
            <template #default="scope">
              <el-icon
                style="margin-right: 6px; color: #ffd659; font-size: 16px"
              >
                <FolderOutlined
                  v-if="scope.data.children?.length"
                  style="fill: currentColor"
                />
                <FileOutlined
                  v-else
                  style="transform: scale(0.9) translateY(1px); color: #faad14"
                />
              </el-icon>
              <span class="el-tree-node__label" style="margin-top: 2px">
                {{ scope.data.organizationName }}
              </span>
            </template>
          </el-tree>
        </ele-loading>
        <template #body>
          <data-table />
        </template>
      </ele-split-panel>
    </ele-card>
    <ReferenceButton />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ReferenceButton from './components/reference-button.vue';
  import { SearchOutlined } from '@/components/icons';
  import DataTable from './components/data-table.vue';
  /** 加载状态 */
  const treeLoading = ref(true);
  /** 搜索关键字 */
  const keywords = ref('');
  /** 树形数据 */
  const treeData = ref<any[]>([]);
  /** 树过滤方法 */
  const filterNode = (value: string, data: any) => {
    if (value) {
      return !!(data.name && data.name.includes(value));
    }
    return true;
  };
</script>

<style lang="scss" scoped></style>
