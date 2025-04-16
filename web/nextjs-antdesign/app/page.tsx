'use client'
import withTheme from '@/theme'
import {
  DislikeOutlined,
  DownOutlined,
  EllipsisOutlined,
  LayoutFilled,
  LikeOutlined,
  MergeFilled,
  MessageOutlined,
  MoonFilled,
  MoreOutlined,
  RedoOutlined,
  SettingFilled,
  StarFilled,
} from '@ant-design/icons'
import {
  App,
  Button,
  Card,
  Divider,
  Dropdown,
  Empty,
  Input,
  List,
  Select,
  Skeleton,
  Space,
  Spin,
} from 'antd'
import Image from 'next/image'
import { useRequest } from 'ahooks'
import {
  getArticlePageData,
  getGithubProjectPageData,
  getPostPageData,
} from '@/services'
import { Fragment, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GithubProjectType, ArticleType, PostType } from '@/types/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  JOB_TYPE,
  POST_CATEGORIES,
  QUICK_NAVS,
  SEARCH_SITE,
} from '@/lib/constant'
import SiteSelect from '@/components/site-select'
import LanguageSelect from '@/components/language-select'
import HoverIcon from '@/components/hover-icon'

dayjs.extend(relativeTime)

function Home() {
  const { message } = App.useApp()

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
    <div className="flex min-h-screen flex-col bg-[#f4f5f5]">
      <div className="flex h-[54] flex-row bg-[#ffffff] pr-[24] pl-[24]">
        <Image
          src="/logo.svg"
          alt=""
          className="mr-4"
          height={54}
          width={112}
        />

        <div className="flex flex-row items-center justify-center">
          <Button type="link" style={{ color: '#90a1b9' }}>
            课程
          </Button>
          <Button type="link" style={{ color: '#90a1b9' }}>
            APP
          </Button>
          <Button type="link" style={{ color: '#90a1b9' }}>
            会员
          </Button>
        </div>
        <div className="ml-auto flex flex-row items-center justify-center">
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{
              items: JOB_TYPE.map((item) => {
                return {
                  label: item.title,
                  key: item.name,
                }
              }),
              style: { padding: '4px' },
            }}
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
          className="mt-6 mb-4 rounded-xs border-0 p-1.5 text-stone-950"
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
          <li className="mr-4 text-sm whitespace-nowrap">快捷导航</li>
          {QUICK_NAVS.map((item, index) => (
            <li
              key={index}
              className="mr-4 cursor-pointer rounded-2xl bg-blue-400 pr-2 pl-1"
            >
              <a
                href={item.link}
                target="_blank"
                className="flex flex-row"
                style={{ color: '#ffff' }}
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
              style={{ width: '24px', height: '24px', minWidth: '24px' }}
              icon={<EllipsisOutlined className="text-xs" />}
            />
          </li>
        </ul>
      </div>
      <div className="flex flex-1 flex-row overflow-hidden bg-[#f4f5f5] pt-4 pr-4 pl-4">
        {/*
          左侧
         */}
        <div className="w-[400] bg-[#ffff]">
          <div className="mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4">
            <div className="flex flex-row items-center">
              <Image
                src="/header-icon-juejin.svg"
                alt=""
                height={28}
                width={28}
                className="mr-2"
              />
              <Select
                defaultValue={POST_CATEGORIES[0]}
                style={{ width: 120, backgroundColor: '#1e80ff' }}
                options={POST_CATEGORIES.map((item, index) => ({
                  value: index,
                  label: item,
                }))}
                onSelect={() => {
                  setArticleData([])
                  articleApi.run()
                }}
              />
            </div>
            <div className="flex flex-row items-center">
              <Button
                type="link"
                style={{ color: '#90a1b9', padding: '0 4px' }}
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
                type="link"
                style={{ padding: '0 4px' }}
                onClick={() => {
                  setArticleData([])
                  articleApi.run()
                }}
              >
                最新
              </Button>
            </div>
          </div>
          <div
            id="articleScrollableDiv"
            className="scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#f4f5f5]"
            style={{
              height: 'calc(100vh - 54px - 132px - 44px - 8px - 16px)',
              overflowY: 'auto',
              width: '412px',
            }}
          >
            {articleData.length == 0 && articleApi.loading && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Spin size="large" />
              </div>
            )}
            {articleData.length == 0 && !articleApi.loading && (
              <Empty className="mt-[50%]" />
            )}
            {articleData.length > 0 && (
              <InfiniteScroll
                dataLength={articleData.length}
                next={articleApi.run}
                hasMore={articleData.length < articleTotal}
                loader={<Skeleton active style={{ padding: '12px' }} />}
                endMessage={<Divider plain>已全部加载完成 🤐</Divider>}
                scrollableTarget="articleScrollableDiv"
              >
                <List
                  dataSource={articleData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      className="mb-2 flex cursor-pointer flex-col hover:bg-sky-100"
                      style={{
                        border: 0,
                        padding: '12px',
                        alignItems: 'stretch',
                      }}
                    >
                      <div title={item.title} className="text-black">
                        {item.title.length > 25
                          ? `${item.title.substring(0, 25)}...`
                          : item.title}
                      </div>
                      <div className="mt-1 flex flex-row items-center text-slate-400">
                        {item.categories.map((category, index) => (
                          <Fragment key={index}>
                            <div className="text-xs">{category}</div>
                            {index != item.categories.length - 1 ? (
                              <div className="mx-1.5 size-[2] rounded-[50%] bg-gray-400"></div>
                            ) : (
                              <></>
                            )}
                          </Fragment>
                        ))}
                        <div className="ml-1.5 text-xs">
                          {dayjs().to(dayjs(item.publishTime))}
                        </div>
                        <div className="ml-auto text-xs">
                          赞 {item.likeCount}
                        </div>
                        <div className="mx-1.5 size-[2] rounded-[50%] bg-gray-400" />
                        <div className="text-xs">评论 {item.commentCount}</div>
                        <div className="ml-2 text-xs">
                          <EllipsisOutlined />
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            )}
          </div>
        </div>
        {/*
          中间
         */}
        <div className="mr-[12] ml-[12] min-w-[420] flex-1 bg-[#ffff]">
          <div className="mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div>
                <SiteSelect />
              </div>
              <div>
                <LanguageSelect />
              </div>
            </div>
          </div>
          <div
            id="githubProjectScrollableDiv"
            className="scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#fff] pr-2 pl-2"
            style={{
              height: 'calc(100vh - 54px - 132px - 44px - 8px - 16px)',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {githubProjectData.length == 0 && articleApi.loading && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Spin size="large" />
              </div>
            )}
            {githubProjectData.length == 0 && !articleApi.loading && (
              <Empty className="mt-[50%]" />
            )}
            {githubProjectData.length > 0 && (
              <InfiniteScroll
                style={{ overflow: 'hidden' }}
                dataLength={githubProjectData.length}
                next={githubProjectApi.run}
                hasMore={githubProjectData.length < githubProjectTotal}
                loader={<Skeleton active style={{ padding: '12px' }} />}
                endMessage={<Divider plain>已全部加载完成 🤐</Divider>}
                scrollableTarget="githubProjectScrollableDiv"
              >
                <List
                  grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 3,
                  }}
                  dataSource={githubProjectData}
                  renderItem={(item) => (
                    <List.Item
                      className="cursor-pointer bg-slate-50 hover:bg-sky-100"
                      style={{ padding: '12px', marginBottom: '8px' }}
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        className="mb-4 block text-lg font-semibold"
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
                          <div className="mr-2 size-2 rounded-full bg-amber-400"></div>
                          {item.language}
                        </div>
                      </Space>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            )}
          </div>
        </div>
        <div className="w-[321] bg-[#f4f5f5]">
          <div className="mb-3 bg-[#ffff]">
            <div className="mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4 text-base">
              快捷工具
            </div>
            <div className="flex flex-row justify-around p-2">
              <HoverIcon
                src="/icon-ip-lookup-normal.svg"
                hoverSrc="/icon-ip-lookup-hover.svg"
                text="IP查询"
              />
              <HoverIcon
                src="/icon-timestamp-tool-normal.svg"
                hoverSrc="/icon-timestamp-tool-hover.svg"
                text="时间戳"
              />
              <HoverIcon
                src="/icon-translate-tool-normal.svg"
                hoverSrc="/icon-translate-tool-hover.svg"
                text="翻译"
              />
              <HoverIcon
                src="/icon-qrcode-tool-normal.svg"
                hoverSrc="/icon-qrcode-tool-hover.svg"
                text="二维码"
              />
              <HoverIcon
                src="/icon-note-tool-normal.svg"
                hoverSrc="/icon-note-tool-hover.svg"
                text="笔记"
              />
            </div>
          </div>
          <div className="flex-1 bg-[#ffff]">
            <div className="mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4">
              <div className="text-base">沸点</div>
              <div className="flex flex-row items-center">
                <Button
                  type="link"
                  style={{ color: '#90a1b9', padding: '0 4px' }}
                >
                  热度
                </Button>
                <Divider type="vertical" style={{ height: '24px' }} />
                <Button type="link" style={{ padding: '0 4px' }}>
                  最新
                </Button>
              </div>
            </div>
            <div
              id="postScrollableDiv"
              style={{
                height:
                  'calc(100vh - 54px - 132px - 16px - 130px - 12px - 44px - 1px - 8px)',
                width: '330px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
              className="scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#f4f5f5]"
            >
              {postData.length == 0 && postApi.loading && (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <Spin size="large" />
                </div>
              )}
              {postData.length == 0 && !postApi.loading && (
                <Empty className="mt-[50%]" />
              )}
              {postData.length > 0 && (
                <InfiniteScroll
                  style={{ overflow: 'hidden' }}
                  dataLength={postData.length}
                  next={postApi.run}
                  hasMore={postData.length < postTotal}
                  loader={<Skeleton active style={{ padding: '12px' }} />}
                  endMessage={<Divider plain>已全部加载完成 🤐</Divider>}
                  scrollableTarget="postScrollableDiv"
                >
                  <List
                    dataSource={postData}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        className="flex flex-col"
                        style={{
                          padding: '12px',
                          alignItems: 'stretch',
                          borderBottom: '0px',
                        }}
                      >
                        <div title={item.content} className="mb-2 text-black">
                          {item.content.length > 40
                            ? `${item.content.substring(0, 40)}...`
                            : item.content}
                        </div>
                        <div className="flex flex-row justify-between text-slate-400">
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
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  return withTheme(<Home />)
}

export default HomePage
