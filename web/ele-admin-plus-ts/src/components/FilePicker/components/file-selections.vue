<template>
  <div class="file-picker-right">
    <div class="file-picker-right-header">
      <div class="file-picker-right-title">
        <span>已选择 </span>
        <span>{{ fileSelections.length }}</span>
        <template v-if="limit">
          <span> / </span>
          <span>{{ limit }}</span>
        </template>
        <span v-else> 个</span>
      </div>
      <ElLink
        type="danger"
        :underline="false"
        class="file-picker-right-clear"
        @click="clearSelections"
      >
        清空
      </ElLink>
    </div>
    <EleUploadList
      :limit="limit"
      :previewProps="previewProps"
      v-bind="selectionListProps || {}"
      ref="uploadListRef"
      v-model="images"
      :buttonStyle="false"
      :sortable="!mobileDevice"
      @remove="handleRemove"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import type {
    EleUploadListInstance,
    EleUploadListProps,
    EleImageViewerProps
  } from 'ele-admin-plus/es/ele-app/plus';
  import { valueIsChanged } from 'ele-admin-plus/es/ele-basic-select/util';
  import type { FileItem } from 'ele-admin-plus/es/ele-file-list/types';
  import type { UploadItem } from 'ele-admin-plus/es/ele-upload-list/types';
  import { useMobileDevice } from '@/utils/use-mobile';

  const props = defineProps<{
    /** 选中的文件数据 */
    fileSelections: FileItem[];
    /** 最大选择数量 */
    limit?: number;
    /** 文件列表自定义属性 */
    selectionListProps?: EleUploadListProps;
    /** 统一设置层级 */
    baseIndex?: number;
  }>();

  const emit = defineEmits<{
    (e: 'clearSelections'): void;
    (e: 'removeItem', fileItem: FileItem): void;
  }>();

  /** 触摸设备禁用拖动排序 */
  const { mobileDevice } = useMobileDevice();

  /** 图片上传列表组件 */
  const uploadListRef = ref<EleUploadListInstance>(null);

  /** 数据 */
  const images = ref<UploadItem[]>([]);

  /** 图片预览组件属性 */
  const previewProps = reactive<EleImageViewerProps>({
    zIndex: props.baseIndex
  });

  /** 删除事件 */
  const handleRemove = (item: UploadItem) => {
    const fileItem = props.fileSelections.find((d) => d.key === item.key);
    if (fileItem) {
      emit('removeItem', fileItem);
    }
  };

  /** 清空选中数据 */
  const clearSelections = () => {
    emit('clearSelections');
  };

  /** 获取选中数据 */
  const getSelections = () => {
    const result: FileItem[] = [];
    images.value.forEach((d) => {
      const item = props.fileSelections.find((t) => t.key === d.key);
      if (item) {
        result.push(item);
      }
    });
    return result;
  };

  /** 打开预览图片弹窗 */
  const openImagePreview = (urls: string[], index: number) => {
    uploadListRef.value && uploadListRef.value.openImagePreview(urls, index);
  };

  watch(
    () => props.fileSelections,
    (selections) => {
      if (!selections || !selections.length) {
        if (images.value.length) {
          images.value = [];
        }
        return;
      }
      const temp = images.value.filter((d) =>
        selections.some((t) => t.key === d.key)
      );
      selections.forEach((d) => {
        if (!temp.some((t) => t.key === d.key)) {
          temp.push({
            key: d.key,
            name: d.name,
            url: d.thumbnail,
            status: 'done'
          });
        }
      });
      if (
        valueIsChanged(
          images.value.map((d) => d.key) as any,
          temp.map((d) => d.key) as any,
          true
        )
      ) {
        images.value = temp;
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  watch(
    () => props.baseIndex,
    (baseIndex) => {
      previewProps.zIndex = baseIndex;
    }
  );

  defineExpose({ getSelections, openImagePreview });
</script>
