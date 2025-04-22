import { useTheme } from '@/hooks/useTheme'
import { DEFAULT_THEME_COLOR, THEME_COLOR_STORE_KEY } from '@/lib/constant'
import { ColorPicker, ColorPickerProps } from 'antd'

import React, { useEffect, useState } from 'react'

const SwitchTheme = (props: ColorPickerProps) => {
  const { themeColor, setThemeColor } = useTheme()
  const [defaultValue, setDefaultValue] = useState<string | undefined>()

  useEffect(() => {
    const cacheThemeColor = localStorage.getItem(THEME_COLOR_STORE_KEY)
    if (cacheThemeColor) {
      setDefaultValue(cacheThemeColor)
    } else {
      setDefaultValue(DEFAULT_THEME_COLOR)
    }
  }, [])

  return defaultValue ? (
    <ColorPicker
      {...props}
      defaultValue={themeColor}
      size="small"
      className="cursor-pointer text-xl"
      onChangeComplete={(color) => {
        localStorage.setItem(THEME_COLOR_STORE_KEY, color.toHexString())
        setThemeColor(color.toHexString())
      }}
    />
  ) : (
    <></>
  )
}

export default SwitchTheme
