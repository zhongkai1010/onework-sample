<template>
  <ele-page>
    <ele-card header="基本用法" style="z-index: 1; position: relative">
      <ele-watermark content="Ele Admin Plus" :gap="[60, 40]">
        <div style="height: 200px">
          <div>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
        </div>
      </ele-watermark>
    </ele-card>
    <ele-card header="多行水印" style="z-index: 1; position: relative">
      <ele-watermark :content="['Ele Admin Plus', 'Happy Working']" :gap="[60, 40]">
        <div style="height: 200px">
          <div>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
        </div>
      </ele-watermark>
    </ele-card>
    <ele-card header="图片水印" style="z-index: 1; position: relative">
      <ele-watermark
        :height="30"
        :width="130"
        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
        :gap="[60, 40]"
        :custom-style="darkMode ? { filter: 'invert(1) !important' } : void 0"
      >
        <div style="height: 200px">
          <div>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
          <div style="margin-top: 22px">
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
            <el-button>我是内容</el-button>
          </div>
        </div>
      </ele-watermark>
    </ele-card>
    <ele-card header="结合其它组件" style="z-index: 1; position: relative">
      <ele-alert
        show-icon
        :closable="false"
        title="水印组件还实现了防止删除和篡改样式的功能, 当检测到节点被删除或默认的样式被修改都会再重新生成水印"
        style="margin-bottom: 12px"
      />
      <ele-watermark content="Ele Admin Plus" :gap="[60, 40]">
        <ele-pro-table
          row-key="id"
          :columns="columns"
          :datasource="datasource"
          :pagination="false"
          :toolbar="false"
          :cell-style="tableCellStyle"
        >
          <template #money="{ row }">
            <el-input v-model="row.money" style="margin: 4px 0" />
          </template>
          <template #status="{ row }">
            <ele-text v-if="row.status === 0" type="success">进行中</ele-text>
            <ele-text v-else-if="row.status === 1" type="danger"> 已延期 </ele-text>
            <ele-text v-else-if="row.status === 2" type="warning"> 未开始 </ele-text>
            <ele-text v-else-if="row.status === 3" type="info"> 已结束 </ele-text>
          </template>
          <template #progress="{ row }">
            <el-progress :percentage="row.progress" />
          </template>
        </ele-pro-table>
      </ele-watermark>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { getProjectList } from '@/api/example'
  import { useThemeStore } from '@/store/modules/theme'
  import { storeToRefs } from 'pinia'

  defineOptions({ name: 'ExtensionWatermark' })

  /** 是否是暗黑主题 */
  const themeStore = useThemeStore()
  const { darkMode } = storeToRefs(themeStore)

  /** 表格列配置 */
  const columns = ref([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center'
    },
    {
      label: '项目名称',
      prop: 'projectName',
      align: 'center',
      minWidth: 140
    },
    {
      label: '金额(万元)',
      prop: 'money',
      slot: 'money',
      align: 'center',
      minWidth: 120
    },
    {
      label: '开始时间',
      prop: 'startDate',
      align: 'center',
      minWidth: 120
    },
    {
      label: '结束时间',
      prop: 'endDate',
      align: 'center',
      minWidth: 120
    },
    {
      label: '状态',
      prop: 'status',
      slot: 'status',
      align: 'center',
      width: 100
    },
    {
      label: '进度',
      prop: 'progress',
      slot: 'progress',
      align: 'center',
      minWidth: 140
    }
  ])

  /** 表格数据源 */
  const datasource = () => {
    return getProjectList()
  }

  /** 表格单元格样式 */
  const tableCellStyle = ({ column }) => {
    if (column.columnKey === 'money') {
      return { padding: '0' }
    }
  }
</script>
