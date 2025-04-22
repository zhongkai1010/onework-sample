import { createContext, useContext } from 'react'

export type LayoutContextType = {
  mode: 'classic' | 'browse' | 'tool'
  setMode: (mode: 'classic' | 'browse' | 'tool') => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
)

export const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context) {
    throw new Error('useDark 必须在 <Layoutrovider> 内使用')
  }
  return context
}
