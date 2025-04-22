import { DEFAULT_DARK_COLOR, DEFAULT_DARK_FONT_COLOR } from '@/lib/constant'
import { setDarkCssVariable } from '@/lib/utils'

import { createContext, useContext, useEffect } from 'react'
import { useTheme } from './useTheme'

export type DarkContextType = {
  dark: boolean
  setDark: (dark: boolean) => void
}

export const DarkContext = createContext<DarkContextType | undefined>(undefined)

export const useDark = () => {
  const context = useContext(DarkContext)
  if (!context) {
    throw new Error('useDark 必须在 <DarkProvider> 内使用')
  }
  const { dark } = context
  const { setFontColor, themeColor } = useTheme()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      setDarkCssVariable(DEFAULT_DARK_COLOR)
      setFontColor(DEFAULT_DARK_FONT_COLOR)
    } else {
      document.documentElement.classList.remove('dark')
      setFontColor(themeColor)
    }
  }, [dark])

  return context
}
