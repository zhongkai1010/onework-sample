import { generate } from '@ant-design/colors'
import { DEFAULT_DARK_FONT_COLOR } from '@/lib/constant'

export const setPrimaryCssVariable = (color: string) => {
  setRootCssVariable('--color-primary', color)
  const colors = generate(color, {})
  setColorCssVariable('primary', colors)
}

export const setDarkCssVariable = (color: string) => {
  setRootCssVariable('--color-dark', color)
  setRootCssVariable('--color-dark-font', DEFAULT_DARK_FONT_COLOR)
  const colors = generate(color)
  setColorCssVariable('dark', colors)
}

export const setRootCssVariable = (key: string, value: string) => {
  // 设置全局 CSS 变量
  document.documentElement.style.setProperty(key, value)
}

export const setColorCssVariable = (name: string, colors: Array<string>) => {
  for (let i = 0; i < colors.length; i++) {
    setRootCssVariable(`--color-${name}-${i == 0 ? 50 : i * 100}`, colors[i])
  }
}
