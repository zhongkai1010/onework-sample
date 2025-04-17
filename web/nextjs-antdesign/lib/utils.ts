import { generate } from '@ant-design/colors'

export const setPrimaryColor = (color: string) => {
  // 设置全局 CSS 变量
  setRootCssVariable('--color-primary', color)
  const colors = generate(color)
  for (let i = 0; i < colors.length; i++) {
    setRootCssVariable(`--color-primary-${i == 0 ? 50 : i * 100}`, colors[i])
  }
}

export const setDarkColor = (color: string, bgcolor: string) => {
  // 设置全局 CSS 变量
  setRootCssVariable('--color-dark', bgcolor)
  const colors = generate(color, {
    theme: 'dark',
    backgroundColor: bgcolor,
  })
  for (let i = 0; i < colors.length; i++) {
    setRootCssVariable(`--color-dark-${i == 0 ? 50 : i * 100}`, colors[i])
  }
}

export const setRootCssVariable = (key: string, value: string) => {
  // 设置全局 CSS 变量
  document.documentElement.style.setProperty(key, value)
}
