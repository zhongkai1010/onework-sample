import { getPostPageData } from '@/services'
import { PostType } from '@/types/api'
import {
  LikeOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { App, Button, Divider, Space } from 'antd'
import React, { useState } from 'react'
import CardInfiniteScroll from '../card-infinite-scroll'

type Props = {}

const PostListCard = (props: Props) => {
  const { message } = App.useApp()

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
    <CardInfiniteScroll
      id="postScrollableDiv"
      total={postTotal}
      data={postData}
      api={postApi}
      title={<>沸点</>}
      extra={
        <>
          <Button color="primary" variant="link" style={{ padding: '0 4px' }}>
            热度
          </Button>
          <Divider type="vertical" style={{ height: '24px' }} />
          <Button color="default" variant="link" style={{ padding: '0 4px' }}>
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
  )
}

export default PostListCard
