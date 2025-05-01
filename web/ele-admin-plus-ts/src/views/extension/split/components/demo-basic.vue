<template>
  <ele-card header="基础用法" :body-style="{ overflow: 'hidden', padding: '8px 13px 13px 13px' }">
    <option-item label="显示折叠按钮" :responsive="false" style="margin: 0">
      <el-radio-group v-model="allowCollapse">
        <el-radio :value="true" label="是" />
        <el-radio :value="false" label="否" />
      </el-radio-group>
    </option-item>
    <option-item label="支持自由拉伸" :responsive="false" style="margin: 0">
      <el-radio-group v-model="resizable">
        <el-radio :value="true" label="是" />
        <el-radio :value="false" label="否" />
      </el-radio-group>
    </option-item>
    <option-item label="上下布局模式" :responsive="false" style="margin: 0">
      <el-radio-group v-model="vertical">
        <el-radio :value="true" label="是" />
        <el-radio :value="false" label="否" />
      </el-radio-group>
    </option-item>
    <option-item label="反转布局方向" :responsive="false" style="margin: 0">
      <el-radio-group v-model="reverse">
        <el-radio :value="true" label="是" />
        <el-radio :value="false" label="否" />
      </el-radio-group>
    </option-item>
    <ele-split-panel
      space="0px"
      size="160px"
      :allow-collapse="allowCollapse"
      :resizable="resizable"
      :vertical="vertical"
      :reverse="reverse"
      :custom-style="{
        background: 'rgba(185, 182, 229, .4)',
        overflow: 'hidden',
        border: 'none'
      }"
      :body-style="{
        background: 'rgba(125, 226, 252, .4)',
        overflow: 'hidden'
      }"
      style="height: 360px; margin-top: 12px"
    >
      <div>边栏</div>
      <template #body>
        <div>内容</div>
      </template>
    </ele-split-panel>
  </ele-card>
  <ele-card header="组合使用" :body-style="{ padding: '13px' }">
    <div style="margin: 0 0 8px 0">先左右再上下</div>
    <ele-split-panel
      space="0px"
      :min-size="40"
      :max-size="-40"
      :resizable="true"
      :custom-style="{
        background: 'rgba(185, 182, 229, .4)',
        overflow: 'hidden',
        border: 'none'
      }"
      :body-style="{ overflow: 'hidden' }"
      :responsive="false"
      style="height: 400px"
    >
      <div>边栏</div>
      <template #body>
        <ele-split-panel
          space="0px"
          :min-size="40"
          :max-size="-40"
          :vertical="true"
          :resizable="true"
          :custom-style="{
            background: 'rgba(171, 199, 255, .5)',
            overflow: 'hidden',
            border: 'none'
          }"
          :body-style="{
            background: 'rgba(125, 226, 252, .4)',
            overflow: 'hidden'
          }"
          :responsive="false"
          style="height: 400px"
        >
          <div>内容一</div>
          <template #body>
            <div>内容二</div>
          </template>
        </ele-split-panel>
      </template>
    </ele-split-panel>
    <div style="margin: 16px 0 8px 0">先上下再左右</div>
    <ele-split-panel
      space="0px"
      size="120px"
      :min-size="40"
      :max-size="-40"
      :vertical="true"
      :resizable="true"
      :custom-style="{
        background: 'rgba(185, 182, 229, .4)',
        overflow: 'hidden',
        border: 'none'
      }"
      :body-style="{ overflow: 'hidden' }"
      :responsive="false"
      style="height: 400px"
    >
      <div>顶栏</div>
      <template #body>
        <ele-split-panel
          space="0px"
          :min-size="40"
          :max-size="-40"
          :resizable="true"
          :custom-style="{
            background: 'rgba(171, 199, 255, .5)',
            overflow: 'hidden',
            border: 'none'
          }"
          :body-style="{
            background: 'rgba(125, 226, 252, .4)',
            overflow: 'hidden'
          }"
          :responsive="false"
          style="height: 100%"
        >
          <div>边栏</div>
          <template #body>
            <div>内容</div>
          </template>
        </ele-split-panel>
      </template>
    </ele-split-panel>
  </ele-card>
  <ele-card header="可随意自由组合" :body-style="{ overflow: 'hidden', padding: '13px' }">
    <ele-split-panel
      space="0px"
      size="80px"
      :min-size="40"
      :max-size="0.5"
      :vertical="true"
      :resizable="true"
      :allow-collapse="true"
      :custom-style="{
        background: 'rgba(185, 182, 229, .4)',
        overflow: 'hidden',
        border: 'none'
      }"
      :body-style="{ overflow: 'visible' }"
      :responsive="false"
      style="height: 400px"
    >
      <div>顶栏</div>
      <template #body>
        <ele-split-panel
          space="0px"
          size="120px"
          :min-size="40"
          :max-size="280"
          :resizable="true"
          :allow-collapse="true"
          :custom-style="{
            background: 'rgba(171, 199, 255, .5)',
            overflow: 'hidden',
            border: 'none'
          }"
          :body-style="{ overflow: 'visible' }"
          :responsive="false"
          style="height: 100%"
        >
          <div>左边栏</div>
          <template #body>
            <ele-split-panel
              space="0px"
              size="120px"
              :min-size="40"
              :max-size="280"
              :resizable="true"
              :allow-collapse="true"
              :reverse="true"
              :custom-style="{
                background: 'rgba(171, 199, 255, .5)',
                overflow: 'hidden',
                border: 'none'
              }"
              :body-style="{
                background: 'rgba(125, 226, 252, .4)',
                overflow: 'hidden'
              }"
              :responsive="false"
              style="height: 100%"
            >
              <div>右边栏</div>
              <template #body>
                <div>内容</div>
              </template>
            </ele-split-panel>
          </template>
        </ele-split-panel>
      </template>
    </ele-split-panel>
  </ele-card>
  <ele-card header="实际案例">
    <el-button type="primary" @click="openTable">结合表格案例</el-button>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import OptionItem from '@/views/extension/avatar/components/option-item.vue'

  const emit = defineEmits<{
    (e: 'change', type?: number): void
  }>()

  /** 是否显示折叠按钮 */
  const allowCollapse = ref(true)

  /** 是否支持自由拉伸 */
  const resizable = ref(false)

  /** 是否上下布局模式 */
  const vertical = ref(false)

  /** 是否反转布局方向 */
  const reverse = ref(false)

  /** 切换到结合表格案例 */
  const openTable = () => {
    emit('change', 1)
  }
</script>
