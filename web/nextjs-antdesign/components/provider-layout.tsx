import { LayoutContext } from '@/hooks/useLayout'
import React, { ReactNode, useState } from 'react'

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'classic' | 'browse' | 'tool'>('classic')

  return (
    <LayoutContext.Provider value={{ mode, setMode }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
