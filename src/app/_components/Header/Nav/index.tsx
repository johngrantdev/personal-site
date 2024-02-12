'use client'

import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Site } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/Page/pageContext'
import { Button } from '../../Button'
import { CMSLink } from '../../Link'

type headerNavProps = {
  siteSettings: Site
}

export const HeaderNav = ({ siteSettings }: headerNavProps) => {
  const navItems = siteSettings && siteSettings.navItems ? siteSettings.navItems : []
  const { title, category } = usePage()
  const [menuOpen, setMenuOpen] = useState(false)

  const navAnimation = useSpring({
    right: menuOpen ? '0%' : '-100%',
    config: { tension: 170, friction: 26 },
  })

  return (
    <nav role="navigation" aria-label="Main menu" className="flex static">
      <button
        onClick={() => setMenuOpen(true)}
        className={`lg:hidden text-2xl ${menuOpen && 'hidden'}`}
      >
        menu
      </button>
      <animated.div
        style={navAnimation}
        className="fixed w-fit top-0 h-screen lg:h-auto right-0 z-20 bg-zinc-800 lg:relative lg:left-0 lg:bg-transparent"
      >
        <ul className="lg:flex lg:flex-row gap-4 text-2xl">
          <li key={0}>
            <div
              className={`lg:hidden pl-10 pr-32 lg:px-0 pt-6 lg:pt-0`}
              onClick={() => setMenuOpen(false)}
            >
              <Button
                className={`border-none last:pr-0 last:mr-0 transition-all ${
                  title.toLowerCase() === 'home'
                    ? 'underline dark:underline underline-offset-[14px] dark:text-white'
                    : ''
                } hover:underline hover:underline-offset-[14px] dark:hover:text-white `}
                href="/"
                appearance="default"
                label="home"
              />
            </div>
          </li>
          {navItems.map(({ link }, i) => {
            link.label = link.label.toLowerCase()
            return (
              <li key={i + 1}>
                <div className={`pl-10 pr-32 lg:px-0`} onClick={() => setMenuOpen(false)}>
                  <CMSLink
                    {...link}
                    className={`border-none last:pr-0 last:mr-0 transition-all ${
                      title.toLowerCase() === link.label.toLowerCase() ||
                      (category && category.title.toLowerCase() === link.label.toLowerCase())
                        ? 'underline dark:underline underline-offset-[14px] dark:text-white'
                        : ''
                    } hover:underline hover:underline-offset-[14px] dark:hover:text-white `}
                    appearance="default"
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </animated.div>
      <div
        className={`${
          menuOpen
            ? 'fixed w-screen h-screen top-0 left-0 z-100 bg-transparent blur-lg'
            : 'invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </nav>
  )
}
