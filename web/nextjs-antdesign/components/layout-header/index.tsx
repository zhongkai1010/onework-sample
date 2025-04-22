import { SettingFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React from 'react'
import SwitchTheme from '@/components/layout-header/switch-theme'
import Image from 'next/image'
import SwitchMode from '@/components/layout-header/switch-mode'
import SwitchLayout from '@/components/layout-header/switch-layout'
import clsx from 'clsx'
import { useTheme } from '@/hooks/useTheme'
import SwitchDark from './switch-dark'

type Props = {
  className?: string
}

const LayoutHeader = (props: Props) => {
  const { fontColor } = useTheme()
  return (
    <div
      className={clsx(
        'dark:bg-dark-400 flex flex-row bg-[#ffffff] pr-[24] pl-[24]',
        props.className
      )}
    >
      <Image src="/logo.svg" alt="" className="mr-8" height={54} width={112} />
      <Space direction="horizontal" size="large">
        <Button type="link">
          <Typography.Text type="secondary">课程</Typography.Text>
        </Button>
        <Button type="link">
          <Typography.Text type="secondary">APP</Typography.Text>
        </Button>
        <Button type="link">
          <Typography.Text type="secondary">会员</Typography.Text>
        </Button>
      </Space>
      <Space className="ml-auto" direction="horizontal" size="middle">
        <SwitchMode />
        <SwitchDark />
        <SwitchLayout />
        <SettingFilled
          className="cursor-pointer text-xl"
          style={{ color: fontColor }}
        />
        <SwitchTheme />
        <Button
          className="bg-white"
          style={{
            borderColor: fontColor,
            color: fontColor,
          }}
        >
          登录领矿石
        </Button>
        <Avatar
          icon={<UserOutlined />}
          style={{
            backgroundColor: fontColor,
          }}
        />
      </Space>
    </div>
  )
}

export default LayoutHeader
