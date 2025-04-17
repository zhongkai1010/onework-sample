'use client'

import React, { createContext, JSX, useEffect, useState } from 'react'
import { App, ConfigProvider, theme } from 'antd'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { DEFAULT_THEME, THEME_COLOR_STORE_KEY } from '@/lib/constant'
import { generate } from '@ant-design/colors'

dayjs.locale('zh-cn')

export const ThemeContext = createContext({
  themeColor: DEFAULT_THEME,
  setThemeColor: (color: string) => {},
  dark: false,
  setDark: (dark: boolean) => {},
})

const withTheme = (node: JSX.Element) => {
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setThemeColor(themeColor)
    // 设置全局 CSS 变量
    document.documentElement.style.setProperty(
      '--color-primary',
      themeColor ?? DEFAULT_THEME
    )
    const colors = generate(themeColor)
    for (let i = 0; i < colors.length; i++) {
      document.documentElement.style.setProperty(
        `--color-primary-${i == 0 ? 50 : i * 100}`,
        colors[i]
      )
    }
  }, [themeColor])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  useEffect(() => {
    const cacheThemeColor = localStorage.getItem(THEME_COLOR_STORE_KEY)
    if (cacheThemeColor) {
      setThemeColor(cacheThemeColor)
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        themeColor: themeColor ?? DEFAULT_THEME,
        setThemeColor,
        dark,
        setDark,
      }}
    >
      <ConfigProvider
        locale={zhCN}
        wave={{ disabled: true }}
        theme={{
          algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: themeColor,
            borderRadius: 0,
          },
        }}
      >
        <App> {node}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
export default withTheme
