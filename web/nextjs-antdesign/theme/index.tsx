'use client'

import React, { JSX } from 'react'
import { App, ConfigProvider } from 'antd'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'

dayjs.locale('zh-cn')

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    locale={zhCN}
    wave={{ disabled: true }}
    theme={{
      token: {
        colorPrimary: '#1e80ff',
        borderRadius: 0,
      },
    }}
  >
    <App> {node}</App>
  </ConfigProvider>
)

export default withTheme
