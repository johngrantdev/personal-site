'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from './Auth'
import { MenuOpenProvider } from './Context/menuOpenContext'
import { MouseProvider } from './Context/mouseContext'
import { PageProvider } from './Context/pageContext'
import { ScreenProvider } from './Context/screensContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <ScreenProvider>
          <PageProvider>
            <MenuOpenProvider>
              <MouseProvider>{children}</MouseProvider>
            </MenuOpenProvider>
          </PageProvider>
        </ScreenProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
