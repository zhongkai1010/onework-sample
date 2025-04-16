import { SITE_TYPE } from '@/lib/constant'
import { Popover } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// 自定义按钮组件，接受 `onClick` 和 `label` 作为 props
export interface SiteSelectProps {
  onClick?: (key: string) => void
}

const SiteSelect = ({ onClick }: SiteSelectProps) => {
  const [selectKey, setSelectKey] = useState(SITE_TYPE[0].key)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onClick && onClick(selectKey)
  }, [selectKey])

  const site = SITE_TYPE.find((site) => site.key === selectKey)
  return (
    <Popover
      open={open}
      placement="bottomLeft"
      styles={{
        body: { padding: 0 },
      }}
      arrow={false}
      trigger="click"
      content={
        <>
          {SITE_TYPE.map((site) => (
            <div
              className="mb-1.5 flex w-[180] cursor-pointer flex-row items-center p-2 hover:bg-sky-200"
              key={site.key}
              onClick={() => {
                setOpen(false)
                setSelectKey(site.key)
              }}
            >
              <Image
                src={site.icon}
                alt={site.name}
                height={28}
                width={28}
                className="mr-2"
              />
              <span aria-label={site.name}>{site.name}</span>
            </div>
          ))}
        </>
      }
    >
      {site && (
        <div
          className="flex cursor-pointer flex-row items-center"
          onClick={() => {
            setOpen(true)
          }}
        >
          <Image
            src={site.icon}
            alt={site.name}
            height={28}
            width={28}
            className="mr-2"
          />
          <span aria-label={site.name}>{site.name}</span>
        </div>
      )}
    </Popover>
  )
}

export default SiteSelect
