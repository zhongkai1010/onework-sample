# 博物馆/艺术馆管理系统

基于 Vue 3 + TypeScript + Element Plus + Ele Admin Plus 开发的博物馆/艺术馆管理系统。

## 技术栈

- Vue 3
- TypeScript
- Element Plus
- Ele Admin Plus
- Vite

## 项目结构

### 主要模块

1. **藏品管理** (`src/views/projects/collection/`)

   - 影像管理
   - 事故记录
   - 修复记录
   - 注销管理

2. **库存管理** (`src/views/projects/inventory/`)

   - 入库管理
   - 出库管理
   - 仓库管理
   - 调拨管理

3. **台账管理** (`src/views/projects/ledger/`)

   - 藏品台账
   - 图书台账

4. **其他模块**
   - 展览管理
   - 艺术家管理
   - 报表管理
   - 数据管理
   - 分组管理
   - 编目管理
   - 仪表盘

## 开发环境设置

### IDE 推荐配置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### TypeScript 支持

由于 TypeScript 无法直接处理 `.vue` 文件的类型信息，默认情况下它们会被视为通用 Vue 组件类型。如果需要获取实际的 prop 类型（例如在使用手动 `h(...)` 调用时进行 props 验证），可以：

1. 在 VSCode 命令面板中运行 `Volar: Switch TS Plugin on/off`
2. 确保在 `tsconfig.json` 中正确配置了 TypeScript 插件

## 页面通用功能

1. 搜索表单：支持多条件组合查询
2. 数据表格：支持排序、筛选、分页
3. 工具栏：提供常用操作按钮
4. 操作列：行级别的操作按钮
5. 弹窗组件：用于数据编辑、详情查看等
6. 参考按钮：提供操作指引

## 组件结构

每个模块通常包含以下组件：

1. `index.vue` - 主页面
2. `components/` - 子组件目录
   - `search-form.vue` - 搜索表单组件
   - `form-edit.vue` - 编辑表单组件
   - `*-details.vue` - 详情查看组件
   - 其他业务相关组件

## 技术特点

1. 采用 Vue 3 + TypeScript 开发，提供类型安全
2. 使用 Element Plus 和 Ele Admin Plus 作为 UI 框架
3. 模块化设计，每个功能模块独立
4. 统一的页面布局和操作模式
5. 完善的权限管理和数据安全机制

## 开发指南

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
4. 构建生产版本：`npm run build`

## 注意事项

1. 确保使用 Volar 而不是 Vetur 进行 Vue 3 开发
2. 所有新组件都应该放在对应模块的 `components` 目录下
3. 遵循项目的命名规范和代码风格
4. 确保所有组件都有适当的类型定义

