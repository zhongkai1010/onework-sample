<template>
  <ele-page :multi-card="false">
    <ele-card :body-style="{ padding: 0, overflow: 'hidden' }">
      <ele-split-panel
        ref="splitRef"
        space="0px"
        size="180px"
        :allow-collapse="mobile"
        :custom-style="{ borderWidth: '0 1px 0 0', padding: '10px 0' }"
        :body-style="{ padding: '10px 20px 14px 16px', overflow: 'hidden' }"
        :collapse-style="{ marginLeft: '4px' }"
        style="min-height: 708px; border-radius: var(--ele-card-radius)"
      >
        <ele-menus :items="items as any" :default-active="active" class="demo-menu" @itemClick="handleMenuItemClick" />
        <template #body>
          <transition name="slide-right" mode="out-in">
            <demo-base v-if="active == 'base'" />
            <tree-table v-else-if="active == 'tree'" />
            <default-sorter v-else-if="active == 'sorter'" />
            <nested-table v-else-if="active == 'nested'" />
            <expandable-table v-else-if="active == 'expandable'" />
            <merge-cell v-else-if="active == 'merge'" />
            <editable-table v-else-if="active == 'editable'" />
            <sortable-table v-else-if="active == 'sortable'" />
            <demo-selections v-else-if="active == 'selections'" />
            <demo-contextmenu v-else-if="active == 'contextmenu'" />
            <virtual-base v-else-if="active == 'virtual-base'" />
            <virtual-header v-else-if="active == 'virtual-header'" />
            <virtual-merge v-else-if="active == 'virtual-merge'" />
            <virtual-tree v-else-if="active == 'virtual-tree'" />
            <virtual-expandable v-else-if="active == 'virtual-expandable'" />
          </transition>
        </template>
      </ele-split-panel>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { EleSplitPanel } from 'ele-admin-plus/es'
  import type { MenuItem } from 'ele-admin-plus/es/ele-menus/types'
  import { useMobile } from '@/utils/use-mobile'
  import DemoBase from './components/demo-base.vue'
  import TreeTable from './components/tree-table.vue'
  import DefaultSorter from './components/default-sorter.vue'
  import NestedTable from './components/nested-table.vue'
  import ExpandableTable from './components/expandable-table.vue'
  import MergeCell from './components/merge-cell.vue'
  import EditableTable from './components/editable-table.vue'
  import SortableTable from './components/sortable-table.vue'
  import DemoSelections from './components/demo-selections.vue'
  import DemoContextmenu from './components/demo-contextmenu.vue'
  import VirtualBase from './components/virtual-base.vue'
  import VirtualHeader from './components/virtual-header.vue'
  import VirtualMerge from './components/virtual-merge.vue'
  import VirtualTree from './components/virtual-tree.vue'
  import VirtualExpandable from './components/virtual-expandable.vue'

  defineOptions({ name: 'ExtensionTable' })

  /** 是否是移动端 */
  const { mobile } = useMobile()

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null)

  /** 选中 */
  const active = ref<string>('base')

  /** 菜单 */
  const items = ref<MenuItem[]>([
    {
      index: 'base',
      title: '基础示例'
    },
    {
      index: 'tree',
      title: '树表格懒加载'
    },
    {
      index: 'sorter',
      title: '默认排序筛选'
    },
    {
      index: 'nested',
      title: '嵌套表格'
    },
    {
      index: 'expandable',
      title: '可展开行'
    },
    {
      index: 'merge',
      title: '合并单元格'
    },
    {
      index: 'editable',
      title: '编辑表格'
    },
    {
      index: 'sortable',
      title: '拖拽排序'
    },
    {
      index: 'selections',
      title: '单选多选'
    },
    {
      index: 'contextmenu',
      title: '鼠标右键'
    },
    {
      index: 'virtual',
      title: '以下为虚拟滚动表格',
      group: true,
      children: [
        {
          index: 'virtual-base',
          title: '基础示例'
        },
        {
          index: 'virtual-header',
          title: '多级表头'
        },
        {
          index: 'virtual-merge',
          title: '合并单元格'
        },
        {
          index: 'virtual-tree',
          title: '树形表格'
        },
        {
          index: 'virtual-expandable',
          title: '可展开行'
        }
      ]
    }
  ])

  /** 菜单点击事件 */
  const handleMenuItemClick = (item: MenuItem) => {
    active.value = item.index as string
    // 移动端自动收起左侧
    if (mobile.value) {
      splitRef.value?.toggleCollapse?.(true)
    }
  }
</script>

<style lang="scss" scoped>
  .demo-menu {
    width: 100%;
    background: none;
    border: none;

    :deep(> .el-menu-item-group > .el-menu-item-group__title) {
      border-top: 1px solid var(--el-border-color-light);
      padding-bottom: 8px;
      padding-top: 12px;
    }
  }
</style>
