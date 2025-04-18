/*
 * @Author: zhongkai zhongkai1010@163.com
 * @Date: 2025-04-17 21:38:09
 * @LastEditors: zhongkai zhongkai1010@163.com
 * @LastEditTime: 2025-04-18 10:46:05
 * @FilePath: \web\nextjs-antdesign\theme\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'

import React, { createContext, JSX, useEffect, useState } from 'react'
import { App, ConfigProvider, theme } from 'antd'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import {
  DEFAULT_DARK_COLOR,
  DEFAULT_DARK_FONT_COLOR,
  DEFAULT_THEME_COLOR,
  THEME_COLOR_STORE_KEY,
} from '@/lib/constant'
import { setDarkCssVariable, setPrimaryCssVariable } from '@/lib/utils'

dayjs.locale('zh-cn')

export const ThemeContext = createContext({
  themeColor: DEFAULT_THEME_COLOR,
  setThemeColor: (color: string) => {},
  dark: false,
  setDark: (dark: boolean) => {},
  fontColor: DEFAULT_DARK_COLOR,
})

const withTheme = (node: JSX.Element) => {
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR)
  const [fontColor, setFontColor] = useState(DEFAULT_THEME_COLOR)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (!dark) {
      setThemeColor(themeColor)
      setPrimaryCssVariable(themeColor)
      setFontColor(themeColor)
    }
  }, [themeColor])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      setFontColor(DEFAULT_DARK_FONT_COLOR)
      setDarkCssVariable(DEFAULT_DARK_COLOR)
    } else {
      document.documentElement.classList.remove('dark')
      setFontColor(themeColor)
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
        themeColor: themeColor ?? DEFAULT_THEME_COLOR,
        setThemeColor,
        dark,
        setDark,
        fontColor,
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
