import React from 'react'
import { Metadata } from 'next'
import { JetBrains_Mono, Poppins } from 'next/font/google'

import { Site } from '../payload-types'
import { fetchSiteSettings } from './_api/fetchGlobals'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { PageContainer } from './_components/PageContainer'
import { TailwindBreakpoints } from './_components/TailwindBreakpoints'
import { Providers } from './_providers'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-poppins',
})

const jetbrainsMono = JetBrains_Mono({
  display: 'swap',
  weight: '300',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let siteSettings: Site | null = null

  try {
    siteSettings = await fetchSiteSettings()
  } catch (error) {}

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {
          siteSettings.plausible.enabled && <script defer data-domain={env.} src="https://plausible.johngrant.dev/js/script.js"></script>
        }
      </head>
      <body>
        <Providers>
          <Header siteSettings={siteSettings} />
          <PageContainer>
            <div className="flex flex-col h-full">
              {children}
              <Footer siteSettings={siteSettings} />
              {/* <TailwindBreakpoints /> */}
            </div>
          </PageContainer>
          <div className="fixed w-full h-full top-0 left-0 bg-gradient-to-tr from-zinc-950 to-zinc-700 -z-10" />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}
