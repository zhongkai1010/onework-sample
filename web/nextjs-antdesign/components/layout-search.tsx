import { QUICK_NAVS, SEARCH_SITE } from '@/lib/constant'
import { Button, Dropdown, Input } from 'antd'
import React from 'react'
import Image from 'next/image'
import { EllipsisOutlined } from '@ant-design/icons'
import clsx from 'clsx'
type Props = {
  className?: string
}

const LayoutSearch = (props: Props) => {
  return (
    <div
      className={clsx(
        'bg-primary dark:bg-dark flex flex-col items-center',
        props.className
      )}
    >
      <Input
        className="dark:text-dark-font dark:border-dark-400 mt-6 mb-4 rounded-xs border-0 p-1.5"
        style={{ width: '40%' }}
        prefix={
          <Dropdown
            menu={{
              items: SEARCH_SITE.map((item) => {
                return {
                  label: item.name,
                  key: item.url,
                }
              }),
            }}
          >
            <Image
              src="/search-google.png"
              alt="google"
              className="mr-4 cursor-pointer"
              width={28}
              height={28}
            />
          </Dropdown>
        }
        placeholder="输入关键字搜索"
      />
      <ul className="flex list-none flex-row items-center justify-center text-white">
        <li className="dark:text-dark-font mr-4 text-sm whitespace-nowrap">
          快捷导航
        </li>
        {QUICK_NAVS.map((item, index) => (
          <li
            key={index}
            className="bg-primary-300 dark:bg-dark-400 mr-4 cursor-pointer rounded-2xl pr-2 pl-1"
          >
            <a href={item.link} target="_blank" className="flex flex-row">
              <Image
                src={item.icon}
                alt={item.text}
                height={20}
                width={20}
                className="rounded-[50%] object-contain"
              />
              <span className="dark:text-dark-font p-1 text-xs whitespace-nowrap text-white">
                {item.text}
              </span>
            </a>
          </li>
        ))}
        <li>
          <Button
            shape="circle"
            style={{ width: '24px', height: '24px', minWidth: '24px' }}
            icon={<EllipsisOutlined className="text-xs" />}
          />
        </li>
      </ul>
    </div>
  )
}

export default LayoutSearch
