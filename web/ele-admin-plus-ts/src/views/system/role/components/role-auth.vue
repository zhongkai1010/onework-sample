<!-- 角色权限分配弹窗 -->
<template>
  <ele-modal
    :width="460"
    title="分配权限"
    position="center"
    v-model="visible"
    :body-style="{ padding: '12px 0 12px 22px' }"
    @open="handleOpen"
  >
    <ele-loading
      :loading="authLoading"
      :spinner-style="{ background: 'transparent' }"
      :style="{
        paddingRight: '20px',
        height: 'calc(100vh - 192px)',
        maxHeight: 'calc(100dvh - 192px)',
        minHeight: '100px',
        overflow: 'auto'
      }"
    >
      <el-tree
        ref="treeRef"
        show-checkbox
        :data="authData"
        node-key="id"
        :default-expand-all="true"
        :props="{ label: 'title' }"
        :default-checked-keys="checkedKeys"
        :style="{ '--ele-tree-item-height': '28px' }"
      >
        <template #default="scope">
          <div>
            <el-icon
              v-if="scope.data.icon"
              :size="16"
              style="margin-right: 6px; vertical-align: -5px"
            >
              <component :is="scope.data.icon" />
            </el-icon>
            <span style="vertical-align: -2px">{{ scope.data.title }}</span>
          </div>
        </template>
      </el-tree>
    </ele-loading>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue'
  import type { ElTree } from 'element-plus'
  import { EleMessage, toTree, eachTree } from 'ele-admin-plus/es'
  import { listRoleMenus, updateRoleMenus } from '@/api/system/role'
  import type { Role } from '@/api/system/role/model'
  import type { Menu } from '@/api/system/menu/model'

  const props = defineProps<{
    /** 当前角色数据 */
    data?: Role | null
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 树组件实例 */
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  /** 权限数据 */
  const authData = ref<Menu[]>([])

  /** 权限数据请求状态 */
  const authLoading = ref(false)

  /** 提交状态 */
  const loading = ref(false)

  /** 角色权限选中的keys */
  const checkedKeys = ref<number[]>([])

  /** 查询权限数据 */
  const query = () => {
    authData.value = []
    checkedKeys.value = []
    if (!props.data) {
      return
    }
    authLoading.value = true
    listRoleMenus(props.data.id)
      .then((data) => {
        authLoading.value = false
        // 转成树形结构的数据
        authData.value = toTree({
          data: data,
          idField: 'id',
          parentIdField: 'parentId'
        })
        // 回显选中的数据
        nextTick(() => {
          const cks: number[] = []
          eachTree(authData.value, (d) => {
            if (d.id && d.checked && !d.children?.length) {
              cks.push(d.id)
            }
          })
          checkedKeys.value = cks
        })
      })
      .catch((e) => {
        authLoading.value = false
        EleMessage.error(e.message)
      })
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存权限分配 */
  const save = () => {
    loading.value = true
    const ids =
      (treeRef.value?.getCheckedKeys?.() ?? []).concat(
        treeRef.value?.getHalfCheckedKeys?.() ?? []
      ) ?? []
    updateRoleMenus(props.data?.id, ids as unknown as number[])
      .then((msg) => {
        loading.value = false
        EleMessage.success(msg)
        handleCancel()
      })
      .catch((e) => {
        loading.value = false
        EleMessage.error(e.message)
      })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    query()
  }
</script>
