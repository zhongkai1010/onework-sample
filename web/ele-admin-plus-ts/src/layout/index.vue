<template>
  <ele-pro-layout
    :menus="menus"
    :tabs="tabs"
    :collapse="collapse"
    :compact="compact"
    :maximized="maximized"
    :tab-bar="tabBar ? (tabInHeader ? 'header' : true) : false"
    :breadcrumb="layout === 'default' && (!tabBar || !tabInHeader)"
    :layout="layout"
    :sidebar-layout="sidebarLayout"
    :header-style="headerStyle"
    :sidebar-style="sidebarStyle"
    :tab-style="tabStyle"
    :fixed-header="fixedHeader"
    :fixed-sidebar="fixedSidebar"
    :fixed-body="fixedBody"
    :fluid="fluid"
    :logo-in-header="logoInHeader"
    :colorful-icon="colorfulIcon"
    :unique-opened="uniqueOpened"
    :fixed-home="fixedHome"
    :home-path="HOME_PATH"
    :redirectPath="REDIRECT_PATH"
    :locale="locale"
    :i18n="i18n"
    :tab-sortable="!mobileDevice"
    :tab-context-menu="{
      iconProps: { size: 15 },
      popperOptions: {
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
      }
    }"
    :tab-context-menus="tabContext"
    :nav-trigger="layout === 'top' ? void 0 : menuItemTrigger"
    :box-trigger="menuItemTrigger"
    :keep-alive="TAB_KEEP_ALIVE"
    :transition-name="transitionName"
    :ellipsis-props="{ hideTimeout: 800 }"
    :responsive="responsive"
    @update:collapse="updateCollapse"
    @update:maximized="updateMaximized"
    @tabAdd="addPageTab"
    @tabClick="handleTabClick"
    @tabRemove="removePageTab"
    @tabContextMenu="handleTabContextMenu"
    @tabSortChange="setPageTabs"
    @bodySizeChange="handleBodySizeChange"
  >
    <router-layout />
    <!-- logo -->
    <template #logo>
      <img src="@/assets/logo.svg" style="width: 30px; height: 30px" />
    </template>
    <template #logoTitle>
      <h1>{{ PROJECT_NAME }}</h1>
    </template>
    <!-- 顶栏左侧按钮 -->
    <template #left="{ sidebar }">
      <!-- 折叠侧栏 -->
      <layout-tool v-if="sidebar" @click="updateCollapse(!collapse)">
        <el-icon style="transform: scale(1.14)">
          <MenuUnfoldOutlined v-if="collapse" />
          <MenuFoldOutlined v-else />
        </el-icon>
      </layout-tool>
      <!-- 刷新 -->
      <layout-tool
        :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }"
        @click="reloadPageTab()"
      >
        <el-icon style="transform: scale(1.09)">
          <ReloadOutlined />
        </el-icon>
      </layout-tool>
    </template>
    <!-- 顶栏右侧按钮 -->
    <template #right>
      <!-- 全屏切换 -->
      <layout-tool class="hidden-sm-and-down" @click="toggleFullscreen">
        <el-icon style="transform: scale(1.18)">
          <CompressOutlined v-if="isFullscreen" style="stroke-width: 4" />
          <ExpandOutlined v-else style="stroke-width: 4" />
        </el-icon>
      </layout-tool>
      <!-- 语言切换 -->
      <!-- <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }">
        <i18n-icon :icon-style="{ transform: 'scale(1.15)' }" />
      </layout-tool> -->
      <!-- 消息通知 -->
      <!-- <layout-tool :class="{ 'hidden-sm-and-down': tabBar && tabInHeader }">
        <header-notice />
      </layout-tool> -->
      <!-- 用户信息 -->
      <layout-tool>
        <header-user />
      </layout-tool>
      <!-- 夜间模式 -->
      <!-- <layout-tool ref="darkSwitchRef" class="dark-switch">
        <el-switch
          :active-action-icon="MoonOutlined"
          :inactive-action-icon="SunOutlined"
          :model-value="darkMode"
          @update:modelValue="updateDarkMode"
        />
      </layout-tool> -->
      <!-- 主题设置 -->
      <!-- <layout-tool @click="openSetting">
        <el-icon>
          <MoreOutlined />
        </el-icon>
      </layout-tool> -->
    </template>
    <!-- 页签栏右侧下拉菜单 -->
    <template v-if="tabBar && !tabInHeader" #tabExtra="{ active }">
      <tab-dropdown
        :items="tabExtra"
        :dropdown-props="{
          iconProps: { size: 15 },
          popperOptions: {
            strategy: 'fixed',
            modifiers: [{ name: 'offset', options: { offset: [12, 8] } }]
          }
        }"
        @menuClick="(key) => handleTabDropdownMenu(key, active)"
      />
    </template>
    <!-- 折叠双侧栏一级 -->
    <template #boxBottom>
      <div :style="{ flexShrink: 0, padding: roundedTheme ? '4px 8px' : 0 }">
        <layout-tool style="height: 32px" @click="updateCompact(!compact)">
          <el-icon style="transform: scale(1.05)">
            <MenuUnfoldOutlined v-if="compact" />
            <MenuFoldOutlined v-else />
          </el-icon>
        </layout-tool>
      </div>
    </template>
    <!-- 全局页脚 -->
    <template #footer>
      <page-footer />
    </template>
    <!-- 页签标题 -->
    <template #tabTitle="{ label, item }">
      <el-icon
        v-if="item.meta?.icon"
        class="ele-tab-icon"
        v-bind="item.meta?.props?.iconProps || {}"
      >
        <component :is="item.meta.icon" :style="item.meta?.props?.iconStyle" />
      </el-icon>
      <span :style="item.meta?.icon ? { paddingLeft: '4px' } : {}">
        {{ label }}
      </span>
    </template>
  </ele-pro-layout>
  <!-- 主题设置抽屉 -->
  <setting-drawer v-model="settingVisible" />
