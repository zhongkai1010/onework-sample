import { POST_CATEGORIES, DEFAULT_DARK_COLOR } from '@/lib/constant'
import { RedoOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Select, Button, Divider, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useContext, useState } from 'react'
import CardInfiniteScroll from './card-infinite-scroll'
import { getArticlePageData } from '@/services'
import { ArticleType } from '@/types/api'
import { useRequest } from 'ahooks'
import Image from 'next/image'

import clsx from 'clsx'
import { useDark } from '@/hooks/useDark'
import { useTheme } from '@/hooks/useTheme'

type Props = {
  className?: string
}

const LayoutLeft = (props: Props) => {
  const { dark } = useDark()
  const { themeColor } = useTheme()
  const [articleData, setArticleData] = useState<Array<ArticleType>>([])
  const [articleTotal, setArticleTotal] = useState<number>(0)

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

  return (
    <CardInfiniteScroll
      id="articleScrollableDiv"
      total={articleTotal}
      data={articleData}
      api={articleApi}
      className={clsx(props.className)}
      classNames={{
        body: 'scrollbar-thin scrollbar-thumb-[#e4e6eb] scrollbar-track-[#f4f5f5] dark:scrollbar-track-dark dark:scrollbar-thumb-dark-400',
      }}
      styles={{
        body: {
          height: 'calc(100vh - 54px - 132px - 44px - 8px - 16px)',
          overflowY: 'auto',
          width: 'calc(100% + 10px)',
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
  )
}

export default LayoutLeft
