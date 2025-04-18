'use client'
import CardInfiniteScroll from '@/components/card-infinite-scroll'
import IconHover from '@/components/icon-hover'
import SelectLanguage from '@/components/select-language'
import SelectSite from '@/components/select-site'
import SwitchMode from '@/components/switch-mode'
import SwitchTheme from '@/components/switch-theme'
import {
  DEFAULT_DARK_COLOR,
  POST_CATEGORIES,
  QUICK_NAVS,
  SEARCH_SITE,
} from '@/lib/constant'
import {
  getArticlePageData,
  getGithubProjectPageData,
  getPostPageData,
} from '@/services'
import withTheme, { ThemeContext } from '@/theme'
import { ArticleType, GithubProjectType, PostType } from '@/types/api'
import {
  EllipsisOutlined,
  LayoutFilled,
  LikeOutlined,
  MergeFilled,
  MessageOutlined,
  MoonFilled,
  RedoOutlined,
  SettingFilled,
  StarFilled,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import {
  App,
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Select,
  Space,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { Fragment, useContext, useState } from 'react'

dayjs.extend(relativeTime)

function Home() {
  const { message } = App.useApp()
  const { fontColor, dark, setDark, themeColor } = useContext(ThemeContext)

  const [articleData, setArticleData] = useState<Array<ArticleType>>([])
  const [articleTotal, setArticleTotal] = useState(0)

  const articleApi = useRequest(getArticlePageData, {
    onSuccess: (res) => {
      const result = res.data

      if (result.code === 200) {
        setArticleTotal(result.data.total)
        setArticleData(articleData.concat(result.data.data))
      } else {
        message.error(result.msg)
      }
    },
  })

  const [githubProjectData, setGithubProjectData] = useState<
    Array<GithubProjectType>
  >([])
  const [githubProjectTotal, setGithubProjectTotal] = useState(0)
  const githubProjectApi = useRequest(getGithubProjectPageData, {
    onSuccess: (res) => {
      const result = res.data
      if (result.code === 200) {
        setGithubProjectTotal(result.data.total)
        setGithubProjectData(githubProjectData.concat(result.data.data))
      } else {
        message.error(result.msg)
      }
    },
  })

  const [postData, setPostData] = useState<Array<PostType>>([])
  const [postTotal, setPostTotal] = useState(0)
  const postApi = useRequest(getPostPageData, {
    onSuccess: (res) => {
      const result = res.data
      if (result.code === 200) {
        setPostTotal(result.data.total)
        setPostData(postData.concat(result.data.data))
      } else {
        message.error(result.msg)
      }
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <div className="dark:bg-dark-400 flex h-[54] flex-row bg-[#ffffff] pr-[24] pl-[24]">
        <Image
          src="/logo.svg"
          alt=""
          className="mr-8"
          height={54}
          width={112}
        />
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
      <div className="bg-primary dark:bg-dark flex h-[132] flex-col items-center">
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
        <ul className="flex w-2/5 list-none flex-row items-center justify-center text-white">
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
      <div className="dark:bg-dark flex flex-1 flex-row overflow-hidden bg-[#f4f5f5] pt-4 pr-4 pl-4">
        <CardInfiniteScroll
          id="articleScrollableDiv"
          total={articleTotal}
          data={articleData}
          api={articleApi}
          className="mr-[12] w-[400]"
          classNames={{
            body: 'scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#f4f5f5] dark:scrollbar-track-dark dark:scrollbar-thumb-dark-400',
          }}
          styles={{
            body: {
              height: 'calc(100vh - 54px - 132px - 44px - 8px - 16px)',
              overflowY: 'auto',
              width: '412px',
            },
            item: {
              border: 0,
              padding: 0,
              alignItems: 'stretch',
            },
          }}
          title={
            <>
              <Image
                src="/header-icon-juejin.svg"
                alt=""
                height={28}
                width={28}
                className="mr-2"
              />
              <Select
                defaultValue={POST_CATEGORIES[0]}
                style={{
                  width: 120,
                  backgroundColor: dark ? DEFAULT_DARK_COLOR : themeColor,
                }}
                options={POST_CATEGORIES.map((item, index) => ({
                  value: index,
                  label: item,
                }))}
                onSelect={() => {
                  setArticleData([])
                  articleApi.run()
                }}
              />
            </>
          }
          extra={
            <>
              <Button
                color="primary"
                variant="link"
                icon={<RedoOutlined />}
                onClick={() => {
                  setArticleData([])
                  articleApi.run()
                }}
              >
                推荐
              </Button>
              <Divider type="vertical" style={{ height: '24px' }} />
              <Button
                color="default"
                variant="link"
                style={{ padding: '0 4px' }}
                onClick={() => {
                  setArticleData([])
                  articleApi.run()
                }}
              >
                最新
              </Button>
            </>
          }
          renderItem={(item) => (
            <div className="hover:bg-primary/10 dark:text-dark-font mb-2 flex h-full w-full cursor-pointer flex-col p-3">
              <div title={item.title}>
                {item.title.length > 25
                  ? `${item.title.substring(0, 25)}...`
                  : item.title}
              </div>
              <div className="dark:text-dark-font/50 mt-1 flex flex-row items-center text-black/60">
                {item.categories.map((category, index) => (
                  <Fragment key={index}>
                    <div className="text-xs">{category}</div>
                    {index != item.categories.length - 1 ? (
                      <div className="mx-1.5 size-[2] rounded-[50%] bg-black/60"></div>
                    ) : (
                      <></>
                    )}
                  </Fragment>
                ))}
                <div className="ml-4 text-xs">
                  {dayjs().to(dayjs(item.publishTime))}
                </div>
                <div className="ml-auto text-xs">赞 {item.likeCount}</div>
                <div className="mx-1.5 size-[2] rounded-[50%] bg-black/60" />
                <div className="text-xs">评论 {item.commentCount}</div>
                <div className="ml-2 text-xs">
                  <EllipsisOutlined />
                </div>
              </div>
            </div>
          )}
        />
        <CardInfiniteScroll
          id="githubProjectScrollableDiv"
          className="flex-1"
          total={githubProjectTotal}
          data={githubProjectData}
          api={githubProjectApi}
          classNames={{
            body: 'scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#ffff] dark:scrollbar-track-dark/10 dark:scrollbar-thumb-dark pr-2 pl-2',
          }}
          styles={{
            body: {
              height: 'calc(100vh - 54px - 132px - 44px - 8px - 16px)',
              overflowY: 'auto',
              overflowX: 'hidden',
            },
            item: {
              marginBottom: '8px',
            },
          }}
          title={<SelectSite />}
          extra={<SelectLanguage />}
          listProps={{
            grid: {
              gutter: 8,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 3,
            },
          }}
          renderItem={(item) => (
            <div className="bg-primary/5 hover:bg-primary/10 dark:bg-dark/10 dark:text-dark-font cursor-pointer p-2">
              <a
                href={item.url}
                target="_blank"
                className="mb-4 block text-lg font-semibold"
                style={{ color: fontColor }}
              >{`${item.author} / ${item.project}`}</a>
              <div className="h-[80]" title={item.description}>
                {item.description.length > 45
                  ? `${item.description.substring(0, 45)}...`
                  : item.description}
              </div>
              <Space direction="horizontal" size="large">
                <div className="flex flex-row items-center text-xs">
                  <StarFilled className="mr-2" />
                  <span> {item.star}</span>
                </div>
                <div className="flex flex-row items-center text-xs">
                  <MergeFilled className="mr-2" />
                  <span> {item.star}</span>
                </div>
                <div className="flex flex-row items-center text-xs">
                  <div className="bg-primary mr-2 size-2 rounded-full"></div>
                  {item.language}
                </div>
              </Space>
            </div>
          )}
        />
        <div className="dark:bg-dark ml-2 w-[321] bg-[#f4f5f5]">
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
          <CardInfiniteScroll
            id="postScrollableDiv"
            total={postTotal}
            data={postData}
            api={postApi}
            title={<>沸点</>}
            extra={
              <>
                <Button
                  color="primary"
                  variant="link"
                  style={{ padding: '0 4px' }}
                >
                  热度
                </Button>
                <Divider type="vertical" style={{ height: '24px' }} />
                <Button
                  color="default"
                  variant="link"
                  style={{ padding: '0 4px' }}
                >
                  最新
                </Button>
              </>
            }
            styles={{
              item: {
                border: 0,
                padding: 0,
                alignItems: 'stretch',
              },
              body: {
                height:
                  'calc(100vh - 54px - 132px - 16px - 130px - 12px - 44px - 1px - 8px)',
                width: '330px',
                overflowY: 'auto',
                overflowX: 'hidden',
              },
            }}
            classNames={{
              body: 'scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#f4f5f5] dark:scrollbar-track-dark/10 dark:scrollbar-thumb-dark',
            }}
            renderItem={(item) => (
              <div className="hover:bg-primary/10 flex cursor-pointer flex-col p-3">
                <div
                  title={item.content}
                  className="dark:text-dark-font mb-2 text-black"
                >
                  {item.content.length > 40
                    ? `${item.content.substring(0, 40)}...`
                    : item.content}
                </div>
                <div className="dark:text-dark-font flex flex-row justify-between text-black/60">
                  <div>{item.userName}</div>
                  <Space className="ml-auto flex flex-row items-center">
                    <Space>
                      <LikeOutlined />
                      <span>{item.likeCount}</span>
                    </Space>
                    <Space>
                      <MessageOutlined />
                      <span>{item.replyCount}</span>
                    </Space>
                    <Space>
                      <EllipsisOutlined />
                    </Space>
                  </Space>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return withTheme(<Home />)
}

export default HomePage
