<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0px' }">
      <ele-split-panel
        ref="splitRef"
        flex-table
        space="0px"
        size="320px"
        :min-size="240"
        :max-size="600"
        :resizable="true"
        :body-style="{ overflow: 'hidden', padding: '16px' }"
        :custom-style="{ padding: '16px' }"
        :responsive="false"
        :allow-collapse="true"
      >
        <el-input
          clearable
          :maxlength="20"
          v-model.trim="keywords"
          placeholder="请输入搜索关键字"
          :prefix-icon="SearchOutlined"
        />
        <div style="margin: 8px 0px; display: flex; gap: 8px">
          <el-button type="primary" size="small" @click="handleExpandAll">全部展开</el-button>
          <el-button type="info" size="small" @click="handleCollapseAll">全部折叠</el-button>
        </div>

        <ele-loading :loading="treeLoading" :style="{ flex: 1, overflow: 'auto' }">
          <el-tree
            ref="treeRef"
            :data="treeData"
            highlight-current
            v-loading="treeLoading"
            node-key="id"
            :props="{ label: 'inventoryTitle', children: 'children' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{ '--ele-tree-item-height': '34px' }"
            @node-click="handleNodeClick"
          >
            <template #default="{ data }">
              <div class="flex items-center">
                <el-icon
                  style="margin-right: 6px; font-size: 16px"
                  :style="{
                    color: data.children?.length ? '#409EFF' : '#67C23A'
                  }"
                >
                  <FolderOutlined v-if="data.children?.length" style="fill: currentColor" />
                  <TagOutlined v-else style="transform: scale(0.9)" />
                </el-icon>
                <span class="el-tree-node__label" style="margin-top: 2px">
                  {{ data.inventoryTitle }}
                </span>
                <el-tag
                  v-if="!data.children?.length"
                  size="small"
                  :type="data.status === 1 ? 'success' : data.status === 2 ? 'warning' : 'info'"
                  style="margin-left: 8px"
                >
                  {{ data.status === 1 ? '已完成' : data.status === 2 ? '进行中' : '未开始' }}
                </el-tag>
              </div>
            </template>
          </el-tree>
        </ele-loading>
        <template #body>
          <div class="flex flex-col h-full">
            <template v-if="!treeLoading && currentPlanId !== '0'">
              <data-table :plan-id="currentPlanId" />
            </template>
            <template v-else>
              <div class="flex items-center justify-center h-full text-gray-400">
                {{ treeLoading ? '加载中...' : '请选择盘点计划' }}
              </div>
            </template>
          </div>
        </template>
      </ele-split-panel>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue'
  import { toTree } from 'ele-admin-plus/es'
  import { SearchOutlined, FolderOutlined, TagOutlined } from '@/components/icons'
  import DataTable from './components/data-table.vue'
  import { getInventoryPlanList } from '@/api/inventory-check/plan'
  import type { InventoryPlan } from '@/api/inventory-check/plan/model'
  import type { ElTree } from 'element-plus'

  defineOptions({
    name: 'InventoryCheck',
    title: '盘点管理',
    icon: 'el-icon-box',
    order: 4
  })

  /** 树实例 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 加载状态 */
  const treeLoading = ref(true)
  /** 搜索关键字 */
  const keywords = ref('')
  /** 树形数据 */
  const treeData = ref<(InventoryPlan & { children?: InventoryPlan[] })[]>([])
  /** 当前选中的计划ID */
  const currentPlanId = ref<string>('0')

  /** 树过滤方法 */
  const filterNode = (value: string, data: InventoryPlan) => {
    if (value) {
      return !!(data.inventoryTitle && data.inventoryTitle.includes(value))
    }
    return true
  }

  /** 加载盘点计划数据 */
  const loadPlans = async () => {
    try {
      treeLoading.value = true
      const data = await getInventoryPlanList()
      treeData.value = [
        {
          id: 0,
          inventoryTitle: '全部',
          startTime: '',
          endTime: '',
          inventoryPurpose: '',
          planner: '',
          executor: '',
          storageLocation: '',
          categories: [],
          acceptanceDate: '',
          status: 0,
          children: toTree({
            data,
            idField: 'id',
            parentIdField: 'parentId'
          })
        }
      ]
      // 默认选中第一个子节点
      if (treeData.value[0].children?.length) {
        const firstChild = treeData.value[0].children[0]
        currentPlanId.value = firstChild.id.toString()
        treeRef.value?.setCurrentKey(firstChild.id)
      }
    } catch (error) {
      console.error('Failed to load inventory check plans:', error)
    } finally {
      treeLoading.value = false
    }
  }

  /** 处理节点点击 */
  const handleNodeClick = (data: InventoryPlan) => {
    currentPlanId.value = data.id.toString()
  }

  /** 处理全部展开 */
  const handleExpandAll = () => {
    const nodes = treeRef.value?.store?.nodesMap
    if (nodes) {
      Object.values(nodes).forEach((node: any) => {
        node.expand()
      })
    }
  }

  /** 处理全部折叠 */
  const handleCollapseAll = () => {
    const nodes = treeRef.value?.store?.nodesMap
    if (nodes) {
      Object.values(nodes).forEach((node: any) => {
        node.collapse()
      })
    }
  }

  // 监听搜索关键字变化
  watch(keywords, (val) => {
    treeRef.value?.filter(val)
  })

  // 组件挂载时加载数据
  onMounted(() => {
    loadPlans()
  })
</script>

<style lang="scss" scoped></style>
