<template>
  <ele-page>
    <ele-card header="基本用法">
      <div>
        <el-button type="primary" @click="handleStart1">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef1">Upload</el-button>
        <el-button ref="saveRef1" type="primary">Save</el-button>
        <el-button ref="moreRef1">More</el-button>
      </div>
      <ele-tour v-model="current1" :steps="steps1" />
    </ele-card>
    <ele-card header="不带遮罩层">
      <div>
        <el-button type="primary" @click="handleStart2">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef2">Upload</el-button>
        <el-button ref="saveRef2" type="primary">Save</el-button>
        <el-button ref="moreRef2">More</el-button>
      </div>
      <ele-tour v-model="current2" :steps="steps2" :mask="false" />
    </ele-card>
    <ele-card header="混合弹窗等多种形式">
      <div>
        <el-button type="primary" @click="handleStart3">开始引导</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-button ref="uploadRef3">Upload</el-button>
        <el-button ref="saveRef3" type="primary">Save</el-button>
        <el-button ref="moreRef3">More</el-button>
      </div>
      <ele-tour v-model="current3" :steps="steps3">
        <template #text="{ step, current }">
          <template v-if="current === 0">
            <div style="margin-bottom: 10px">
              <img
                src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
                style="height: 184px; width: 100%; object-fit: cover"
              />
            </div>
            <div>{{ step.description }}</div>
          </template>
        </template>
      </ele-tour>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { ElButton } from 'element-plus'
  import type { TourStep } from 'ele-admin-plus/es/ele-tour/types'

  defineOptions({ name: 'ExtensionTour' })

  /** 当前步骤 */
  const current1 = ref<number>()

  /** 按钮 */
  const uploadRef1 = ref<InstanceType<typeof ElButton> | null>(null)
  const saveRef1 = ref<InstanceType<typeof ElButton> | null>(null)
  const moreRef1 = ref<InstanceType<typeof ElButton> | null>(null)

  /** 步骤 */
  const steps1 = ref<TourStep[]>([
    {
      target: () => uploadRef1.value?.$el,
      title: '如何进行文件上传',
      description: '点击这个按钮在弹出框中选择想要上传的文件即可.'
    },
    {
      target: () => saveRef1.value?.$el,
      title: '如何提交数据',
      description: '数据录入完成后点击这个按钮即可提交数据到后台.'
    },
    {
      target: () => moreRef1.value?.$el,
      title: '如何进行更多的操作',
      description: '鼠标移入到此按钮上即可展示出更多的操作功能.'
    }
  ])

  /** 开始引导 */
  const handleStart1 = () => {
    current1.value = 0
  }

  /** 当前步骤 */
  const current2 = ref<number>()

  /** 按钮 */
  const uploadRef2 = ref<InstanceType<typeof ElButton> | null>(null)
  const saveRef2 = ref<InstanceType<typeof ElButton> | null>(null)
  const moreRef2 = ref<InstanceType<typeof ElButton> | null>(null)

  /** 步骤 */
  const steps2 = ref<TourStep[]>([
    {
      target: () => uploadRef2.value?.$el,
      title: '如何进行文件上传',
      description: '点击这个按钮在弹出框中选择想要上传的文件即可.',
      popoverProps: { placement: 'top-start' }
    },
    {
      target: () => saveRef2.value?.$el,
      title: '如何提交数据',
      description: '数据录入完成后点击这个按钮即可提交数据到后台.',
      popoverProps: { placement: 'bottom' }
    },
    {
      target: () => moreRef2.value?.$el,
      title: '如何进行更多的操作',
      description: '鼠标移入到此按钮上即可展示出更多的操作功能.',
      popoverProps: { placement: 'top-end' }
    }
  ])

  /** 开始引导 */
  const handleStart2 = () => {
    current2.value = 0
  }

  /** 当前步骤 */
  const current3 = ref<number>()

  /** 按钮 */
  const uploadRef3 = ref<InstanceType<typeof ElButton> | null>(null)
  const saveRef3 = ref<InstanceType<typeof ElButton> | null>(null)
  const moreRef3 = ref<InstanceType<typeof ElButton> | null>(null)

  /** 步骤 */
  const steps3 = ref<TourStep[]>([
    {
      title: '欢迎使用 EleAdminPlus 系统',
      description:
        '下面将为您介绍一些常用功能的操作说明, 如果之前已经为您介绍过, 您可以直接点击跳过结束指引.'
    },
    {
      target: () => uploadRef3.value?.$el,
      title: '如何进行文件上传',
      description: '点击这个按钮在弹出框中选择想要上传的文件即可.'
    },
    {
      target: () => saveRef3.value?.$el,
      title: '如何提交数据',
      description: '数据录入完成后点击这个按钮即可提交数据到后台.',
      mask: false
    },
    {
      target: () => moreRef3.value?.$el,
      title: '如何进行更多的操作',
      description: '鼠标移入到此按钮上即可展示出更多的操作功能.'
    }
  ])

  /** 开始引导 */
  const handleStart3 = () => {
    current3.value = 0
  }
</script>
