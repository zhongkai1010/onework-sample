import { getGithubProjectPageData } from '@/services'
import { GithubProjectType } from '@/types/api'
import { StarFilled, MergeFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { message, Space } from 'antd'
import React, { useContext, useState } from 'react'
import CardInfiniteScroll from './card-infinite-scroll'
import SelectLanguage from './select-language'
import SelectSite from './select-site'
import { ThemeContext } from '@/theme'
import clsx from 'clsx'

type Props = {
  className?: string
}

const LayoutMain = (props: Props) => {
  const { fontColor } = useContext(ThemeContext)
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

  return (
    <CardInfiniteScroll
      id="githubProjectScrollableDiv"
      className={clsx(props.className)}
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
          lg: 1,
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
  )
}

export default LayoutMain
