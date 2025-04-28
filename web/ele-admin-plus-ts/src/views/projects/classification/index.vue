<template>
  <ele-page
    flex-table
    :multi-card="false"
    hide-footer
    style="min-height: 420px"
  >
    <ele-card flex-table>
      <!---搜索条件--->
      <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
        <el-row :gutter="8">
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="分类名称">
              <el-input
                clearable
                v-model.trim="form.name"
                placeholder="请输入分类名称"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="分类码">
              <el-input
                clearable
                v-model.trim="form.code"
                placeholder="请输入分类码"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label="上级分类">
              <classification-select v-model="form.parentId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="12" :sm="12" :xs="24">
            <el-form-item label-width="16px">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!---表格--->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="classificationTable"
        :pagination="false"
        :tools="['reload', 'size', 'columns', 'maximized']"
      >
        <template #toolbar>
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="PlusOutlined"
            @click="openEdit()"
          >
            新建分类
          </el-button>
          <el-button
            class="ele-btn-icon"
            :icon="ColumnHeightOutlined"
            @click="expandAll"
          >
            展开全部
          </el-button>
          <el-button
            class="ele-btn-icon"
            :icon="VerticalAlignMiddleOutlined"
            @click="foldAll"
          >
            折叠全部
          </el-button>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            :disabled="!selections.length"
            @click="batchRemove"
          >
            删除分类
          </el-button>
          <el-button type="warning" class="ele-btn-icon" :icon="DeleteOutlined">
            导入
          </el-button>
        </template>
        <template #action="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="openEdit(undefined, row.id)"
          >
            添加
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="primary" :underline="false" @click="openEdit(row)">
            修改
          </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)">
            删除
          </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
    <form-edit
      v-model="showEdit"
      :data="current"
      @done="reload"
      :parent-id="parentId"
      :select-data="treeData"
    />
    <reference-button />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { toTree, EleMessage } from 'ele-admin-plus/es';
  import { ElMessageBox } from 'element-plus/es';
  import type { EleProTable } from 'ele-admin-plus';
  import type {
    Columns,
    DatasourceFunction
  } from 'ele-admin-plus/es/ele-pro-table/types';
  import {
    PlusOutlined,
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
    DeleteOutlined
  } from '@/components/icons';
  import { listCategories, removeCategories } from '@/api/data/category';
  import type {
    CategoryQueryParams,
    Category
  } from '@/api/data/category/model';
  import { useFormData } from '@/utils/use-form-data';
  import ReferenceButton from './components/reference-button.vue';
  import FormEdit from './components/form-edit.vue';
  import ClassificationSelect from '@/components/CustomForm/ClassificationSelect.vue';

  defineOptions({ name: 'Classification' });

  /** 当前编辑数据 */
  const current = ref<Category | undefined>();

  /** 表单数据 */
  const [form, resetFields] = useFormData<CategoryQueryParams>({});

  /** 是否显示编辑弹窗 */
  const showEdit = ref(false);

  /** 表格选中数据 */
  const selections = ref<Category[]>([]);

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
      label: '分类名称',
      sortable: 'custom',
      width: 300
    },
    {
      prop: 'code',
      label: '分类码',
      sortable: 'custom',
      width: 200
    },
    {
      prop: 'description',
      label: '描述',
      sortable: 'custom'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 180,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ]);

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null);

  /** 表格数据 */
  const treeData = ref<Category[]>([]);

  /** 表格数据源 */
  const datasource: DatasourceFunction = async ({ where, orders }) => {
    const data = await listCategories({
      ...where,
      ...orders
    });
    treeData.value = toTree({
      data,
      idField: 'id',
      parentIdField: 'parentId'
    });
    return treeData.value;
  };

  /** 上级机构id */
  const parentId = ref<number>();

  /** 打开编辑弹窗 */
  const openEdit = (row?: Category, id?: number) => {
    current.value = row;
    parentId.value = id;
    showEdit.value = true;
  };

  /** 刷新表格 */
  const reload = (where?: CategoryQueryParams) => {
    tableRef.value?.reload?.({ where });
  };

  /** 重置 */
  const reset = () => {
    resetFields();
    search();
  };

  /** 搜索 */
  const search = () => {
    tableRef.value?.reload?.({ where: form });
  };

  /** 删除单个 */
  const remove = (row: Category) => {
    if (row.children?.length) {
      EleMessage.error('请先删除上级分类');
      return;
    }
    ElMessageBox.confirm('确定要删除"' + row.name + '"吗?', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeCategories({ ids: [row.id] })
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

  /** 展开全部 */
  const expandAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(true);
  };

  /** 折叠全部 */
  const foldAll = () => {
    tableRef.value?.toggleRowExpansionAll?.(false);
  };

  /** 批量删除 */
  const batchRemove = () => {
    if (!selections.value.length) {
      EleMessage.warning('请选择要删除的分类');
      return;
    }

    // 检查是否有未选中的子分类
    const hasUnselectedChildren = selections.value.some((item) => {
      if (!item.children?.length) return false;
      // 检查所有子分类是否都被选中
      return !item.children.every((child) =>
        selections.value.some((selected) => selected.id === child.id)
      );
    });

    if (hasUnselectedChildren) {
      EleMessage.error('请先删除子分类或同时选中子分类');
      return;
    }

    ElMessageBox.confirm('确定要删除选中的分类吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        });
        removeCategories({ ids: selections.value.map((item) => item.id) })
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
</script>

<style lang="scss" scoped></style>
