<!-- Cron 表达式生成器 -->
<template>
  <EleModal
    :width="832"
    :title="title"
    position="center"
    :bodyStyle="{ padding: '8px 12px 12px 12px' }"
    v-bind="modalProps || {}"
    v-model="visible"
    @closed="handleClosed"
  >
    <CronPanel ref="cronPanelRef" v-model="cron" />
    <template #footer>
      <ElButton @click="handleCancel">取消</ElButton>
      <ElButton type="primary" @click="handleConfirm">确定</ElButton>
    </template>
  </EleModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { EleModalProps } from 'ele-admin-plus/es/ele-app/plus';
  import CronPanel from './components/cron-panel.vue';

  defineOptions({ name: 'CronBuilder' });

  withDefaults(
    defineProps<{
      /** 标题 */
      title?: string;
      /** 弹窗参数 */
      modalProps?: Omit<EleModalProps, 'modelValue'>;
    }>(),
    {
      title: 'Cron表达式生成器'
    }
  );

  const emit = defineEmits<{
    /** 确定按钮点击事件 */
    (e: 'done', cron?: string): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel<boolean>({ type: Boolean });

  /** cron */
  const cron = defineModel<string>('cron', { type: String });

  /** 组件实例 */
  const cronPanelRef = ref<InstanceType<typeof CronPanel> | null>(null);

  /** 关闭常用列表 */
  const hideCronList = () => {
    cronPanelRef.value?.hideCronList?.();
  };

  /** 取消按钮点击事件 */
  const handleCancel = () => {
    hideCronList();
    visible.value = false;
  };

  /** 确定按钮点击事件 */
  const handleConfirm = () => {
    hideCronList();
    emit('done', cron.value);
  };

  /** 弹窗关闭事件 */
  const handleClosed = () => {
    hideCronList();
  };
</script>
