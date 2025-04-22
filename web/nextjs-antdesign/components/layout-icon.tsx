import { GetProps } from 'antd'
import Icon from '@ant-design/icons'

type CustomIconComponentProps = GetProps<typeof Icon>

export const IconClassicLayout = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ClassicSvg} {...props} />
)

export const IconBrowseLayout = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={BrowseSvg} {...props} />
)

export const IconToolLayout = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ToolSvg} {...props} />
)

const ClassicSvg = () => (
  <svg
    width="88"
    height="51"
    viewBox="0 0 88 51"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <rect width="88" height="51" rx="2" className="fill-primary/20"></rect>
    <rect
      x="3"
      y="3"
      width="82"
      className="fill-white"
      height="4"
      rx="1"
    ></rect>
    <rect
      x="3"
      y="10"
      width="29"
      className="fill-white"
      height="38"
      rx="1"
    ></rect>
    <rect
      x="35"
      y="10"
      className="fill-white"
      width="50"
      height="38"
      rx="1"
    ></rect>
  </svg>
)

const BrowseSvg = () => (
  <svg
    width="88"
    height="51"
    viewBox="0 0 88 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="88" className="fill-primary/20" height="51" rx="2"></rect>
    <rect
      x="3"
      y="3"
      className="fill-white"
      width="82"
      height="4"
      rx="1"
    ></rect>
    <rect
      x="3"
      y="10"
      className="fill-white"
      width="22"
      height="38"
      rx="1"
    ></rect>
    <rect
      x="28"
      y="10"
      className="fill-white"
      width="39"
      height="38"
      rx="1"
    ></rect>
    <rect
      x="70"
      y="10"
      className="fill-white"
      width="15"
      height="38"
      rx="1"
    ></rect>
  </svg>
)

const ToolSvg = () => (
  <svg
    width="88"
    height="51"
    viewBox="0 0 88 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="88" className="fill-primary/20" height="51" rx="2"></rect>
    <rect
      x="3"
      y="3"
      width="82"
      className="fill-white"
      height="4"
      rx="1"
    ></rect>
    <rect
      x="3"
      y="10"
      width="82"
      className="fill-white"
      height="6"
      rx="1"
    ></rect>
    <rect
      x="3"
      y="19"
      width="22"
      className="fill-white"
      height="29"
      rx="1"
    ></rect>
    <rect
      x="28"
      y="19"
      width="39"
      className="fill-white"
      height="29"
      rx="1"
    ></rect>
    <rect
      x="70"
      y="19"
      width="15"
      className="fill-white"
      height="29"
      rx="1"
    ></rect>
  </svg>
)
