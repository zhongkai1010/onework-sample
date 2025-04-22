'use client'

import DarkProvider from '@/components/provider-dark'
import ThemeProvider from '@/components/provider-theme'

export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <DarkProvider>
      <ThemeProvider> {children}</ThemeProvider>
    </DarkProvider>
  )
}
