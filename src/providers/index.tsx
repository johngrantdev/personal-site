import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { PageProvider } from './Context/pageContext'
import { ScreenProvider } from './Context/screensContext'
import { MenuOpenProvider } from './Context/menuOpenContext'
import { MouseProvider } from './Context/mouseContext'

// remove header theme provider as ThemeProvider provides it

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      {/* <PlausibleProvider
        domain={process.env.PLAUSIBLE_SITE_ID}
        customDomain={process.env.PLAUSIBLE_HOST}
        selfHosted
      > */}
      <HeaderThemeProvider> 
        <ScreenProvider>
          <PageProvider>
            <MenuOpenProvider>
              <MouseProvider>{children}</MouseProvider>
            </MenuOpenProvider>
          </PageProvider>
        </ScreenProvider>
      </HeaderThemeProvider>
      {/* </PlausibleProvider> */}
    </ThemeProvider>
  )
}