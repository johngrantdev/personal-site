import React from 'react'
import Link from 'next/link'

import { Site } from '../../../payload/payload-types'
import { CMSLink } from '../Link'
import { Padding } from '../Padding'
import { ThemeSelector } from '../ThemeSelector'

// import classes from './index.module.scss'

type FooterProps = {
  siteSettings: Site
}

export async function Footer({ siteSettings }: FooterProps) {
  const navItems = siteSettings?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-zinc-600 dark:bg-zinc-950 text-zinc-300 mt-10">
      <Padding className="flex items-center justify-between flex-wrap gap-x-3 gap-y-6">
        {/* <Link href="/">
          <picture>
            <img
              alt="Payload Logo"
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
              className="w-36 dark:invert"
            />
          </picture>
        </Link> */}
        {/* this nav is for cms defined links */}
        <nav className="flex flex-col gap-y-3">
          {siteSettings ? siteSettings.siteTitle : 'title'} &copy; {currentYear}
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink key={i} {...link} className="hover:underline hover:underline-offset-4" />
            )
          })}
        </nav>
        <div className="flex gap-10 items-center flex-wrap opacity-100 transition-opacity visible">
          <div>
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
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TailwindCSS
            </Link>
            &nbsp;and&nbsp;
            <Link
              className="hover:underline hover:underline-offset-4"
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Payload
            </Link>
          </div>
          <Link
            className="hover:underline hover:underline-offset-4"
            href={
              siteSettings ? siteSettings.siteSourceLink : 'https://github.com/jayelg/personal-site'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </Link>
          <ThemeSelector />
        </div>
      </Padding>
    </footer>
  )
}
