import { useDark } from '@/hooks/useDark'
import { useTheme } from '@/hooks/useTheme'
import { MoonFilled, SunOutlined } from '@ant-design/icons'
import React from 'react'

const SwitchDark = () => {
  const { dark, setDark } = useDark()
  const { fontColor } = useTheme()

  return (
    <>
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
    </>
  )
}

export default SwitchDark
