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
  return (
    <ThemeProvider attribute="class">
      <PlausibleProvider
        domain={process.env.PLAUSIBLE_SITE_ID}
        customDomain={process.env.PLAUSIBLE_HOST}
        selfHosted
      >
        <AuthProvider>
          <ScreenProvider>
            <PageProvider>
              <MenuOpenProvider>
                <MouseProvider>{children}</MouseProvider>
              </MenuOpenProvider>
            </PageProvider>
          </ScreenProvider>
        </AuthProvider>
      </PlausibleProvider>
    </ThemeProvider>
  )
}
