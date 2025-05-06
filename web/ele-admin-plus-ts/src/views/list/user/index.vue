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
            placeholder="左侧树还支持鼠标右键"
            :prefix-icon="SearchOutlined"
          />
        </div>
        <div style="margin-bottom: 12px">
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="PlusOutlined"
            @click="openEdit(void 0, current?.organizationId)"
          >
            新建
          </el-button>
          <el-button
            type="warning"
            :disabled="!current"
            class="ele-btn-icon"
            :icon="EditOutlined"
            @click="openEdit(current)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            :disabled="!current"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="remove(current)"
          >
            删除
          </el-button>
        </div>
        <ele-loading
          :loading="loading"
          :style="{ flex: 1, paddingRight: '16px', overflow: 'auto' }"
        >
          <el-tree
            ref="treeRef"
            :data="data"
            highlight-current
            node-key="organizationId"
            :props="{ label: 'organizationName' }"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :style="{ '--ele-tree-item-height': '34px' }"
            @node-click="handleNodeClick"
            @node-contextmenu="handleTreeContextmenu"
          >
            <template #default="scope">
              <el-icon style="margin-right: 6px; color: #ffd659; font-size: 16px">
                <FolderOutlined v-if="scope.data.children?.length" style="fill: currentColor" />
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
          <user-list
            v-if="current"
            :organization-id="current.organizationId"
            :organization-data="data"
          />
        </template>
      </ele-split-panel>
    </ele-card>
    <organization-edit
      v-model="showEdit"
      :data="editData"
      :organization-id="organizationId"
      :organization-data="data"
      @done="query"
    />
    <ele-dropdown
      ref="ctxMenuDropdownRef"
      trigger="contextmenu"
      :trigger-keys="[]"
      :icon-props="{ size: 15 }"
      :popper-options="{
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, -4] } }]
      }"
      :persistent="false"
      component-type="pro"
      :prevent-contextmenu="true"
      :virtual-triggering="true"
      :virtual-ref="ctxMenuDropdownVirtualRef"
      :disabled="!ctxMenuDropdownItems.length"
      :items="ctxMenuDropdownItems"
      :popper-style="ctxMenuDropdownStyle"
      @command="handleItemCommand"
    />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, nextTick, watch, reactive, markRaw } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import type { ElTree } from 'element-plus'
  import { EleMessage, toTree, queryChild } from 'ele-admin-plus/es'
  import type { EleSplitPanel } from 'ele-admin-plus/es'
  import type { EleDropdownInstance } from 'ele-admin-plus/es/ele-app/plus'
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types'
  import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    FolderOutlined,
    FileOutlined
  } from '@/components/icons'
  import { useMobile } from '@/utils/use-mobile'
  import UserList from './components/user-list.vue'
  import OrganizationEdit from '@/views/system/organization/components/organization-edit.vue'
  import { listOrganizations, removeOrganization } from '@/api/system/organization'
  import type { Organization } from '@/api/system/organization/model'

  defineOptions({ name: 'ListUser' })

  /** 是否是移动端 */
  const { mobile } = useMobile()

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null)

  /** 树组件 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 加载状态 */
  const loading = ref(true)

  /** 树形数据 */
  const data = ref<Organization[]>([])

  /** 选中数据 */
  const current = ref<Organization | null>(null)

  /** 机构搜索关键字 */
  const keywords = ref('')

  /** 是否显示表单弹窗 */
  const showEdit = ref(false)

  /** 编辑回显数据 */
  const editData = ref<Organization | null>(null)

  /** 添加时上级 */
  const organizationId = ref<number>()

  /** 查询 */
  const query = () => {
    loading.value = true
    listOrganizations()
      .then((list) => {
        loading.value = false
        data.value = toTree({
          data: list,
          idField: 'organizationId',
          parentIdField: 'parentId'
        })
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
  const handleNodeClick = (row?: Organization) => {
    // 移动端自动收起左侧
    if (current.value != null && mobile.value) {
      splitRef.value?.toggleCollapse?.(true)
    }
    if (row && row.organizationId) {
      current.value = row
      treeRef.value?.setCurrentKey?.(row.organizationId)
    } else {
      current.value = null
    }
  }

  /** 打开编辑弹窗 */
  const openEdit = (item?: Organization | null, id?: number) => {
    editData.value = item ?? null
    organizationId.value = id
    showEdit.value = true
  }

  /** 删除 */
  const remove = (item?: Organization | null) => {
    const row = item
    if (!row) {
      return
    }
    ElMessageBox.confirm(`确定要删除“${row.organizationName}”吗?`, '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        removeOrganization(row.organizationId)
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            query()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /** 树过滤方法 */
  const filterNode = (value: string, data: Organization) => {
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

  /** 右键菜单组件 */
  const ctxMenuDropdownRef = ref<EleDropdownInstance>(null)

  /** 右键菜单数据 */
  const ctxMenuDropdownItems = ref<DropdownItem[]>([])

  /** 右键菜单虚拟触发节点 */
  const ctxMenuDropdownVirtualRef = ref<any>()

  /** 当前打开的右键菜单对应的数据 */
  let ctxMenuCurrentData: Organization | null = null

  /** 右键菜单调整位置 */
  const ctxMenuDropdownStyle = reactive({ marginLeft: '0px' })

  /** 获取右键菜单数据 */
  const getContextMenus = (_item: Organization) => {
    return [
      { title: '添加下级', command: 'add', icon: markRaw(PlusOutlined) },
      { title: '修改机构', command: 'edit', icon: markRaw(EditOutlined) },
      {
        title: '删除机构',
        command: 'del',
        icon: markRaw(DeleteOutlined),
        divided: true,
        danger: true
      }
    ]
  }

  /** 打开右键菜单 */
  const openCtxMenuDropdown = (triggerEl: any, item: Organization) => {
    ctxMenuDropdownRef.value && ctxMenuDropdownRef.value.handleClose()
    nextTick(() => {
      ctxMenuCurrentData = item
      ctxMenuDropdownItems.value = getContextMenus(item) || []
      ctxMenuDropdownVirtualRef.value = triggerEl
      if (ctxMenuDropdownItems.value.length) {
        nextTick(() => {
          ctxMenuDropdownRef.value && ctxMenuDropdownRef.value.handleOpen()
        })
      }
    })
  }

  /** 右键菜单项点击事件 */
  const handleItemCommand = (command: string) => {
    if (ctxMenuCurrentData == null) {
      return
    }
    if (command === 'add') {
      openEdit(void 0, ctxMenuCurrentData.organizationId)
    } else if (command === 'edit') {
      openEdit(ctxMenuCurrentData)
    } else if (command === 'del') {
      remove(ctxMenuCurrentData)
    }
  }

  /** 树组件右键事件 */
  const handleTreeContextmenu = (e: MouseEvent, item: Organization) => {
    const triggerEl = queryChild(
      e.currentTarget as HTMLElement,
      'el-tree-node__content'
    ) as HTMLElement
    const rect = triggerEl.getBoundingClientRect()
    ctxMenuDropdownStyle.marginLeft = `${e.clientX - rect.left - rect.width / 2}px`
    openCtxMenuDropdown(triggerEl, item)
  }
</script>
