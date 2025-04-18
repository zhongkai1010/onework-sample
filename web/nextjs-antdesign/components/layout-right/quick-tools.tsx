import React from 'react'
import IconHover from '../icon-hover'

type Props = {}

const QuickTools = (props: Props) => {
  return (
    <div className="dark:bg-dark-400 mb-3 bg-[#ffff]">
      <div className="dark:border-b-dark mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4">
        快捷工具
      </div>
      <div className="flex flex-row justify-around p-2">
        <IconHover
          src="/icon-ip-lookup-normal.svg"
          hoverSrc="/icon-ip-lookup-hover.svg"
          text="IP查询"
        />
        <IconHover
          src="/icon-timestamp-tool-normal.svg"
          hoverSrc="/icon-timestamp-tool-hover.svg"
          text="时间戳"
        />
        <IconHover
          src="/icon-translate-tool-normal.svg"
          hoverSrc="/icon-translate-tool-hover.svg"
          text="翻译"
        />
        <IconHover
          src="/icon-qrcode-tool-normal.svg"
          hoverSrc="/icon-qrcode-tool-hover.svg"
          text="二维码"
        />
        <IconHover
          src="/icon-note-tool-normal.svg"
          hoverSrc="/icon-note-tool-hover.svg"
          text="笔记"
        />
      </div>
    </div>
  )
}

export default QuickTools
