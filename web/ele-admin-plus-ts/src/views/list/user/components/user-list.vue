<template>
  <user-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
  <ele-pro-table
    ref="tableRef"
    row-key="userId"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    v-model:selections="selections"
    :highlight-current-row="true"
    :export-config="{ fileName: '用户数据', datasource: exportSource }"
    :print-config="{ datasource: exportSource }"
    :style="{ paddingBottom: '16px' }"
    cache-key="listUserTable"
  >
    <template #toolbar>
      <el-button
        type="primary"
        class="ele-btn-icon"
        :icon="PlusOutlined"
        @click="openEdit()"
      >
        新建
      </el-button>
      <el-button
        type="danger"
        class="ele-btn-icon"
        :icon="DeleteOutlined"
        @click="remove()"
      >
        删除
      </el-button>
    </template>
    <template #roles="{ row }">
      <el-tag
        v-for="item in row.roles"
        :key="item.roleId"
        size="small"
        :disable-transitions="true"
      >
        {{ item.roleName }}
      </el-tag>
    </template>
    <template #status="{ row }">
      <el-switch
        size="small"
        :model-value="row.status === 0"
        @change="(checked: boolean) => editStatus(checked, row)"
      />
    </template>
    <template #action="{ row }">
      <el-link type="primary" :underline="false" @click="openEdit(row)">
        修改
      </el-link>
      <el-divider direction="vertical" />
      <el-link
        type="primary"
        :underline="false"
        @mouseenter="(e: MouseEvent) => openMoreDropdown(e.currentTarget, row)"
      >
        <span>更多</span>
        <el-icon :size="12" style="vertical-align: -1px; margin-left: 2px">
          <ArrowDown />
        </el-icon>
      </el-link>
    </template>
  </ele-pro-table>
  <user-edit
    :data="current"
    v-model="showEdit"
    :organization-id="organizationId"
    :organization-data="organizationData"
    @done="reload"
  />
  <ele-dropdown
    ref="moreDropdownRef"
    trigger="hover"
    :triggerKeys="[]"
    :persistent="false"
    componentType="pro"
    :virtualTriggering="true"
    :virtualRef="moreDropdownVirtualRef"
    :disabled="!moreDropdownItems.length"
    :items="moreDropdownItems"
    @command="handleItemCommand"
  />
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue';
  import { ElMessageBox } from 'element-plus/es';
  import { EleMessage } from 'ele-admin-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type {
    DatasourceFunction,
    Columns
  } from 'ele-admin-plus/es/ele-pro-table/types';
  import type { EleDropdownInstance } from 'ele-admin-plus/es/ele-app/plus';
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types';
  import { PlusOutlined, DeleteOutlined, ArrowDown } from '@/components/icons';
  import UserSearch from './user-search.vue';
  import UserEdit from './user-edit.vue';
  import type { Organization } from '@/api/system/organization/model';
  import {
    pageUsers,
    removeUsers,
    updateUserStatus,
    updateUserPassword,
    listUsers
  } from '@/api/system/user';
  import type { User, UserParam } from '@/api/system/user/model';

  const props = defineProps<{
    /** 机构 id */
    organizationId?: number;
    /** 指定机构下拉数据 */
    organizationData?: Organization[];
  }>();

  /** 搜索栏实例 */
  const searchRef = ref<InstanceType<typeof UserSearch> | null>(null);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'username',
      label: '用户账号',
      sortable: 'custom',
      minWidth: 110
    },
    {
      prop: 'nickname',
      label: '用户名',
      sortable: 'custom',
      minWidth: 110
    },
    {
      prop: 'sexName',
      label: '性别',
      sortable: 'custom',
      width: 90,
      align: 'center'
    },
    {
      columnKey: 'roles',
      label: '角色',
      minWidth: 120,
      slot: 'roles',
      align: 'center',
      formatter: (row) => row.roles.map((d: any) => d.roleName).join(',')
    },
    {
      prop: 'createTime',
      label: '创建时间',
      sortable: 'custom',
      width: 180,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      width: 90,
      align: 'center',
      sortable: 'custom',
      slot: 'status',
      formatter: (row) => (row.status == 0 ? '正常' : '冻结')
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 128,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<User[]>([]);

  /** 当前编辑数据 */
  const current = ref<User | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageUsers({
      ...where,
      ...orders,
      ...pages,
      organizationId: props.organizationId
    });
  };

  /** 搜索 */
  const reload = (where?: UserParam) => {
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: User) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除 */
  const remove = (row?: User) => {
    const rows = row == null ? selections.value : [row];
    if (!rows.length) {
      EleMessage.error('请至少选择一条数据');
      return;
    }
    ElMessageBox.confirm(
      '确定要删除“' + rows.map((d) => d.nickname).join(', ') + '”吗?',
      '系统提示',
      { type: 'warning', draggable: true }
    )
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeUsers(rows.map((d) => d.userId))
          .then((msg) => {
            loading.close();
            EleMessage.success(msg);
            reload();
          })
          .catch((e) => {
            loading.close();
            EleMessage.error(e.message);
          });
      })
      .catch(() => {});
  };

  /** 修改用户状态 */
  const editStatus = (checked: boolean, row: User) => {
    const status = checked ? 0 : 1;
    updateUserStatus(row.userId, status)
      .then((msg) => {
        row.status = status;
        EleMessage.success(msg);
      })
      .catch((e) => {
        EleMessage.error(e.message);
      });
  };

  // 监听机构 id 变化
  watch(
    () => props.organizationId,
    () => {
      searchRef.value?.resetFields?.();
      reload({});
    }
  );

  /** 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders }) => {
    return listUsers({
      ...where,
      ...orders,
      organizationId: props.organizationId
    });
  };

  /** 下拉菜单组件 */
  const moreDropdownRef = ref<EleDropdownInstance>(null);

  /** 下拉菜单数据 */
  const moreDropdownItems = ref<DropdownItem[]>([]);

  /** 下拉菜单虚拟触发节点 */
  const moreDropdownVirtualRef = ref<any>();

  /** 当前打开的下拉菜单对应的数据 */
  let moreDropdownCurrentData: User | null = null;

  /** 获取下拉菜单数据 */
  const getDropdownMenus = (_item: User) => {
    return [
      { title: '重置密码', command: 'password' },
      { title: '删除用户', command: 'delete', divided: true, danger: true }
    ];
  };

  /** 打开下拉菜单 */
  const openMoreDropdown = (triggerEl: any, item: User) => {
    if (
      triggerEl == null ||
      moreDropdownVirtualRef.value === triggerEl ||
      (moreDropdownCurrentData != null && moreDropdownCurrentData === item)
    ) {
      return;
    }
    moreDropdownRef.value && moreDropdownRef.value.handleClose();
    nextTick(() => {
      moreDropdownCurrentData = item;
      moreDropdownItems.value = getDropdownMenus(item) || [];
      moreDropdownVirtualRef.value = triggerEl;
      if (moreDropdownItems.value.length) {
        nextTick(() => {
          moreDropdownRef.value && moreDropdownRef.value.handleOpen();
        });
      }
    });
  };

  /** 下拉菜单项点击事件 */
  const handleItemCommand = (command: string) => {
    if (moreDropdownCurrentData == null) {
      return;
    }
    const row = moreDropdownCurrentData;
    if (command === 'delete') {
      remove(row);
    } else if (command === 'password') {
      ElMessageBox.prompt(`请输入用户"${row.nickname}"的新密码：`, '重置密码', {
        inputPattern: /^[\S]{5,18}$/,
        inputErrorMessage: '密码必须为5-18位非空白字符',
        draggable: true
      })
        .then(({ value }) => {
          const loading = EleMessage.loading({
            message: '请求中..',
            plain: true
          });
          updateUserPassword(row.userId, value)
            .then((msg) => {
              loading.close();
              EleMessage.success(msg);
            })
            .catch((e) => {
              loading.close();
              EleMessage.error(e.message);
            });
        })
        .catch(() => {});
    }
  };
</script>
