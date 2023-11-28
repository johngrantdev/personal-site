import React from 'react'
import { Metadata } from 'next'
import { JetBrains_Mono, Poppins } from 'next/font/google'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <main className="flex flex-col min-h-screen font-sans text-zinc-600 bg-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 transition-all duration-200">
            <AdminBar />
            {/* @ts-expect-error */}
            <Header />
            <div className="flex-grow">{children}</div>
            {/* @ts-expect-error */}
            <Footer />
          </main>
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
