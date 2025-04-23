<!-- 字典组件 -->
<template>
  <template v-if="type === 'text'">
    <span v-for="item in valueData" :key="item.dictDataCode">
      {{ item.dictDataName }}
    </span>
  </template>
  <template v-else-if="type === 'tag'">
    <el-tag
      v-for="item in valueData"
      :key="item.dictDataCode"
      :disable-transitions="true"
      size="small"
    >
      {{ item.dictDataName }}
    </el-tag>
  </template>
  <el-radio-group
    v-else-if="type === 'radio'"
    :disabled="disabled"
    v-model="model as SingleValue"
  >
    <el-radio
      v-for="item in data"
      :key="item.dictDataCode"
      :value="item.dictDataCode"
      :label="item.dictDataName"
    />
  </el-radio-group>
  <el-checkbox-group
    v-else-if="type === 'checkbox'"
    :disabled="disabled"
    v-model="model as any"
  >
    <el-checkbox
      v-for="item in data"
      :key="item.dictDataCode"
      :value="item.dictDataCode"
      :label="item.dictDataName"
    />
  </el-checkbox-group>
  <el-select
    v-else
    v-model="model"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :multiple="type === 'multipleSelect'"
    :teleported="teleported"
    :filterable="filterable"
    class="ele-fluid"
  >
    <el-option
      v-for="item in data"
      :key="item.dictDataCode"
      :value="item.dictDataCode"
      :label="item.dictDataName"
    />
  </el-select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useDictData } from '@/utils/use-dict-data';
  import type { DictionaryData } from '@/api/system/dictionary-data/model';

  defineOptions({ name: 'DictData' });

  type SingleValue = string | number | boolean;
  type MultipleValue = Array<SingleValue>;
  type TypeValue =
    | 'text'
    | 'tag'
    | 'radio'
    | 'select'
    | 'checkbox'
    | 'multipleSelect';

  const props = withDefaults(
    defineProps<{
      /** 字典类型 */
      code: string;
      /** 组件类型 */
      type?: TypeValue;
      /** 是否禁用 */
      disabled?: boolean;
      /** 提示文本 */
      placeholder?: string;
      /** select是否可清除 */
      clearable?: boolean;
      /** select是否可搜索 */
      filterable?: boolean;
      /** select的下拉是否插入到body下 */
      teleported?: boolean;
    }>(),
    {
      clearable: true,
      teleported: true
    }
  );

  /** 字典值 */
  const model = defineModel<SingleValue | MultipleValue>({
    type: [String, Number, Boolean, Array]
  });

  /** 字典数据 */
  const [data] = useDictData([props.code]);

  /** 绑定值对应的字典数据 */
  const valueData = computed<DictionaryData[]>(() => {
    const result: DictionaryData[] = [];
    const val = model.value;
    if (val == null || val === '') {
      return result;
    }
    const values: MultipleValue = Array.isArray(val) ? val : [val];
    values.forEach((v) => {
      const temp = data.value.find((d) => d.dictDataCode == v);
      if (temp != null) {
        result.push(temp);
      } else {
        result.push({ dictDataCode: v as string, dictDataName: v as string });
      }
    });
    return result;
  });
</script>
