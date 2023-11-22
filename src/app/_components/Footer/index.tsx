import React from 'react'
import Link from 'next/link'

import { Footer } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import { CMSLink } from '../Link'
import { Padding } from '../Padding'
import { ThemeSelector } from '../ThemeSelector'

// import classes from './index.module.scss'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the footer without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  const navItems = footer?.navItems || []

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full">
      <Padding className="flex items-center justify-center flex-wrap h-16 gap-x-3 gap-y-6">
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
        <nav>
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
        </nav>
        <div className="flex gap-10 items-center flex-wrap opacity-100 transition-opacity visible">
          John Grant &copy; {currentYear}
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
            href="https://github.com/jayelg/johngrant-dev"
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
