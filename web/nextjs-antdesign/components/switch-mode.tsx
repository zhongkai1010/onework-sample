import { DownOutlined } from '@ant-design/icons'
import React from 'react'

type Props = {}

const SwitchMode = (props: Props) => {
  return (
    <div className="bg-primary dark:bg-dark dark: flex h-[32px] w-[120px] cursor-pointer flex-row items-center text-sm text-white">
      <div className="dark:text-dark-font flex-1 text-center">前端</div>
      <div className="dark:text-dark-font dark:border-dark-font flex h-full w-[32] items-center justify-center border-l-1 border-white text-center">
        <DownOutlined />
      </div>
    </div>
  )
}

export default SwitchMode
