<!-- 文件选择器 -->
<template>
  <EleModal
    :width="988"
    :title="title"
    position="center"
    :zIndex="baseIndex"
    v-bind="modalProps || {}"
    v-model="visible"
    class="file-picker-modal"
    @open="handleOpen"
    @close="handleClose"
  >
    <EleSplitPanel
      ref="splitRef"
      space="0px"
      size="186px"
      :flexTable="true"
      :allowCollapse="mobile"
      :customStyle="{ borderWidth: '0 1px 0 0' }"
      class="file-picker-wrapper"
    >
      <FileGroup
        ref="fileGroupRef"
        :groupData="groupData"
        @groupSelect="handleGroupSelect"
        @addBtnClick="openGroupAdd()"
        @moreIconClick="openCtxMenuDropdown"
        @hideGroupCtxMenu="hideGroupContextmenu()"
      />
      <template #body>
        <FileList
          ref="fileListRef"
          :limit="limit"
          :fileLimit="fileLimit"
          :accept="accept"
          :params="params"
          :fileListProps="fileListProps"
          :selectionListProps="selectionListProps"
          :emptyProps="emptyProps"
          :paginationProps="paginationProps"
          :baseIndex="componentIndex"
          :messageIns="messageIns"
          @queryStart="showLoading"
          @queryDone="hideLoading"
          @renameFile="openRenameItem"
          @moveFile="openMoveItem"
          @removeFile="removeItem"
          @fileItemContextOpen="hideGroupContextmenu"
        />
      </template>
    </EleSplitPanel>
    <EleLoading :loading="loading" class="file-picker-loading" />
    <!-- 添加分组弹窗 -->
    <FileGroupAdd
      v-model="showGroupAdd"
      :parentId="groupParentId"
      :groupData="groupData"
      :modalProps="groupAddModalProps"
      :baseIndex="componentIndex"
      :messageIns="messageIns"
      @done="handleReloadData"
    />
    <!-- 分组或文件重命名弹窗 -->
    <FileRename
      v-model="showRename"
      :data="renameData"
      :modalProps="renameModalProps"
      :baseIndex="componentIndex"
      :messageIns="messageIns"
      @done="handleReloadData"
    />
    <!-- 文件移动弹窗 -->
    <FileMove
      v-model="showMove"
      :data="moveData"
      :groupData="groupData"
      :modalProps="moveModalProps"
      :baseIndex="componentIndex"
      :messageIns="messageIns"
      @done="handleReloadData"
    />
    <!-- 分组项右键菜单 -->
    <EleDropdown
      :triggerKeys="[]"
      :persistent="false"
      :validateEvent="false"
      :zIndex="componentIndex"
      placement="bottom-end"
      :iconProps="{ size: 15 }"
      :popperOptions="{
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [6, 6] } }]
      }"
      v-bind="groupDropdownProps || {}"
      ref="ctxMenuDropdownRef"
      trigger="click"
      componentType="pro"
      :preventContextmenu="true"
      :virtualTriggering="true"
      :virtualRef="ctxMenuDropdownVirtualRef"
      :items="ctxMenuDropdownItems"
      @command="handleItemCommand"
    />
    <!-- 消息提示容器 -->
    <div
      ref="messageWrapRef"
      class="ele-message-wrapper"
      :style="{ position: 'fixed', zIndex: messageIndex }"
    ></div>
    <div
      ref="messageBoxWrapRef"
      class="ele-message-box-wrapper"
      :style="{ position: 'fixed', zIndex: messageIndex }"
    ></div>
    <template #footer>
      <ElButton @click="handleCancel">取消</ElButton>
      <ElButton type="primary" @click="handleConfirm">确定</ElButton>
    </template>
  </EleModal>
</template>

