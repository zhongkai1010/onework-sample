'use client'

import React, { JSX } from 'react'
import { App, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

const withTheme = (node: JSX.Element) => (
  <StyleProvider layer hashPriority="low">
    <ConfigProvider
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
  </StyleProvider>
)

export default withTheme
