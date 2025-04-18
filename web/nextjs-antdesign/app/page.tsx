'use client'
import withTheme from '@/theme'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import LayoutHeader from '@/components/layout-header'
import LayoutSearch from '@/components/layout-search'
import LayoutLeft from '@/components/layout-left'
import LayoutMain from '@/components/layout-main'
import LayoutRight from '@/components/layout-right'

dayjs.extend(relativeTime)

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LayoutHeader className="h-[54]" />
      <LayoutSearch className="h-[132]" />
      <div className="dark:bg-dark flex flex-1 flex-row overflow-hidden bg-[#f4f5f5] pt-4 pr-4 pl-4">
        <LayoutLeft className="mr-[12] w-[360]" />
        <LayoutMain className="flex-1" />
        <LayoutRight className="ml-2 w-[321]" />
      </div>
    </div>
  )
}

const HomePage = () => {
  return withTheme(<Home />)
}

export default HomePage