<script lang="ts" setup>
  import { ref, computed, nextTick, markRaw } from 'vue';
  import {
    useMessage,
    useMessageBox,
    toTree,
    findTree
  } from 'ele-admin-plus/es';
  import type { EleSplitPanel } from 'ele-admin-plus/es';
  import type { ElEmptyProps } from 'ele-admin-plus/es/ele-app/el';
  import type {
    EleModalProps,
    EleDropdownInstance,
    EleDropdownProps,
    EleFileListProps,
    EleUploadListProps,
    ElePaginationProps
  } from 'ele-admin-plus/es/ele-app/plus';
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types';
  import {
    EditOutlined,
    FolderOutlined,
    DeleteOutlined
  } from '@/components/icons';
  import { useMobile } from '@/utils/use-mobile';
  import FileGroup from './components/file-group.vue';
  import FileList from './components/file-list.vue';
  import FileGroupAdd from './components/file-group-add.vue';
  import FileRename from './components/file-rename.vue';
  import FileMove from './components/file-move.vue';
  import { listUserFiles, removeUserFile } from '@/api/system/user-file';
  import type { UserFile } from '@/api/system/user-file/model';

  defineOptions({ name: 'FilePicker' });

  const props = withDefaults(
    defineProps<{
      /** 标题 */
      title?: string;
      /** 弹窗参数 */
      modalProps?: Omit<EleModalProps, 'modelValue'>;
      /** 最大选择数量 */
      limit?: number;
      /** 文件大小限制, 单位MB */
      fileLimit?: number;
      /** 接受上传的文件类型 */
      accept?: string;
      /** 接口查询参数 */
      params?: Record<string, any>;
      /** 分组下拉菜单属性 */
      groupDropdownProps?: EleDropdownProps;
      /** 添加分组弹窗参数 */
      groupAddModalProps?: Omit<EleModalProps, 'modelValue'>;
      /** 重命名弹窗参数 */
      renameModalProps?: Omit<EleModalProps, 'modelValue'>;
      /** 移动分组弹窗参数 */
      moveModalProps?: Omit<EleModalProps, 'modelValue'>;
      /** 文件列表自定义属性 */
      fileListProps?: EleFileListProps;
      /** 已选列表自定义属性 */
      selectionListProps?: EleUploadListProps;
      /** 空组件属性 */
      emptyProps?: ElEmptyProps;
      /** 分页组件属性 */
      paginationProps?: ElePaginationProps;
      /** 统一设置层级 */
      baseIndex?: number;
    }>(),
    {
      title: '文件选择',
      fileLimit: 100
    }
  );

  const emit = defineEmits<{
    /** 确定按钮点击事件 */
    (e: 'done', result: UserFile[]): void;
    /** 弹窗关闭事件 */
    (e: 'close'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 是否是移动端 */
  const { mobile } = useMobile();

  /** 分割面板组件 */
  const splitRef = ref<InstanceType<typeof EleSplitPanel> | null>(null);

  /** 文件分组组件 */
  const fileGroupRef = ref<InstanceType<typeof FileGroup> | null>(null);

  /** 文件列表组件 */
  const fileListRef = ref<InstanceType<typeof FileList> | null>(null);

  /** 数据请求状态 */
  const loading = ref(false);

  /** 分组数据 */
  const groupData = ref<UserFile[]>([]);

  /** 选中分组数据 */
  const groupSelected = ref<UserFile | null>(null);

  /** 是否显示重命名弹窗 */
  const showRename = ref(false);

  /** 当前重命名数据 */
  const renameData = ref<UserFile | null>(null);

  /** 是否显示添加分组弹窗 */
  const showGroupAdd = ref(false);

  /** 添加分组的上级分组id */
  const groupParentId = ref<number>();

  /** 是否显示移动弹窗 */
  const showMove = ref(false);

  /** 当前移动数据 */
  const moveData = ref<UserFile | null>(null);

  /** 当前编辑是否是操作文件 */
  const isEditFile = ref(false);

  /** 右键菜单组件 */
  const ctxMenuDropdownRef = ref<EleDropdownInstance>();

  /** 右键菜单虚拟触发节点 */
  const ctxMenuDropdownVirtualRef = ref<any>();

  /** 右键菜单项数据 */
  const ctxMenuDropdownItems = ref<DropdownItem[]>([]);

  /** 当前打开的右键菜单对应的数据 */
  let ctxMenuFileItem: UserFile | null = null;

  /** 组件统一层级 */
  const componentIndex = computed<number | undefined>(() => {
    if (props.baseIndex == null) {
      return;
    }
    return props.baseIndex + 100;
  });

  /** 消息提示组件层级 */
  const messageIndex = computed<number | undefined>(() => {
    if (componentIndex.value == null) {
      return 3000;
    }
    return componentIndex.value + 100;
  });

  /** 消息提示容器 */
  const messageWrapRef = ref<HTMLDivElement>();

  /** 消息弹出框容器 */
  const messageBoxWrapRef = ref<HTMLDivElement>();

  /** 消息提示框 */
  const messageIns = useMessage({
    inner: true,
    appendTo: messageWrapRef as any
  });

  /** 消息弹出框 */
  const messageBoxIns = useMessageBox({
    appendTo: messageBoxWrapRef as any
  });

  /** 获取分组右键菜单项数据 */
  const getGroupCtxMenuItems = (_item: UserFile) => {
    return [
      { title: '重命名', command: 'rename', icon: markRaw(EditOutlined) },
      {
        title: '添加分组',
        command: 'add',
        icon: markRaw(FolderOutlined),
        iconStyle: { transform: 'scale(0.92)' }
      },
      {
        title: '删除分组',
        command: 'remove',
        icon: markRaw(DeleteOutlined),
        divided: true,
        danger: true
      }
    ];
  };

  /** 关闭分组右键菜单 */
  const hideGroupContextmenu = () => {
    ctxMenuDropdownRef.value && ctxMenuDropdownRef.value.handleClose();
  };

  /** 打开分组右键菜单 */
  const openCtxMenuDropdown = (triggerEl: any, item: UserFile) => {
    ctxMenuFileItem = item;
    if (triggerEl == null || ctxMenuDropdownVirtualRef.value === triggerEl) {
      return;
    }
    hideGroupContextmenu();
    nextTick(() => {
      ctxMenuDropdownItems.value = getGroupCtxMenuItems(item) || [];
      ctxMenuDropdownVirtualRef.value = triggerEl;
      if (ctxMenuDropdownItems.value.length) {
        nextTick(() => {
          ctxMenuDropdownRef.value && ctxMenuDropdownRef.value.handleOpen();
        });
      }
    });
  };

  /** 分组选中 */
  const handleGroupSelect = (item: UserFile, isTreeClick?: boolean) => {
    if (groupSelected.value != null && mobile.value) {
      splitRef.value?.toggleCollapse?.(true);
    }
    if (item && item.id != null) {
      if (!isTreeClick) {
        fileGroupRef.value?.setSelectedGroup?.(item);
      }
      if (groupSelected.value == null || groupSelected.value.id !== item.id) {
        groupSelected.value = item;
        queryData(item.id);
      }
    }
  };

  /** 编辑完成刷新数据事件 */
  const handleReloadData = () => {
    isEditFile.value ? queryData() : queryGroup();
  };

  /** 添加分组 */
  const openGroupAdd = (item?: UserFile) => {
    isEditFile.value = false;
    groupParentId.value = item ? item.id : void 0;
    showGroupAdd.value = true;
  };

  /** 重命名分组或文件 */
  const openRenameItem = (item: UserFile, isFile?: boolean) => {
    isEditFile.value = !!isFile;
    renameData.value = item;
    showRename.value = true;
  };

  /** 文件移动到指定分组 */
  const openMoveItem = (item: UserFile, isFile?: boolean) => {
    isEditFile.value = !!isFile;
    moveData.value = item;
    showMove.value = true;
  };

  /** 删除分组或文件 */
  const removeItem = (item: UserFile, isFile?: boolean) => {
    isEditFile.value = !!isFile;
    messageBoxIns
      ?.confirm?.(`确定要删除“${item.name}”吗?`, '系统提示', {
        type: 'warning',
        draggable: true
      })
      ?.then?.(() => {
        const loading = messageIns?.loading?.({
          message: '请求中..',
          plain: true
        });
        removeUserFile(item.id as number)
          .then((msg) => {
            loading?.close?.();
            messageIns?.success?.(msg);
            handleReloadData();
          })
          .catch((e) => {
            loading?.close?.();
            messageIns?.error?.(e.message);
          });
      })
      ?.catch?.(() => {});
  };

  /** 分组右键菜单项点击事件 */
  const handleItemCommand = (command: any) => {
    if (ctxMenuFileItem == null) {
      return;
    }
    if (command === 'rename') {
      openRenameItem(ctxMenuFileItem);
    } else if (command === 'add') {
      openGroupAdd(ctxMenuFileItem);
    } else if (command === 'remove') {
      removeItem(ctxMenuFileItem);
    }
  };

  /** 关闭请求加载图标 */
  const hideLoading = () => {
    loading.value = false;
  };

  /** 打开请求加载图标 */
  const showLoading = () => {
    loading.value = true;
  };

  /** 查询分组数据 */
  const queryGroup = () => {
    showLoading();
    listUserFiles({ isDirectory: 1 })
      .then((list) => {
        const result = [
          { id: -1, name: '全部' },
          { id: 0, name: '未分组' },
          ...toTree({
            data: list,
            idField: 'id',
            parentIdField: 'parentId'
          })
        ];
        groupData.value = result;
        const oldSelected =
          groupSelected.value == null
            ? void 0
            : findTree(result, (d) => d.id === groupSelected.value?.id);
        groupSelected.value = null;
        nextTick(() => {
          handleGroupSelect(oldSelected || result[0]);
        });
      })
      .catch((e) => {
        groupData.value = [];
        messageIns.error(e.message);
        hideLoading();
      });
  };

  /** 刷新文件数据 */
  const queryData = (parentId?: number) => {
    showLoading();
    const params = parentId == null ? void 0 : { page: 1, name: '', parentId };
    fileListRef.value && fileListRef.value.queryData(params);
  };

  /** 清空文件选中 */
  const clearSelections = () => {
    fileListRef.value && fileListRef.value.clearSelections();
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    clearSelections();
    queryGroup();
  };

  /** 弹窗关闭事件 */
  const handleClose = () => {
    clearSelections();
    emit('close');
  };

  /** 取消按钮点击事件 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 确定按钮点击事件 */
  const handleConfirm = () => {
    showLoading();
    emit('done', fileListRef.value?.getSelections?.() || []);
  };

  defineExpose({ hideLoading });
</script>

<style lang="scss">
  @use './style/index.scss';
</style>
