import { JOB_TYPE } from '@/lib/constant'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React, { useState } from 'react'

type Props = {}

const SwitchMode = (props: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <Dropdown
      open={open}
      menu={{
        onClick: () => {
          setOpen(false)
        },
        items: JOB_TYPE.map((item) => {
          return {
            key: item.name,
            title: item.name,
            label: item.title,
          }
        }),
      }}
    >
      <div
        className="bg-primary dark:bg-dark dark: flex h-[32px] w-[120px] cursor-pointer flex-row items-center text-sm text-white"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div className="dark:text-dark-font flex-1 text-center">前端</div>
        <div className="dark:text-dark-font dark:border-dark-font flex h-full w-[32] items-center justify-center border-l-1 border-white text-center text-xs">
          {open ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
    </Dropdown>
  )
}

export default SwitchMode
