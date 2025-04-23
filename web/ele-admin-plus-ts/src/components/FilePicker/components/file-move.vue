<template>
  <EleModal
    :width="460"
    title="移动到"
    :zIndex="baseIndex"
    :appendToBody="false"
    v-bind="modalProps || {}"
    v-model="visible"
    @open="handleOpen"
  >
    <div class="file-picker-move-wrapper">
      <ElTree
        :data="groupData.filter((d) => d.id !== -1)"
        nodeKey="id"
        :props="{ label: 'name' }"
        :expandOnClickNode="false"
        :defaultExpandAll="true"
        class="file-picker-move-tree"
        @node-click="handleGroupSelect"
      >
        <template #default="scope">
          <img
            src="/ele-file-list/ic_file_folder.png"
            class="file-picker-tree-icon"
          />
          <span
            :class="[
              'el-tree-node__label',
              { 'is-active': scope.data.id === selectedId }
            ]"
          >
            {{ scope.data.name }}
          </span>
          <ElRadio :value="true" :modelValue="scope.data.id === selectedId" />
        </template>
      </ElTree>
    </div>
    <template #footer>
      <ElButton @click="handleCancel">取消</ElButton>
      <ElButton type="primary" :loading="loading" @click="save">
        保存
      </ElButton>
    </template>
  </EleModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleModalProps } from 'ele-admin-plus/es/ele-app/plus';
  import { updateUserFile } from '@/api/system/user-file';
  import type { UserFile } from '@/api/system/user-file/model';

  const props = defineProps<{
    /** 文件数据 */
    data?: UserFile | null;
    /** 分组数据 */
    groupData: UserFile[];
    /** 弹窗参数 */
    modalProps?: Omit<EleModalProps, 'modelValue'>;
    /** 统一设置层级 */
    baseIndex?: number;
    /** 消息提示组件 */
    messageIns?: any;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 提交状态 */
  const loading = ref(false);

  /** 选中的id */
  const selectedId = ref<number>();

  /** 分组选中事件 */
  const handleGroupSelect = (item: UserFile) => {
    selectedId.value = item.id;
  };

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存编辑 */
  const save = () => {
    const parentId = selectedId.value;
    if (parentId == null) {
      props.messageIns?.error?.('请选择分组');
      return;
    }
    loading.value = true;
    updateUserFile({ id: props.data?.id, parentId })
      .then((msg) => {
        loading.value = false;
        props.messageIns?.success?.(msg);
        handleCancel();
        emit('done');
      })
      .catch((e) => {
        loading.value = false;
        props.messageIns?.error?.(e.message);
      });
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      selectedId.value = props.data.parentId;
    }
  };
</script>
