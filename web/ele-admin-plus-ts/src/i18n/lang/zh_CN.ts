export const zh_CN = {
  layout: {
    home: '主页',
    header: {
      profile: '个人中心',
      password: '修改密码',
      logout: '退出登录'
    },
    footer: {
      website: '官网',
      document: '文档',
      authorization: '授权',
      copyright: 'Copyright © 2025 OneWork'
    },
    logout: {
      title: '系统提示',
      message: '确定要退出登录吗?'
    },
    tabs: {
      reload: '刷新当前页签',
      close: '关闭当前页签',
      closeLeft: '关闭左侧页签',
      closeRight: '关闭右侧页签',
      closeOther: '关闭其它页签',
      closeAll: '关闭全部页签',
      fullscreen: '内容区域全屏',
      fullscreenExit: '退出内容全屏'
    },
    setting: {
      title: '主题风格设置',
      sideStyles: {
        dark: '暗色侧栏',
        light: '亮色侧栏'
      },
      headStyles: {
        light: '亮色顶栏',
        dark: '暗色顶栏',
        primary: '主色顶栏'
      },
      layoutStyles: {
        side: '左侧菜单布局',
        top: '顶部菜单布局',
        mix: '混合菜单布局'
      },
      colors: {
        default: '拂晓蓝',
        dust: '薄暮',
        sunset: '日暮',
        volcano: '火山',
        purple: '酱紫',
        green: '极光绿',
        geekblue: '极客蓝'
      },
      darkMode: '开启暗黑模式',
      roundedTheme: '开启圆角主题',
      layout: '导航模式',
      sidebarLayout: '侧栏双排菜单',
      fluid: '内容区域铺满',
      other: '其它配置',
      more: '更多配置',
      tab: '页签配置',
      fixedHeader: '固定顶栏区域',
      fixedSidebar: '固定侧栏区域',
      fixedBody: '内容区域滚动',
      logoInHeader: 'Logo置于顶栏',
      colorfulIcon: '侧栏彩色图标',
      uniqueOpened: '侧栏排它展开',
      responsive: '移动端响应式',
      weakMode: '开启色弱模式',
      showTabs: '开启多页签栏',
      fixedHome: '固定主页页签',
      tabInHeader: '页签置于顶栏',
      tabStyle: '页签显示风格',
      tabStyles: {
        default: '默认',
        dot: '圆点',
        tag: '标签',
        card: '卡片'
      },
      menuItemTrigger: '混合菜单分割',
      transitionName: '路由切换动画',
      transitions: {
        slideRight: '滑动消退',
        slideBottom: '底部消退',
        zoomIn: '放大渐变',
        zoomOut: '缩小渐变',
        fade: '淡入淡出'
      },
      reset: '重置'
    }
  },
  login: {
    title: '用户登录',
    username: '请输入登录账号',
    password: '请输入登录密码',
    code: '请输入验证码',
    remember: '记住密码',
    login: '登录',
    passwordType: '密码登录',
    qrcodeType: '扫码登录',
    refreshQrcode: '刷新二维码'
  },
  list: {
    // 基础列表
    basic: {
      table: {
        avatar: '头像',
        username: '用户账号',
        nickname: '用户名',
        organizationName: '组织机构',
        phone: '手机号',
        email: '邮箱',
        roles: '角色',
        sexName: '性别',
        createTime: '创建时间',
        status: '状态',
        action: '操作'
      }
    }
  }
};

export type Locale = typeof zh_CN;
