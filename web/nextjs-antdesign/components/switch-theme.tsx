import { DEFAULT_THEME, THEME_COLOR_STORE_KEY } from '@/lib/constant'
import { ThemeContext } from '@/theme'
import { ColorPicker, ColorPickerProps } from 'antd'

import { debounce } from 'lodash'
import React, { useContext } from 'react'

const SwitchTheme = (props: ColorPickerProps) => {
  const { themeColor, setThemeColor } = useContext(ThemeContext)

  // 防抖函数
  const handleColorChange = debounce((color) => {
    localStorage.setItem(THEME_COLOR_STORE_KEY, color)
    setThemeColor(color)
  }, 100) // 500ms 的延迟

  return (
    <ColorPicker
      defaultValue={themeColor ?? DEFAULT_THEME}
      size="small"
      className="mr-3 ml-3 cursor-pointer text-xl"
      onChange={(color) => handleColorChange(color.toHexString())}
      
    />
  )
}

export default SwitchTheme
