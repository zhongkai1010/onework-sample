<template>
  <ele-page>
    <ele-card>
      <el-descriptions
        title="页面内容"
        :column="1"
        size="large"
        :border="true"
        :label-width="200"
      >
        <el-descriptions-item label="页面图片">
          <img src="./page.png" style="width: 100%"
        /></el-descriptions-item>
        <el-descriptions-item label="搜索条件"
          >藏品编号 请输入藏品编号 藏品名称 请输入藏品名称 藏品分类 地域类型
          地域 请输入地域 藏品来源 入藏日期范围 类型</el-descriptions-item
        >
        <el-descriptions-item label="操作栏"
          >藏品登记 绑定 批量修改分类 审核通过 删除藏品 导入 导出
          标签打印</el-descriptions-item
        >
        <el-descriptions-item label="表格字段" :span="24"
          >藏品状态 图片信息 编号类别 藏品编号 藏品名称 藏品类别 编号 数量
          数量单位 年代类型 年代 艺术家 地域类型 地域 质地类型 质地 通长 底径
          通宽 口径 通高 具体尺寸 质量范围 具体质量 质量单位 文物级别 藏品来源
          完残状况 保存状态 征集日期 入藏日期范围 入藏年度 类型 人文类型
          藏品介绍 文本类型 声像载体类型 声像载体存放位置 计算机磁盘路径
          颜色类别 颜色描述 存放位置 备注 入馆时间 入藏时间 登录时间 入柜时间
          操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">
          编辑 绑定 查看详情 铭牌打印
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
