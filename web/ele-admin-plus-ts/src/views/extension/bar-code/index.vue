<template>
  <ele-page :multi-card="true">
    <ele-card header="基础用法">
      <el-form label-width="88px" style="max-width: 340px" @submit.prevent="">
        <div style="text-align: center; margin-bottom: 8px">
          <ele-bar-code :value="text" :tag="tag" :options="options" />
        </div>
        <el-form-item label="条码类型">
          <el-radio-group :model-value="options.format" @update:modelValue="updateFormat">
            <el-radio value="CODE128" label="CODE128" />
            <el-radio value="EAN13" label="EAN13" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="渲染方式">
          <el-radio-group v-model="tag">
            <el-radio value="img" label="img" />
            <el-radio value="canvas" label="canvas" />
            <el-radio value="svg" label="svg" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="条码文本">
          <el-select
            v-if="options.format === 'EAN13'"
            v-model="text"
            class="ele-fluid"
            :popper-options="{ strategy: 'fixed' }"
          >
            <el-option value="1234567890128" label="1234567890128" />
            <el-option value="6971872201359" label="6971872201359" />
            <el-option value="6954531770199" label="6954531770199" />
            <el-option value="6923644240318" label="6923644240318" />
          </el-select>
          <el-input v-else v-model="text" :maxlength="20" />
        </el-form-item>
        <el-form-item label="高度">
          <el-slider v-model="options.height" :min="40" :max="160" :step="10" />
        </el-form-item>
        <el-form-item label="宽度">
          <el-slider v-model="options.width" :min="1" :max="6" />
        </el-form-item>
        <el-form-item label="间距">
          <el-slider v-model="options.margin" :min="0" :max="40" />
        </el-form-item>
        <el-form-item label="显示文本">
          <el-switch v-model="options.displayValue" size="small" />
        </el-form-item>
        <el-form-item v-if="options.displayValue" label="文本大小">
          <el-slider v-model="options.fontSize" :min="12" :max="36" :step="2" />
        </el-form-item>
        <el-form-item v-if="options.displayValue && options.format === 'CODE128'" label="文本位置">
          <el-radio-group v-model="options.textPosition">
            <el-radio value="bottom" label="bottom" />
            <el-radio value="top" label="top" />
          </el-radio-group>
        </el-form-item>
      </el-form>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import type { Options } from 'jsbarcode'
  import type { BarCodeTag } from 'ele-admin-plus/es/ele-bar-code/types'

  defineOptions({ name: 'ExtensionBarCode' })

  /** 条码内容 */
  const text = ref('1234567890')

  /** 渲染方式 */
  const tag = ref<BarCodeTag>('img')

  /** 参数配置 */
  const options = reactive<Options>({
    height: 60,
    width: 2,
    margin: 2,
    displayValue: true,
    textPosition: 'bottom',
    fontSize: 14,
    format: 'CODE128'
  })

  /** 切换条码类型 */
  const updateFormat = (value: string) => {
    if (value === 'EAN13') {
      text.value = '1234567890128'
      nextTick(() => {
        options.format = value
      })
    } else {
      options.format = value
    }
  }
</script>
