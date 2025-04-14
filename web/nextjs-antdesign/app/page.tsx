'use client'
import withTheme from '@/theme'

import Image from 'next/image'
import { Button, Dropdown, Input, MenuProps } from 'antd'

import {
  DownOutlined,
  EllipsisOutlined,
  LayoutFilled,
  MoonFilled,
  SettingFilled,
} from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    label: '前端',
    key: '1',
  },
  {
    label: '后端',
    key: '2',
  },
  {
    label: '设计',
    key: '3',
  },
  {
    label: '开发',
    key: '4',
  },
]

const navs = [
  {
    icon: '/nav-juejin.png',
    link: 'jiejin',
    text: '掘金',
  },
  {
    icon: '/nav-zhihu.ico',
    link: 'zhihu',
    text: '知乎',
  },
  {
    icon: '/nav-bilibili.ico',
    link: 'bilibili',
    text: '哔哩哔哩',
  },
  {
    icon: '/nav-github.ico',
    link: 'github',
    text: 'GitHub',
  },
  {
    icon: '/nav-v2ex.ico',
    link: 'v2ex',
    text: 'v2ex',
  },
  {
    icon: '/nav-jd.ico',
    link: 'jd',
    text: '京东',
  },
]

function Home() {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#f4f5f5]">
      <div className="flex h-[54] flex-row bg-[#ffffff] pr-[24] pl-[24]">
        <Image
          src="/logo.svg"
          alt=""
          className="mr-4"
          height={54}
          width={112}
        />
        <div className="flex flex-row items-center justify-center">
          <a className="mr-6 ml-6 cursor-pointer text-base text-slate-400 hover:text-slate-300">
            课程
          </a>
          <a className="hover:text-slate-30 hover:text-slate-30 mr-6 ml-6 text-base text-slate-400">
            APP
          </a>
          <a className="hover:text-slate-30 hover:text-slate-30 mr-6 ml-6 cursor-pointer text-base text-slate-400">
            会员
          </a>
        </div>
        <div className="ml-auto flex flex-row items-center justify-center">
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{ items, style: { padding: '4px' } }}
            className="mr-3 ml-3"
          >
            <span className="pr-2 pl-2">前端</span>
          </Dropdown.Button>
          <MoonFilled
            className="mr-3 ml-3 cursor-pointer text-xl text-blue-400"
            style={{ color: '#1e80ff' }}
          />
          <LayoutFilled
            className="mr-3 ml-3 cursor-pointer text-xl"
            style={{ color: '#1e80ff' }}
          />
          <SettingFilled
            className="mr-3 ml-3 cursor-pointer text-xl"
            style={{ color: '#1e80ff' }}
          />
          <Button
            className="mr-3 ml-3 bg-white"
            style={{ borderColor: '#1e80ff', color: '#1e80ff' }}
          >
            登录领矿石
          </Button>
        </div>
      </div>
      <div className="flex h-[132] flex-col items-center bg-[#1e80ff]">
        <Input
          className="mt-6 mb-4 w-2/5 rounded-xs border-0 p-1.5 text-stone-950"
          prefix={
            <Dropdown menu={{ items }}>
              <Image
                src="/icon-google.png"
                alt="google"
                className="mr-4 cursor-pointer"
                width={28}
                height={28}
              />
            </Dropdown>
          }
          placeholder="输入关键字搜索"
        />
        <ul className="flex w-2/5 list-none flex-row items-center justify-center text-white">
          <li className="mr-4 text-xs whitespace-nowrap">快捷导航</li>
          {navs.map((item, index) => (
            <li
              key={index}
              className="mr-4 cursor-pointer rounded-2xl bg-blue-400 pr-2 pl-1"
            >
              <a
                href={item.link}
                target="_blank"
                className="flex flex-row text-white"
              >
                <Image
                  src={item.icon}
                  alt={item.text}
                  height={20}
                  width={20}
                  className="rounded-[50%] object-contain"
                />
                <span className="p-1 text-xs whitespace-nowrap">
                  {item.text}
                </span>
              </a>
            </li>
          ))}
          <li>
            <Button
              shape="circle"
              icon={<EllipsisOutlined className="text-xs" />}
              className="border-0 bg-blue-400 text-white"
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-1 flex-row bg-[#f4f5f5] p-[16]">
        <div className="w-[321] bg-[#ffff]">3</div>1
        <div className="mr-[16] ml-[16] flex-1 bg-[#ffff]">4</div>
        <div className="w-[321] bg-[#ffff]">5</div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return withTheme(<Home />)
}

export default HomePage
