<template>
  <EleModal
    :form="true"
    :width="460"
    title="重命名"
    :zIndex="baseIndex"
    :appendToBody="false"
    v-bind="modalProps || {}"
    v-model="visible"
    @open="handleOpen"
    @closed="handleClosed"
  >
    <ElForm ref="formRef" :model="form" labelWidth="82px" @submit.prevent="">
      <ElFormItem
        :label="`${data && data.isDirectory ? '分组' : '文件'}名称`"
        prop="name"
        :rules="[
          {
            required: true,
            message: `请输入${data && data.isDirectory ? '分组' : '文件'}名称`,
            type: 'string',
            trigger: 'blur'
          }
        ]"
      >
        <ElInput
          :maxlength="20"
          :clearable="true"
          v-model="form.name"
          :placeholder="`请输入${data && data.isDirectory ? '分组' : '文件'}名称`"
        />
      </ElFormItem>
    </ElForm>
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
  import type { FormInstance } from 'element-plus';
  import type { EleModalProps } from 'ele-admin-plus/es/ele-app/plus';
  import { useFormData } from '@/utils/use-form-data';
  import { updateUserFile } from '@/api/system/user-file';
  import type { UserFile } from '@/api/system/user-file/model';

  const props = defineProps<{
    /** 文件数据 */
    data?: UserFile | null;
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

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 提交状态 */
  const loading = ref(false);

  /** 表单数据 */
  const [form, resetFields] = useFormData<UserFile>({ name: '' });

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return;
      }
      loading.value = true;
      updateUserFile({ ...form, id: props.data?.id })
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
    });
  };

  /** 弹窗关闭事件 */
  const handleClosed = () => {
    resetFields();
    formRef.value?.clearValidate?.();
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      form.name = props.data.name;
    }
  };
</script>
