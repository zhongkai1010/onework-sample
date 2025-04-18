import {
  LayoutFilled,
  MoonFilled,
  SettingFilled,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React, { useContext } from 'react'
import SwitchTheme from '@/components/switch-theme'
import Image from 'next/image'
import SwitchMode from '@/components/switch-mode'
import { ThemeContext } from '@/theme'
import clsx from 'clsx'

type Props = {
  className?: string
}

const LayoutHeader = (props: Props) => {
  const { fontColor, dark, setDark } = useContext(ThemeContext)
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
        {dark ? (
          <SunOutlined
            className="cursor-pointer text-xl"
            onClick={() => {
              setDark(false)
            }}
            style={{ color: fontColor }}
          />
        ) : (
          <MoonFilled
            className="cursor-pointer text-xl"
            onClick={() => {
              setDark(true)
            }}
            style={{ color: fontColor }}
          />
        )}
        <LayoutFilled
          className="cursor-pointer text-xl"
          style={{ color: fontColor }}
        />
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
