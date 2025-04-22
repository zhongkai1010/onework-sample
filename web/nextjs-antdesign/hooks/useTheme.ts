import { THEME_COLOR_STORE_KEY } from '@/lib/constant'
import { setPrimaryCssVariable } from '@/lib/utils'
import { createContext, useContext, useEffect } from 'react'

export type ThemeContextType = {
  themeColor: string
  fontColor: string
  setThemeColor: (color: string) => void
  setFontColor: (color: string) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useDark 必须在 <ThemeProvider> 内使用')
  }
  const { setThemeColor, setFontColor, themeColor } = context

  useEffect(() => {
    setThemeColor(themeColor)
    setPrimaryCssVariable(themeColor)
    setFontColor(themeColor)
  }, [themeColor])

  useEffect(() => {
    const cacheThemeColor = localStorage.getItem(THEME_COLOR_STORE_KEY)
    if (cacheThemeColor) {
      setThemeColor(cacheThemeColor)
    }
  }, [])

  return context
}
