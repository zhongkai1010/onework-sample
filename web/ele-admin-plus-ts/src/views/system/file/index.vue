<template>
  <ele-page>
    <file-search @search="reload" />
    <ele-card :body-style="{ paddingTop: '8px' }">
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" v-model:selections="selections" :highlight-current-row="true" :export-config="{ fileName: '文件数据' }" cache-key="systemFileTable">
        <template #toolbar>
          <el-upload action="" :show-file-list="false" :before-upload="handleUpload" style="display: inline-block; vertical-align: middle">
            <el-button type="primary" class="ele-btn-icon" :icon="UploadOutlined"> 上传 </el-button>
          </el-upload>
          <el-button type="danger" class="ele-btn-icon" :icon="DeleteOutlined" style="margin-left: 12px" @click="remove()"> 删除 </el-button>
        </template>
        <template #path="{ row }">
          <el-link type="primary" :href="row.url" target="_blank" :underline="false">
            {{ row.path }}
          </el-link>
        </template>
        <template #action="{ row }">
          <el-link type="primary" :underline="false" :href="row.downloadUrl" target="_blank"> 下载 </el-link>
          <el-divider direction="vertical" />
          <el-link type="danger" :underline="false" @click="remove(row)"> 删除 </el-link>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { DeleteOutlined, UploadOutlined } from '@/components/icons'
  import FileSearch from './components/file-search.vue'
  import { pageFiles, removeFiles, uploadFile } from '@/api/system/file'
  import type { FileRecord, FileRecordParam } from '@/api/system/file/model'

  defineOptions({ name: 'SystemFile' })

  /** 表格实例 */
  const tableRef = ref<InstanceType<typeof EleProTable> | null>(null)

  /** 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'name',
      label: '文件名称',
      sortable: 'custom',
      minWidth: 140
    },
    {
      prop: 'path',
      label: '文件路径',
      sortable: 'custom',
      minWidth: 140,
      slot: 'path'
    },
    {
      prop: 'length',
      label: '文件大小',
      width: 120,
      align: 'center',
      sortable: 'custom',
      formatter: (row) => {
        if (row.length < 1024) {
          return row.length + 'B'
        } else if (row.length < 1024 * 1024) {
          return (row.length / 1024).toFixed(1) + 'KB'
        } else if (row.length < 1024 * 1024 * 1024) {
          return (row.length / 1024 / 1024).toFixed(1) + 'M'
        } else {
          return (row.length / 1024 / 1024 / 1024).toFixed(1) + 'G'
        }
      }
    },
    {
      prop: 'createNickname',
      label: '上传人',
      width: 120,
      align: 'center',
      sortable: 'custom'
    },
    {
      prop: 'createTime',
      label: '上传时间',
      width: 180,
      align: 'center',
      sortable: 'custom'
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 120,
      align: 'center',
      slot: 'action',
      hideInPrint: true,
      hideInExport: true
    }
  ])

  /** 表格选中数据 */
  const selections = ref<FileRecord[]>([])

  /** 表格数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return pageFiles({ ...where, ...orders, ...pages })
  }

  /** 搜索 */
  const reload = (where?: FileRecordParam) => {
    selections.value = []
    tableRef.value?.reload?.({ page: 1, where })
  }

  /** 删除 */
  const remove = (row?: FileRecord) => {
    const rows = row == null ? selections.value : [row]
    if (!rows.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    ElMessageBox.confirm('确定要删除“' + rows.map((d) => d.name).join(', ') + '”吗?', '系统提示', { type: 'warning', draggable: true })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        removeFiles(rows.map((d) => d.id))
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /** 上传 */
  const handleUpload = (file: File) => {
    if (file.size / 1024 / 1024 > 100) {
      EleMessage.error('大小不能超过 100MB')
      return false
    }
    const loading = EleMessage.loading({
      message: '上传中..',
      plain: true,
      mask: true
    })
    uploadFile(file)
      .then(() => {
        loading.close()
        EleMessage.success('上传成功')
        reload()
      })
      .catch((e) => {
        loading.close()
        EleMessage.error(e.message)
      })
    return false
  }
</script>
