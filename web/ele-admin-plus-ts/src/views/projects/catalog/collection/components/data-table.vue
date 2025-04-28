<template>
  <user-search ref="searchRef" style="margin-bottom: -14px" @search="reload" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    v-model:selections="selections"
    :highlight-current-row="true"
    :export-config="{ fileName: '用户数据', datasource: exportSource }"
    :print-config="{ datasource: exportSource }"
    :style="{ paddingBottom: '16px' }"
    cache-key="collectionTable"
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
    <template #action="{ row }">
      <el-link type="primary" :underline="false" @click="openEdit(row)">
        修改
      </el-link>
      <el-divider direction="vertical" />
      <el-link type="danger" :underline="false" @click="remove(row)">
        删除
      </el-link>
    </template>
    <template #imageInfo="{ row }">
      <el-image
        v-if="row.imageInfo"
        :src="row.imageInfo"
        :preview-src-list="[row.imageInfo]"
        fit="cover"
        class="w-20 h-20"
      />
      <el-empty v-else description="暂无图片" :image-size="40" />
    </template>
  </ele-pro-table>

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
  import { PlusOutlined, DeleteOutlined } from '@/components/icons';
  import UserSearch from './search-form.vue';
  import { updateUserPassword, listUsers } from '@/api/system/user';
  import { getCatalogs, deleteCollections } from '@/api/collection/catalog';
  import type {
    Collection,
    CollectionQueryParams
  } from '@/api/collection/catalog/model';

  const props = defineProps<{
    /** 分类 id */
    categoryId?: number;
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
      prop: 'name',
      label: '藏品名称',
      sortable: 'custom',
      minWidth: 120
    },
    {
      prop: 'code',
      label: '藏品编号',
      sortable: 'custom',
      minWidth: 120
    },
    {
      prop: 'categoryName',
      label: '分类名称',
      sortable: 'custom',
      minWidth: 120
    },
    {
      prop: 'createTime',
      label: '创建时间',
      sortable: 'custom',
      width: 180,
      align: 'center'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 128,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    },
    {
      prop: 'imageInfo',
      label: '图片',
      width: 100,
      align: 'center',
      slot: 'imageInfo'
    }
  ]);

  /** 表格选中数据 */
  const selections = ref<Collection[]>([]);

  /** 当前编辑数据 */
  const current = ref<Collection | null>(null);

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getCatalogs({
      ...where,
      ...orders,
      ...pages,
      categoryId: props.categoryId?.toString()
    });
  };

  /** 刷新表格 */
  const reload = (where?: CollectionQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where });
  };

  /** 打开编辑弹窗 */
  const openEdit = (row?: Collection) => {
    current.value = row ?? null;
    showEdit.value = true;
  };

  /** 删除 */
  const remove = (row?: Collection) => {
    const rows = row == null ? selections.value : [row];
    if (!rows.length) {
      EleMessage.error('请至少选择一条数据');
      return;
    }
    ElMessageBox.confirm('确定要删除选中的藏品吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        deleteCollections(rows.map((d) => Number(d.id)))
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

  // 监听分类 id 变化
  watch(
    () => props.categoryId,
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
  let moreDropdownCurrentData: Collection | null = null;

  /** 获取下拉菜单数据 */
  const getDropdownMenus = (_item: Collection) => {
    return [
      { title: '重置密码', command: 'password' },
      { title: '删除用户', command: 'delete', divided: true, danger: true }
    ];
  };

  /** 打开下拉菜单 */
  const openMoreDropdown = (triggerEl: any, item: Collection) => {
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
      ElMessageBox.prompt(`请输入用户"${row.name}"的新密码：`, '重置密码', {
        inputPattern: /^[\S]{5,18}$/,
        inputErrorMessage: '密码必须为5-18位非空白字符',
        draggable: true
      })
        .then(({ value }) => {
          const loading = EleMessage.loading({
            message: '请求中..',
            plain: true
          });
          updateUserPassword(row.id, value)
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
