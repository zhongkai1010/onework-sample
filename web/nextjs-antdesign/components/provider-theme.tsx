import { ThemeContext } from '@/hooks/useTheme'
import { DEFAULT_THEME_COLOR } from '@/lib/constant'
import { ReactNode, useState } from 'react'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR)
  const [fontColor, setFontColor] = useState(DEFAULT_THEME_COLOR)

  return (
    <ThemeContext.Provider
      value={{ fontColor, themeColor, setThemeColor, setFontColor }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
