import type { Metadata } from 'next'
import React from 'react'
import { Poppins, JetBrains_Mono } from 'next/font/google'

import { cn } from '@/utilities/ui'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { PageContainer } from '@/components/PageContainer'
import { Header } from '@/Header/Component'

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
  const { isEnabled } = await draftMode()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(poppins.variable, jetbrainsMono.variable)}
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <PageContainer>
            <div className="flex flex-col h-full">
              {children}
              <Footer />
            </div>
          </PageContainer>
          <div className="fixed w-full h-full top-0 left-0 bg-gradient-to-tr from-zinc-950 to-zinc-700 -z-10" />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
