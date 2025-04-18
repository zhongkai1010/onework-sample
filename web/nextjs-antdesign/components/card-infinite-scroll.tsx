import React, { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import { Divider, Empty, List, ListProps, Skeleton, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props<T> {
  className?: string
  classNames?: { header?: string; body?: string; item?: string }
  styles?: {
    header?: CSSProperties
    body?: CSSProperties
    item?: CSSProperties
  }
  title?: ReactNode
  extra?: ReactNode
  id?: string
  api: any
  data: Array<T>
  total: number
  renderItem: (item: T) => ReactNode
  listProps?: ListProps<T>
}

const CardInfiniteScroll = <T,>(props: Props<T>) => {
  const { id, className, classNames, styles, data, api, total, renderItem } =
    props
  return (
    <div className={clsx('dark:bg-dark-400 bg-[#ffff]', className)}>
      <div
        className={clsx(
          'dark:border-b-dark mb-2 flex h-[44] flex-row items-center justify-between border-b-1 border-solid border-slate-200 px-4',
          classNames?.header
        )}
      >
        <div className="flex flex-row items-center">{props.title}</div>
        <div className="flex flex-row items-center">{props.extra}</div>
      </div>
      <div id={id} className={clsx(classNames?.body)} style={styles?.body}>
        {data.length == 0 && api.loading && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Spin size="large" />
          </div>
        )}
        {data.length == 0 && !api.loading && <Empty className="mt-[50%]" />}
        {data.length > 0 && (
          <InfiniteScroll
            dataLength={data.length}
            next={api.run}
            hasMore={data.length < total}
            loader={<Skeleton active style={{ padding: '12px' }} />}
            endMessage={<Divider plain>已全部加载完成 🤐</Divider>}
            scrollableTarget={id}
            style={{
              overflowX: 'hidden',
            }}
          >
            <List
              {...props.listProps}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  style={styles?.item}
                  className={clsx(classNames?.item)}
                >
                  {renderItem(item)}
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default CardInfiniteScroll
