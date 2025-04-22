'use client'

import React, { JSX } from 'react'
import { App, ConfigProvider, theme } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { useDark } from '@/hooks/useDark'
import { useTheme } from '@/hooks/useTheme'

dayjs.locale('zh-cn')

const withTheme = (node: JSX.Element) => {
  const { dark } = useDark()
  const { themeColor } = useTheme()

  return (
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
  )
}
export default withTheme
