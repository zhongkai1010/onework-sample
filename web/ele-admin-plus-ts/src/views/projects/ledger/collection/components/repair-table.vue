<!-- 修复记录弹框表格 -->
<template>
  <ele-modal
    v-model="modelValue"
    title="修复记录"
    width="1200px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <ele-pro-table :columns="columns" :datasource="datasource">
      <template #qualificationCertificate="{ row }">
        <div v-if="row.qualificationCertificate">
          <el-link
            type="primary"
            :href="getCertificateUrl(row.qualificationCertificate)"
            target="_blank"
          >
            {{ getCertificateName(row.qualificationCertificate) }}
          </el-link>
        </div>
        <span v-else>暂无数据</span>
      </template>
    </ele-pro-table>
    <!-- 图片预览组件 -->
    <ele-image-viewer
      v-model="showImageViewer"
      :urlList="viewerImages"
      :initialIndex="viewerIndex"
      :infinite="false"
    />
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { watch, ref, h } from 'vue'
  import { getCollectionRepairList } from '@/api/collection/ledger'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import { EleImageViewer } from 'ele-admin-plus'
  import dayjs from 'dayjs'

  const props = defineProps<{
    row: CollectionLedger | null
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 图片预览相关状态
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  // 处理图片预览
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  // 监听显示状态变化
  watch(modelValue, (val) => {
    if (!val) {
      onClose()
    }
  })

  // 格式化日期
  const formatDate = (date: string | number | Date | null | undefined) => {
    if (!date) return '-'
    return dayjs(date).format('YYYY-MM-DD')
  }

  /**
   * 获取资质证书URL
   */
  const getCertificateUrl = (certificate: string): string => {
    try {
      const data = JSON.parse(certificate)
      return data?.url || ''
    } catch (e) {
      console.error('解析资质证书URL失败:', e)
      return ''
    }
  }

  /**
   * 获取资质证书名称
   */
  const getCertificateName = (certificate: string): string => {
    try {
      const data = JSON.parse(certificate)
      return data?.name || '未知文件'
    } catch (e) {
      console.error('解析资质证书名称失败:', e)
      return '未知文件'
    }
  }

  const columns: Columns = [
    { prop: 'id', label: '编号', width: 80, align: 'center' },
    {
      prop: 'beforeRepairImage',
      label: '修复前图片',
      width: 120,
      align: 'center',
      formatter: (row) => {
        if (!row.beforeRepairImage) return '暂无图片'
        return h('img', {
          src: row.beforeRepairImage,
          style: {
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            cursor: 'pointer'
          },
          onClick: () => openPreview(row.beforeRepairImage)
        })
      }
    },
    {
      prop: 'afterRepairImage',
      label: '修复后图片',
      width: 120,
      align: 'center',
      formatter: (row) => {
        if (!row.afterRepairImage) return '暂无图片'
        return h('img', {
          src: row.afterRepairImage,
          style: {
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            cursor: 'pointer'
          },
          onClick: () => openPreview(row.afterRepairImage)
        })
      }
    },
    { prop: 'repairCode', label: '修复单号', width: 220 },
    { prop: 'collectionCode', label: '藏品编号', width: 220 },
    { prop: 'collectionName', label: '藏品名称', width: 220 },
    { prop: 'categoryName', label: '藏品分类', width: 220 },
    { prop: 'repairReason', label: '修复原因', width: 220 },
    { prop: 'repairStatusAndResults', label: '修复情况及结果', width: 220 },
    { prop: 'sendRepairDepartment', label: '送修部门', width: 220 },
    { prop: 'undertakingOrganization', label: '承担机构', width: 220 },
    {
      prop: 'qualificationCertificate',
      label: '资质证书',
      width: 220,
      slot: 'qualificationCertificate'
    },
    { prop: 'sentBy', label: '送修人', width: 120 },
    { prop: 'repairPerson', label: '修复人', width: 120 },
    {
      prop: 'registrationDate',
      label: '登记日期',
      width: 120,
      align: 'center',
      formatter: (row) => formatDate(row.registrationDate)
    },
    {
      prop: 'sendRepairDate',
      label: '送修日期',
      width: 120,
      align: 'center',
      formatter: (row) => formatDate(row.sendRepairDate)
    },
    {
      prop: 'repairCompletionDate',
      label: '修完日期',
      width: 120,
      align: 'center',
      formatter: (row) => formatDate(row.repairCompletionDate)
    },
    {
      prop: 'status',
      label: '工单状态',
      width: 120,
      align: 'center',
      formatter: (row) => (row.status === 0 ? '修改中' : '已修复')
    },
    { prop: 'remarks', label: '备注' }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getCollectionRepairList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  const onClose = () => {
    modelValue.value = false
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
