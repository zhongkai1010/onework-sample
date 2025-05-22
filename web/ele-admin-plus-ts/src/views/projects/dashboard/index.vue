<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <el-card flex-table>
      <el-row :gutter="20">
        <!-- 导航卡片 -->
        <el-col :span="3">
          <router-link to="/catalog/collection">
            <div class="dashboard-card bg-green">
              <el-icon><FolderOpened /></el-icon>
              <span>藏品编目</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/data/group/group">
            <div class="dashboard-card bg-blue">
              <el-icon><Folder /></el-icon>
              <span>藏品组管理</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/system/user">
            <div class="dashboard-card bg-purple">
              <el-icon><User /></el-icon>
              <span>人员管理</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/artist/artist">
            <div class="dashboard-card bg-pink">
              <el-icon><Star /></el-icon>
              <span>艺术家列表</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/repair/collection">
            <div class="dashboard-card bg-orange">
              <el-icon><Tools /></el-icon>
              <span>修复管理</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/inventory/outbound/order">
            <div class="dashboard-card bg-lime">
              <el-icon><Van /></el-icon>
              <span>出库单管理</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/inventory/transfer/order">
            <div class="dashboard-card bg-cyan">
              <el-icon><Document /></el-icon>
              <span>拨库单管理</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link to="/cancellation/cancellation-order">
            <div class="dashboard-card bg-red">
              <el-icon><Delete /></el-icon>
              <span>注销单管理</span>
            </div>
          </router-link>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px">
        <!-- 文物状态统计 -->
        <el-col :span="12">
          <el-card>
            <h3>文物状态统计</h3>
            <status-chart />
          </el-card>
        </el-col>
        <!-- 藏品级别统计 -->
        <el-col :span="12">
          <el-card>
            <h3>藏品级别统计</h3>
            <level-chart />
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px">
        <!-- 入藏年度统计 -->
        <el-col :span="24">
          <el-card>
            <h3>入藏年度统计</h3>
            <year-chart />
          </el-card>
        </el-col>
      </el-row>

      <!-- 参考按钮 -->
      <ReferenceButton
        title="控制台页面"
        :imageUrl="pageImage"
        searchText="无搜索条件"
        operationText="无操作栏"
        tableFieldsText="无表格字段"
        tableOperationsText="无表格操作"
      />
    </el-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import {
    FolderOpened,
    Folder,
    User,
    Star,
    Tools,
    Van,
    Document,
    Delete
  } from '@element-plus/icons-vue'
  import StatusChart from './components/StatusChart.vue'
  import LevelChart from './components/LevelChart.vue'
  import YearChart from './components/YearChart.vue'

  defineOptions({ name: 'DashboardAnalysis' })
</script>

<style lang="scss" scoped>
  .dashboard-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;

    .el-icon {
      font-size: 36px;
      margin-bottom: 8px;
    }

    &.bg-green {
      background-color: #4cd964;
    }
    &.bg-blue {
      background-color: #39a9ff;
    }
    &.bg-purple {
      background-color: #909399;
    }
    &.bg-pink {
      background-color: #f56c6c;
    }
    &.bg-orange {
      background-color: #ff9500;
    }
    &.bg-lime {
      background-color: #b7eb8f;
    }
    &.bg-cyan {
      background-color: #5ac8fa;
    }
    &.bg-red {
      background-color: #d9001b;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
