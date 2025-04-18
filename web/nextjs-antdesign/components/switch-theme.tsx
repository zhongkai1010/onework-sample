import { DEFAULT_THEME_COLOR, THEME_COLOR_STORE_KEY } from '@/lib/constant'
import { ThemeContext } from '@/theme'
import { ColorPicker, ColorPickerProps } from 'antd'

import React, { useContext, useEffect, useState } from 'react'

const SwitchTheme = (props: ColorPickerProps) => {
  const { themeColor, setThemeColor } = useContext(ThemeContext)
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
      className="mr-3 ml-3 cursor-pointer text-xl"
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
