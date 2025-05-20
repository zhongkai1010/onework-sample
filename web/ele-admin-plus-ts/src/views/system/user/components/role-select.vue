<!-- 角色选择下拉框 -->
<template>
  <el-select
    multiple
    clearable
    :model-value="roleIds"
    :placeholder="placeholder"
    class="ele-fluid"
    @update:modelValue="updateValue"
  >
    <el-option
      v-for="item in data"
      :key="item.id"
      :value="(item as any).id"
      :label="item.roleName"
    />
  </el-select>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import { listRoles } from '@/api/system/role'
  import type { Role } from '@/api/system/role/model'

  const props = withDefaults(
    defineProps<{
      /** 选中的角色 */
      modelValue?: Role[]
      /** 提示文本 */
      placeholder?: string
    }>(),
    {
      placeholder: '请选择角色'
    }
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Role[]): void
  }>()

  /** 选中的角色id */
  const roleIds = computed(() => props.modelValue?.map?.((d) => d.id as number))

  /** 角色数据 */
  const data = ref<Role[]>([])

  /** 更新选中数据 */
  const updateValue = (value: number[]) => {
    emit(
      'update:modelValue',
      value.map((v) => ({ id: v }))
    )
  }

  /** 获取角色数据 */
  listRoles()
    .then((list) => {
      data.value = list
    })
    .catch((e) => {
      EleMessage.error(e.message)
    })
</script>