</template>

<script lang="ts" setup>
  import { ref, computed, markRaw } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import {
    LayoutTool,
    TabDropdown,
    requestFullscreen,
    exitFullscreen,
    checkFullscreen,
    EleMessage
  } from 'ele-admin-plus/es'
  import type {
    MenuI18n,
    TabItemEventOption,
    BodySizeChangeOption
  } from 'ele-admin-plus/es/ele-pro-layout/types'
  import type { DropdownItem } from 'ele-admin-plus/es/ele-dropdown/types'
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReloadOutlined,
    ExpandOutlined,
    CompressOutlined,
    CloseOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    MinusCircleOutlined,
    CloseCircleOutlined
  } from '@/components/icons'
  import { PROJECT_NAME, HOME_PATH, REDIRECT_PATH, TAB_KEEP_ALIVE } from '@/config/setting'
  import { useUserStore } from '@/store/modules/user'
  import { useThemeStore } from '@/store/modules/theme'
  import { useMobileDevice } from '@/utils/use-mobile'
  import { usePageTab } from '@/utils/use-page-tab'
  import RouterLayout from '@/components/RouterLayout/index.vue'
  import HeaderUser from './components/header-user.vue'
  import PageFooter from './components/page-footer.vue'
  import SettingDrawer from './components/setting-drawer.vue'

  defineOptions({ name: 'Layout' })

  const { push } = useRouter()
  const { t, locale } = useI18n()
  const {
    addPageTab,
    removePageTab,
    removeAllPageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    reloadPageTab,
    setPageTabs
  } = usePageTab()
  const { mobileDevice } = useMobileDevice()
  const userStore = useUserStore()
  const themeStore = useThemeStore()

  /** 菜单数据 */
  const { menus } = storeToRefs(userStore)

  /** 布局风格 */
  const {
    tabs,
    collapse,
    compact,
    maximized,
    tabBar,
    layout,
    sidebarLayout,
    headerStyle,
    sidebarStyle,
    tabStyle,
    fixedHeader,
    fixedSidebar,
    fixedBody,
    fluid,
    logoInHeader,
    colorfulIcon,
    transitionName,
    uniqueOpened,
    fixedHome,
    tabInHeader,
    roundedTheme,
    menuItemTrigger,
    responsive
  } = storeToRefs(themeStore)

  /** 是否全屏 */
  const isFullscreen = ref(false)

  /** 是否显示主题设置抽屉 */
  const settingVisible = ref(false)

  /** 页签右键菜单 */
  const tabContext = computed<DropdownItem[]>(() => {
    return [
      {
        title: t('layout.tabs.reload'),
        command: 'reload',
        icon: markRaw(ReloadOutlined),
        iconStyle: { transform: 'scale(0.98)' }
      },
      {
        title: t('layout.tabs.close'),
        command: 'close',
        icon: markRaw(CloseOutlined)
      },
      {
        title: t('layout.tabs.closeLeft'),
        command: 'left',
        icon: markRaw(ArrowLeftOutlined),
        divided: true
      },
      {
        title: t('layout.tabs.closeRight'),
        command: 'right',
        icon: markRaw(ArrowRightOutlined)
      },
      {
        title: t('layout.tabs.closeOther'),
        command: 'other',
        icon: markRaw(MinusCircleOutlined),
        divided: true
      },
      {
        title: t('layout.tabs.closeAll'),
        command: 'all',
        icon: markRaw(CloseCircleOutlined)
      }
    ]
  })

  /** 页签栏右侧下拉菜单 */
  const tabExtra = computed<DropdownItem[]>(() => {
    const isMax = maximized.value
    return [
      {
        title: t(`layout.tabs.${isMax ? 'fullscreenExit' : 'fullscreen'}`),
        command: 'fullscreen',
        icon: isMax ? markRaw(CompressOutlined) : markRaw(ExpandOutlined)
      },
      ...tabContext.value
    ]
  })

  /** 侧栏折叠切换 */
  const updateCollapse = (value: boolean) => {
    themeStore.setCollapse(value)
  }

  /** 双侧栏一级折叠切换 */
  const updateCompact = (value: boolean) => {
    themeStore.setCompact(value)
  }

  /** 内容区全屏切换 */
  const updateMaximized = (value: boolean) => {
    themeStore.setMaximized(value)
  }

  /** 页签点击事件 */
  const handleTabClick = (option: TabItemEventOption) => {
    const { key, active, item } = option
    const path = item?.fullPath || key
    if (key !== active && path) {
      push(path)
    }
  }

  /** 内容区尺寸改变事件 */
  const handleBodySizeChange = ({ width }: BodySizeChangeOption) => {
    themeStore.setContentWidth(width ?? null)
    isFullscreen.value = checkFullscreen()
  }

  /** 全屏切换 */
  const toggleFullscreen = () => {
    if (isFullscreen.value) {
      exitFullscreen()
      isFullscreen.value = false
      return
    }
    try {
      requestFullscreen()
      isFullscreen.value = true
    } catch (e) {
      console.error(e)
      EleMessage.error('您的浏览器不支持全屏模式')
    }
  }

  /** 页签右键菜单点击事件 */
  const handleTabContextMenu = (option: TabItemEventOption) => {
    const { command, key, item, active } = option
    if (command === 'reload') {
      reloadPageTab({ fullPath: item?.fullPath || key })
    } else if (command === 'close') {
      removePageTab({ key, active })
    } else if (command === 'left') {
      removeLeftPageTab({ key, active })
    } else if (command === 'right') {
      removeRightPageTab({ key, active })
    } else if (command === 'other') {
      removeOtherPageTab({ key, active })
    } else if (command === 'all') {
      removeAllPageTab({ key, active })
    }
  }

  /** 页签栏右侧下拉菜单点击事件 */
  const handleTabDropdownMenu = (command: string, active: string) => {
    if (command === 'reload') {
      reloadPageTab()
    } else if (command === 'fullscreen') {
      updateMaximized(!maximized.value)
    } else {
      handleTabContextMenu({ command, key: active, active })
    }
  }

  /** 菜单标题国际化 */
  const i18n: MenuI18n = ({ menu, locale, tab }) => {
    if (locale) {
      if (tab && tab.meta?.lang && tab.meta.lang[locale]) {
        return tab.meta.lang[locale]
      }
      if (menu?.meta?.lang && menu.meta.lang[locale]) {
        return menu.meta.lang[locale]
      }
    }
    return menu?.meta?.title
  }
</script>

<style lang="scss" scoped>
  .dark-switch {
    padding: 0 6px;
    position: relative;

    :deep(.el-switch) {
      height: 22px;
      line-height: 22px;
      position: static;

      .el-switch__core {
        --el-switch-off-color: var(--el-border-color-extra-light);
        --el-switch-on-color: var(--el-border-color-extra-light);
        height: 22px;
        border-radius: 11px;
        border: 1px solid var(--el-border-color);

        .el-switch__action {
          color: var(--el-text-color-regular);
          background: var(--el-bg-color);
          width: 18px;
          height: 18px;
          font-size: 12px;
          left: 1.35px;
        }
      }

      &.is-checked .el-switch__core .el-switch__action {
        left: calc(100% - 19.35px);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
