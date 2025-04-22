import { DarkContext } from '@/hooks/useDark'
import React, { ReactNode, useState } from 'react'

const DarkProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState<boolean>(false)

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  )
}

export default DarkProvider
