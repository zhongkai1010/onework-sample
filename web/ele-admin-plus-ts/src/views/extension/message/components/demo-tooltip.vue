<template>
  <ele-card header="文本提示">
    <option-item label="使用">
      <ele-tooltip content="EleAdminPlus" placement="top" :offset="8">
        <el-button>Dark</el-button>
      </ele-tooltip>
      <ele-tooltip content="EleAdminPlus" placement="top" effect="light" :offset="8">
        <el-button>Light</el-button>
      </ele-tooltip>
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        :offset="8"
        transition="el-zoom-in-bottom"
        :gpu-acceleration="false"
      >
        <el-button>进入动画</el-button>
      </ele-tooltip>
    </option-item>
    <option-item label="边框">
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        :offset="8"
        effect="light"
        :popper-style="{
          fontWeight: 'bold',
          '--ele-tooltip-light-color': 'var(--el-color-primary)',
          '--ele-tooltip-light-bg': 'var(--el-color-primary-light-9)',
          '--ele-tooltip-light-arrow-bg': 'var(--el-color-primary-light-9)',
          '--ele-tooltip-light-border': '2px solid var(--el-color-primary)',
          '--ele-popper-arrow-size': '10px',
          '--ele-popper-arrow-offset': '-5px'
        }"
      >
        <el-button class="ele-btn-icon">信息</el-button>
      </ele-tooltip>
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        :offset="8"
        effect="light"
        :popper-style="{
          fontWeight: 'bold',
          '--ele-tooltip-light-color': 'var(--el-color-danger)',
          '--ele-tooltip-light-bg': 'var(--el-color-danger-light-9)',
          '--ele-tooltip-light-arrow-bg': 'var(--el-color-danger-light-9)',
          '--ele-tooltip-light-border': '2px solid var(--el-color-danger)',
          '--ele-popper-arrow-size': '10px',
          '--ele-popper-arrow-offset': '-5px'
        }"
      >
        <el-button class="ele-btn-icon">错误</el-button>
      </ele-tooltip>
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        :offset="8"
        effect="light"
        :popper-style="{
          fontWeight: 'bold',
          '--ele-tooltip-light-color': 'var(--el-color-warning)',
          '--ele-tooltip-light-bg': 'var(--el-color-warning-light-9)',
          '--ele-tooltip-light-arrow-bg': 'var(--el-color-warning-light-9)',
          '--ele-tooltip-light-border': '2px solid var(--el-color-warning)',
          '--ele-popper-arrow-size': '10px',
          '--ele-popper-arrow-offset': '-5px'
        }"
      >
        <el-button class="ele-btn-icon">警告</el-button>
      </ele-tooltip>
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        :offset="8"
        effect="light"
        :popper-style="{
          fontWeight: 'bold',
          '--ele-tooltip-light-color': 'var(--el-color-success)',
          '--ele-tooltip-light-bg': 'var(--el-color-success-light-9)',
          '--ele-tooltip-light-arrow-bg': 'var(--el-color-success-light-9)',
          '--ele-tooltip-light-border': '2px solid var(--el-color-success)',
          '--ele-popper-arrow-size': '10px',
          '--ele-popper-arrow-offset': '-5px'
        }"
      >
        <el-button class="ele-btn-icon">成功</el-button>
      </ele-tooltip>
    </option-item>
    <option-item label="主题">
      <ele-tooltip content="EleAdminPlus" placement="top" effect="danger" :offset="8">
        <el-button class="ele-btn-icon">错误</el-button>
      </ele-tooltip>
      <ele-tooltip content="EleAdminPlus" placement="top" effect="warning" :offset="8">
        <el-button class="ele-btn-icon">警告</el-button>
      </ele-tooltip>
      <ele-tooltip content="EleAdminPlus" placement="top" effect="success" :offset="8">
        <el-button class="ele-btn-icon">成功</el-button>
      </ele-tooltip>
      <ele-tooltip
        content="EleAdminPlus"
        placement="top"
        bg="linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)"
        arrow-bg="#7556E0"
        :offset="8"
      >
        <el-button class="ele-btn-icon">Custom</el-button>
      </ele-tooltip>
    </option-item>
  </ele-card>
</template>

<script lang="ts" setup>
  import OptionItem from '@/views/extension/avatar/components/option-item.vue'
</script>
