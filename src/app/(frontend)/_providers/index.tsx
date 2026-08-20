'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '../_providers/Auth'
import { MenuOpenProvider } from './Context/menuOpenContext'
import { MouseProvider } from './Context/mouseContext'
import { PageProvider } from './Context/pageContext'
import { ScreenProvider } from './Context/screensContext'
import PlausibleProvider from 'next-plausible'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const providers = (
    <AuthProvider>
      <ScreenProvider>
        <PageProvider>
          <MenuOpenProvider>
            <MouseProvider>{children}</MouseProvider>
          </MenuOpenProvider>
        </PageProvider>
      </ScreenProvider>
    </AuthProvider>
  )

  return (
    <ThemeProvider attribute="class">
      {process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ? (
        <PlausibleProvider>{providers}</PlausibleProvider>
      ) : (
        providers
      )}
    </ThemeProvider>
  )
}
