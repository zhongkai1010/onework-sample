<!-- 机构选择下拉框 -->
<template>
  <el-tree-select
    clearable
    filterable
    :data="data"
    check-strictly
    default-expand-all
    node-key="id"
    :props="{ label: 'organizationName' }"
    :placeholder="placeholder"
    v-model="model"
    class="ele-fluid"
    :popper-options="{ strategy: 'fixed' }"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { EleMessage, toTree } from 'ele-admin-plus/es'
  import { listOrganizations } from '@/api/system/organization'
  import type { Organization } from '@/api/system/organization/model'

  const props = withDefaults(
    defineProps<{
      /** 提示信息 */
      placeholder?: string
      /** 指定机构下拉数据 */
      organizationData?: Organization[]
    }>(),
    {
      placeholder: '请选择所属机构'
    }
  )

  /** 选中的机构 */
  const model = defineModel<number | string>({ type: [Number, String] })

  /** 机构数据 */
  const data = ref<Organization[]>([])

  watch(
    () => props.organizationData,
    (organizationData) => {
      if (organizationData != null) {
        data.value = organizationData
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  /** 获取机构数据 */
  const reload = () => {
    if (props.organizationData != null) {
      return
    }
    listOrganizations()
      .then((list) => {
        data.value = toTree({
          data: list,
          idField: 'id',
          parentIdField: 'parentId'
        })
      })
      .catch((e) => {
        EleMessage.error(e.message)
      })
  }

  reload()

  defineExpose({ reload })
</script>
