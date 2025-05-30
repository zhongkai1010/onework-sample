<template>
  <ElTree
    ref="treeRef"
    :data="groupData"
    :highlightCurrent="true"
    nodeKey="id"
    :props="{ label: 'name' }"
    :expandOnClickNode="false"
    :defaultExpandAll="true"
    class="file-picker-left"
    @node-click="handleGroupSelect"
    @node-contextmenu="handleGroupContextmenu"
  >
    <template #default="scope">
      <img src="/ele-file-list/ic_file_folder.png" class="file-picker-tree-icon" />
      <span class="el-tree-node__label" :title="scope.data.name">
        {{ scope.data.name }}
      </span>
      <ElIcon
        v-if="scope.data.id !== 0 && scope.data.id !== -1"
        class="file-picker-tree-more"
        @click.stop="(e) => handleMoreIconClick(e, scope.data)"
      >
        <MoreOutlined style="transform: scale(1.1)" />
      </ElIcon>
    </template>
  </ElTree>
  <ElLink type="primary" :underline="false" class="file-picker-left-add" @click="handleAddBtnClick">
    添加分组
  </ElLink>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { ElTree } from 'element-plus'
  import { queryChild } from 'ele-admin-plus/es'
  import { MoreOutlined } from '@/components/icons'
  import type { UserFile } from '@/api/system/user-file/model'

  defineProps<{
    /** 分组数据 */
    groupData: UserFile[]
  }>()

  const emit = defineEmits<{
    (e: 'groupSelect', item: UserFile, isTreeClick?: boolean): void
    (e: 'addBtnClick'): void
    (e: 'moreIconClick', triggerEl: any, item: UserFile): void
    (e: 'hideGroupCtxMenu'): void
  }>()

  /** 树组件 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 分组选中事件 */
  const handleGroupSelect = (item: UserFile) => {
    emit('groupSelect', item, true)
  }

  /** 添加分组按钮点击事件 */
  const handleAddBtnClick = () => {
    emit('addBtnClick')
  }

  /** 更多图标点击事件 */
  const handleMoreIconClick = (e: MouseEvent, item: UserFile) => {
    emit('moreIconClick', e.currentTarget, item)
  }

  /** 分组右键事件 */
  const handleGroupContextmenu = (e: MouseEvent, item: UserFile) => {
    if (item.id === 0 || item.id === -1) {
      emit('hideGroupCtxMenu')
      return
    }
    const triggerEl = queryChild(
      e.currentTarget as HTMLElement,
      'el-tree-node__content'
    )?.querySelector?.('.file-picker-tree-more')
    // @ts-ignore
    triggerEl && triggerEl.click()
  }

  /** 设置选中分组 */
  const setSelectedGroup = (item: UserFile) => {
    treeRef.value?.setCurrentKey?.(item.id)
  }

  defineExpose({ setSelectedGroup })
</script>
