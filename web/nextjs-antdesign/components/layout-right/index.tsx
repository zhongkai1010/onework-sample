import React from 'react'
import QuickTools from './quick-tools'
import PostListCard from './post-list-card'
import clsx from 'clsx'
type Props = {
  className?: string
}

const LayoutRight = (props: Props) => {
  return (
    <div className={clsx('dark:bg-dark bg-[#f4f5f5]', props.className)}>
      <QuickTools />
      <PostListCard />
    </div>
  )
}

export default LayoutRight
