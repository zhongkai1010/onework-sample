import { useTheme } from '@/hooks/useTheme'
import { CheckCircleFilled, LayoutFilled } from '@ant-design/icons'
import { Popover } from 'antd'
import React from 'react'
import {
  IconClassicLayout,
  IconBrowseLayout,
  IconToolLayout,
} from '@/components/layout-icon'

const SwitchLayout = () => {
  const { fontColor } = useTheme()
  return (
    <Popover
      placement="bottom"
      trigger="click"
      arrow={false}
      align={{
        offset: [0, 20],
      }}
      content={
        <div className="flex h-[132] w-screen flex-row justify-end bg-white/30 px-32 py-8 backdrop-blur-sm">
          <div className="text-primary hover:text-primary/80 flex flex-col items-center justify-center px-5">
            <div className="mb-2 text-center text-5xl">
              <IconClassicLayout />
            </div>
            <div>
              <span>经典模式</span>
              <CheckCircleFilled className="ml-1.5" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 text-center">
            <div className="mb-2 text-5xl">
              <IconBrowseLayout />
            </div>
            <div>
              <span>浏览模式</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 text-center">
            <div className="mb-2 text-5xl">
              <IconToolLayout />
            </div>
            <div>
              <span>工具模式</span>
              <CheckCircleFilled className="ml-1.5" />
            </div>
          </div>
        </div>
      }
      styles={{
        body: { padding: 0, backgroundColor: 'transparent' },
      }}
    >
      <LayoutFilled
        className="cursor-pointer text-xl"
        style={{ color: fontColor }}
      />
    </Popover>
  )
}

export default SwitchLayout
