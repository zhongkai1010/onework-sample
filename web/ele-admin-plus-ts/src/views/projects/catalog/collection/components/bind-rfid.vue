<!-- RFID绑定弹窗 -->
<template>
  <ele-modal
    form
    :width="'500px'"
    v-model="visible"
    :title="title"
    @open="handleOpen"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      @submit.prevent=""
    >
      <el-form-item label="RFID编号" prop="rfidCode">
        <el-input
          v-model="form.rfidCode"
          :placeholder="placeholder"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick, computed } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useFormData } from '@/utils/use-form-data';
  import { EleMessage } from 'ele-admin-plus/es';
  import { bindRfid } from '@/api/collection/catalog';

  const props = defineProps<{
    /** 藏品ID列表 */
    collectionIds: number[];
    /** 是否批量操作 */
    isBatch?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'done'): void;
  }>();

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean });

  /** 提交状态 */
  const loading = ref(false);

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null);

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    rfidCode: ''
  });

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    rfidCode: [
      {
        required: true,
        message: '请输入RFID编号',
        type: 'string',
        trigger: 'change'
      }
    ]
  });

  /** 弹窗标题 */
  const title = computed(() => (props.isBatch ? '批量绑定RFID' : '绑定RFID'));

  /** 输入框占位符 */
  const placeholder = computed(() =>
    props.isBatch
      ? '请输入RFID编号，多个藏品将绑定相同的RFID'
      : '请输入RFID编号'
  );

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false;
  };

  /** 保存修改 */
  const save = async () => {
    if (!formRef.value) return;
    try {
      await formRef.value.validate();
      loading.value = true;
      const msg = await bindRfid({
        ids: props.collectionIds,
        rfidCode: form.rfidCode
      });
      EleMessage.success(msg);
      handleCancel();
      emit('done');
    } catch (e: any) {
      if (e.message) {
        EleMessage.error(e.message);
      }
    } finally {
      loading.value = false;
    }
  };

  /** 弹窗打开事件 */
  const handleOpen = () => {
    resetFields();
    nextTick(() => {
      formRef.value?.clearValidate?.();
    });
  };
</script>
