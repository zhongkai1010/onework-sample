<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <ele-split-panel ref="splitRef" flex-table size="256px" allow-collapse :custom-style="{ borderWidth: '0 1px 0 0', padding: '16px 0' }" :body-style="{ padding: '16px 16px 0 0', overflow: 'hidden' }" :style="{ height: '100%', overflow: 'visible' }">
        <div style="padding: 0 16px 12px 0">
          <el-input clearable :maxlength="20" v-model="keywords" placeholder="请输入搜索关键字" :prefix-icon="SearchOutlined" />
        </div>
        <ele-loading :loading="treeLoading" :style="{ flex: 1, paddingRight: '16px', overflow: 'auto' }">
          <el-tree ref="treeRef" :data="treeData" highlight-current node-key="id" :props="{ label: 'name', children: 'children' }" :expand-on-click-node="false" :default-expand-all="true" :filter-node-method="filterNode" :style="{ '--ele-tree-item-height': '34px' }" @node-click="handleNodeClick">
            <template #default="scope">
              <el-icon
                style="margin-right: 6px; font-size: 16px"
                :style="{
                  color: scope.data.children?.length ? '#409EFF' : '#67C23A'
                }"
              >
                <FolderOutlined v-if="scope.data.children?.length" style="fill: currentColor" />
                <TagOutlined v-else style="transform: scale(0.9)" />
              </el-icon>
              <span class="el-tree-node__label" style="margin-top: 2px">
                {{ scope.data.name }}
              </span>
            </template>
          </el-tree>
        </ele-loading>
        <template #body>
          <data-table :category-id="currentCategoryId" />
        </template>
      </ele-split-panel>
    </ele-card>
    <reference-button />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue'
  import { toTree } from 'ele-admin-plus/es'
  import ReferenceButton from './components/reference-button.vue'
  import { SearchOutlined, FolderOutlined, TagOutlined } from '@/components/icons'
  import DataTable from './components/data-table.vue'
  import { listCategories } from '@/api/data/category'
  import type { Category } from '@/api/data/category/model'
  import type { ElTree } from 'element-plus'

  /** 树实例 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 加载状态 */
  const treeLoading = ref(true)
  /** 搜索关键字 */
  const keywords = ref('')
  /** 树形数据 */
  const treeData = ref<Category[]>([])
  /** 当前选中的分类ID */
  const currentCategoryId = ref<number>()

  /** 树过滤方法 */
  const filterNode = (value: string, data: Category) => {
    if (value) {
      return !!(data.name && data.name.includes(value))
    }
    return true
  }

  /** 加载分类数据 */
  const loadCategories = async () => {
    try {
      treeLoading.value = true
      const data = await listCategories()
      treeData.value = [
        {
          id: 0,
          name: '全部',
          code: 'all',
          description: '全部分类',
          children: toTree({
            data,
            idField: 'id',
            parentIdField: 'parentId'
          })
        }
      ]
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      treeLoading.value = false
    }
  }

  /** 处理节点点击 */
  const handleNodeClick = (data: Category) => {
    currentCategoryId.value = data.id === 0 ? undefined : data.id
  }

  // 监听搜索关键字变化
  watch(keywords, (val) => {
    treeRef.value?.filter(val)
  })

  // 组件挂载时加载数据
  onMounted(() => {
    loadCategories()
  })
</script>

<style lang="scss" scoped>
  /* No changes to the existing styles */
</style>
