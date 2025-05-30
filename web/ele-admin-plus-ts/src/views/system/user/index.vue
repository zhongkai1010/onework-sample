<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
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
            placeholder="输入机构名称搜索"
            :prefix-icon="SearchOutlined"
          />
        </div>
        <ele-loading
          :loading="loading"
          :style="{ flex: 1, paddingRight: '16px', overflow: 'auto' }"
        >
          <el-tree
            ref="treeRef"
            :data="data"
            highlight-current
            node-key="id"
            :props="{ label: 'organizationName' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{ '--ele-tree-item-height': '34px' }"
            @node-click="handleNodeClick"
          />
        </ele-loading>
        <template #body>
          <user-list :organization-id="current?.id ?? null" />
        </template>
      </ele-split-panel>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, nextTick, watch } from 'vue'
  import type { ElTree } from 'element-plus'
  import { EleMessage, toTree } from 'ele-admin-plus/es'
  import type { EleSplitPanel } from 'ele-admin-plus/es'
  import { SearchOutlined } from '@/components/icons'
  import { useMobile } from '@/utils/use-mobile'
  import UserList from './components/user-list.vue'
  import { listOrganizations } from '@/api/system/organization'
  import type { Organization } from '@/api/system/organization/model'

  // 扩展Organization类型，添加自定义字段
  interface ExtendedOrganization extends Omit<Organization, 'id'> {
    id: string | number
  }

  defineOptions({ name: 'SystemUser' })

  /** 是否是移动端 */
  const { mobile } = useMobile()

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null)

  /** 树组件 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 加载状态 */
  const loading = ref(true)

  /** 树形数据 */
  const data = ref<ExtendedOrganization[]>([])

  /** 选中数据 */
  const current = ref<ExtendedOrganization | null>(null)

  /** 机构搜索关键字 */
  const keywords = ref('')

  /** 查询 */
  const query = () => {
    loading.value = true
    listOrganizations()
      .then((list) => {
        loading.value = false
        const treeData = toTree({
          data: list,
          idField: 'id',
          parentIdField: 'parentId'
        })
        // 添加"全部"选项作为根节点
        data.value = [
          {
            id: 0,
            organizationName: '全部',
            children: treeData
          }
        ]
        nextTick(() => {
          handleNodeClick(data.value[0])
        })
      })
      .catch((e) => {
        loading.value = false
        EleMessage.error(e.message)
      })
  }

  /** 选择数据 */
  const handleNodeClick = (row?: ExtendedOrganization) => {
    // 移动端自动收起左侧
    if (current.value != null && mobile.value) {
      splitRef.value?.toggleCollapse?.(true)
    }
    if (row && row.id) {
      // 如果是"全部"选项，则传递null
      current.value = row.id === 0 ? null : row
      treeRef.value?.setCurrentKey?.(row.id)
    } else {
      current.value = null
    }
  }

  /** 树过滤方法 */
  const filterNode = (value: string, data: ExtendedOrganization) => {
    if (value) {
      return !!(data.organizationName && data.organizationName.includes(value))
    }
    return true
  }

  /** 树过滤 */
  watch(keywords, (value) => {
    treeRef.value?.filter?.(value)
  })

  query()
</script>
