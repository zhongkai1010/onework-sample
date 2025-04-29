import EleAdminPlus from 'ele-admin-plus/es';
<template>
  <div class="fixt-button-wrapper">
    <el-button
      class="button"
      size="large"
      :icon="Search"
      circle
      @click="open = true"
    />
  </div>
  <el-drawer v-model="open" size="80%" title="页面内容">
    <el-descriptions :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img src="../page.png" style="width: 100%"
      /></el-descriptions-item>
      <el-descriptions-item label="搜索条件"
        >藏品编号 藏品名称 藏品分类 地域类型 地域 请输入地域 藏品来源
        入藏日期范围 类型</el-descriptions-item
      >
      <el-descriptions-item label="操作栏"
        >藏品登记 绑定 批量修改分类 审核通过 删除藏品 导入 导出
        标签打印</el-descriptions-item
      >
      <el-descriptions-item label="表格字段" :span="24"
        >藏品状态 图片信息 编号类别 藏品编号 藏品名称 藏品类别 编号 数量
        数量单位 年代类型 年代 艺术家 地域类型 地域 质地类型 质地 通长 底径 通宽
        口径 通高 具体尺寸 质量范围 具体质量 质量单位 文物级别 藏品来源 完残状况
        保存状态 征集日期 入藏日期范围 入藏年度 类型 人文类型 藏品介绍 文本类型
        声像载体类型 声像载体存放位置 计算机磁盘路径 颜色类别 颜色描述 存放位置
        备注 入馆时间 入藏时间 登录时间 入柜时间 操作</el-descriptions-item
      >
      <el-descriptions-item label="表格操作">
        编辑 绑定 查看详情 铭牌打印
      </el-descriptions-item>
      <el-descriptions-item label="基本情况">
        描述 生产制造 出版 时间 地点 出版 时间 地点 生产制造 出版 机构 出版 机构
        工艺 请输入工艺 制造人 主体文字信息情况 造型及图案信息 备注
      </el-descriptions-item>
      <el-descriptions-item label="来源信息">
        捐赠时间 捐赠人 捐赠单位 接收人 接收单位 征集时间 征集地点
        出让机构及人员 征集费用 接收单位 拨交时间 出让单位 出让人 拨交批准单位
        接收单位 其他 请输入其他 备注
      </el-descriptions-item>
      <el-descriptions-item label="考古发掘信息">
        出土时间 出土地点 领队 负责人 负责人 考古机构 考古批准机构 考古报告名称
        考古报告出版社 考古报告日期 文物出土状态 备注
      </el-descriptions-item>
      <el-descriptions-item label="流转经历">
        时间起 时间止 收藏机构 收藏人 备注
      </el-descriptions-item>
      <el-descriptions-item label="著录信息">
        著录 出版 时间 请输入著录 出版 时间 出版机构及书名 作者 文章 章节 及页码
        章节 及页码 主要内容 备注
      </el-descriptions-item>
      <el-descriptions-item label="鉴定信息">
        鉴定时间 鉴定人 请输入鉴定人 鉴定机构 组织机构 批准机构
        鉴定意见及鉴定结论 备注
      </el-descriptions-item>
      <el-descriptions-item label="保管信息">
        藏品现登记号 条形码及其他标识编码 藏品分类号 本馆子分类 库房 库区 名称
        及编号 请输入库房 库区 名称 及编号 保存位置及编号 历史登记号
        保管适宜相对湿度 库房负责人 入库时间 藏品柜编号 本馆分类名称
        保管适宜温度 保管注意事项 防虫防腐措施等 防虫防腐措施等 备注
      </el-descriptions-item>
      <el-descriptions-item label="损坏发生记录">
        损坏发生时间 损坏发生地点 责任人 损坏情况 损坏原因 处理情况 备注
      </el-descriptions-item>
      <el-descriptions-item label="修复记录">
        修复时间 承担机构 修复人 修复地点 修复原因 修复情况及结果 备注
      </el-descriptions-item>
      <el-descriptions-item label="移动记录">
        时间起 时间止 移动目标区域 单位 移动原因 备注
      </el-descriptions-item>
      <el-descriptions-item label="展出信息">
        展览类型 展览名称 展出开始时间 展出截止时间 展览组织机构 展览举办地点
        接展单位 批准机构及批文号 备注
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue';
  import { ref } from 'vue';

  const open = ref(false);
</script>

<style lang="scss" scoped>
  .fixt-button-wrapper {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 1000;
    .button {
      width: 48px;
      height: 48px;
    }
  }
</style>
