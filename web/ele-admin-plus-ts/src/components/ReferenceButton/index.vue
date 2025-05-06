<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" :title="title" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions :column="1" size="large" :border="true" :label-width="labelWidth">
      <template v-if="imageUrl">
        <el-descriptions-item label="页面图片">
          <div class="image-container" @click="openPreview">
            <img :src="imageUrl" style="width: 100%; cursor: pointer" />
            <div class="image-hover">
              <el-icon><ZoomIn /></el-icon>
              <span>点击预览</span>
            </div>
          </div>
        </el-descriptions-item>
      </template>
      <el-descriptions-item label="搜索条件">
        <div class="tag-list">
          <el-tag v-for="(item, index) in searchItems" :key="index" class="tag-item">
            {{ item }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="操作栏">
        <div class="tag-list">
          <el-tag v-for="(item, index) in operationItems" :key="index" type="info" class="tag-item">
            {{ item }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="表格字段">
        <div class="tag-list">
          <el-tag
            v-for="(item, index) in tableFieldsItems"
            :key="index"
            type="warning"
            class="tag-item"
          >
            {{ item }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="表格操作">
        <div class="tag-list">
          <el-tag
            v-for="(item, index) in tableOperationsItems"
            :key="index"
            type="danger"
            class="tag-item"
          >
            {{ item }}
          </el-tag>
        </div>
      </el-descriptions-item>
      <template v-if="$slots.custom">
        <slot name="custom"></slot>
      </template>
      <template v-if="$slots.extra">
        <slot name="extra"></slot>
      </template>
    </el-descriptions>
  </el-drawer>
  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Search, ZoomIn } from '@element-plus/icons-vue'

  interface Props {
    title?: string
    labelWidth?: number
    imageUrl?: string
    searchText?: string
    operationText?: string
    tableFieldsText?: string
    tableOperationsText?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '页面内容',
    labelWidth: 200,
    imageUrl: '',
    searchText: '无搜索条件',
    operationText: '无操作栏',
    tableFieldsText: '无表格字段',
    tableOperationsText: '无表格操作'
  })

  // 将文本按空格拆分成数组
  const searchItems = computed(() => props.searchText.split(' ').filter(Boolean))
  const operationItems = computed(() => props.operationText.split(' ').filter(Boolean))
  const tableFieldsItems = computed(() => props.tableFieldsText.split(' ').filter(Boolean))
  const tableOperationsItems = computed(() => props.tableOperationsText.split(' ').filter(Boolean))

  const open = ref(false)
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  const openPreview = () => {
    if (props.imageUrl) {
      viewerImages.value = [props.imageUrl]
      viewerIndex.value = 0
      showImageViewer.value = true
    }
  }
</script>

<style lang="scss" scoped>
  .reference-button {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 1000;
    transition:
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.2s;
    border-radius: 50%;
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.15),
      0 1.5px 4px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.18),
        0 2px 8px rgba(0, 0, 0, 0.1);
    }

    @media (prefers-color-scheme: dark) {
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.45),
        0 1.5px 4px rgba(0, 0, 0, 0.25);
    }
  }

  .image-container {
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.3s;

    &:hover {
      .image-hover {
        opacity: 1;
      }
    }

    .image-hover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      opacity: 0;
      transition: opacity 0.3s;

      .el-icon {
        font-size: 24px;
        margin-bottom: 8px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 4px 0;

    .tag-item {
      margin: 0;
    }
  }
</style>
