import { Tooltip, Typography } from 'antd'
import Image from 'next/image'
import { useState } from 'react'

const { Link } = Typography

type Props = {
  src: string
  hoverSrc: string
  className?: string
  text: string
}

const IconHover = (props: Props) => {
  const [hoverState, setHoverState] = useState(false)

  const handleMouseEnter = () => {
    setHoverState(true)
  }

  const handleMouseLeave = () => {
    setHoverState(false)
  }
  return (
    <Tooltip placement="top" title={props.text}>
      <div
        className="flex cursor-pointer flex-col items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={hoverState ? props.hoverSrc : props.src}
          alt={props.text}
          width={36}
          height={36}
          className="mb-1"
        />
        <Link>{props.text}</Link>
      </div>
    </Tooltip>
  )
}

export default IconHover
