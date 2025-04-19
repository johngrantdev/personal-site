'use client'

import Link from 'next/link'

import { Site } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { PageMargin } from '@/components/PageMargin'
import { ThemeSelector } from '@/components/ThemeSelector'

// import classes from './index.module.scss'

type FooterProps = {
  siteSettings: Site
}

export function FooterClient({ siteSettings }: FooterProps) {
  const navItems = siteSettings?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-zinc-600 dark:bg-zinc-950 transition-colors duration-500 text-zinc-300 mt-10">
      <PageMargin className="flex items-center justify-between flex-wrap gap-x-3 gap-y-6 py-12">
        <nav className="flex flex-col gap-y-3">
          {siteSettings ? siteSettings.siteTitle : 'title'} &copy; {currentYear}
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink key={i} {...link} className="hover:underline hover:underline-offset-4" />
            )
          })}
        </nav>
        <div className="flex gap-10 items-center flex-wrap opacity-100 transition-opacity visible">
          <div className="flex flex-wrap">
            Built with&nbsp;
            <Link
              className="hover:underline hover:underline-offset-4"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              NextJS
            </Link>
            ,&nbsp;
            <Link
              className="hover:underline hover:underline-offset-4"
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              PayloadCMS
            </Link>
            &nbsp;and&nbsp;
            <Link
              className="hover:underline hover:underline-offset-4"
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TailwindCSS
            </Link>
          </div>
          <CMSLink
            className="hover:underline hover:underline-offset-4"
            ref={{
              relationTo: 'pages',
              value: 'https://github.com/johngrantdev/personal-site'
            }}
            newTab
          >
            Source Code
          </CMSLink>
          <ThemeSelector />
        </div>
      </PageMargin>
    </footer>
  )
}
