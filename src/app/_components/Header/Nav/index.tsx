'use client'

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { usePathname } from 'next/navigation'

import { Site } from '../../../../payload/payload-types'
import { useTitle } from '../../../_providers/Context/Title/titleContext'
import { CMSLink } from '../../Link'

type headerNavProps = {
  siteSettings: Site
}

export const HeaderNav = ({ siteSettings }: headerNavProps) => {
  const navItems = siteSettings && siteSettings.navItems ? siteSettings.navItems : []
  const { title } = useTitle()
  const [menuOpen, setMenuOpen] = useState(false)

  const navAnimation = useSpring({
    right: menuOpen ? '0%' : '-100%',
    config: { tension: 170, friction: 26 },
  })

  return (
    <nav role="navigation" aria-label="Main menu" className="flex static">
      <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl">
        menu
      </button>
      <animated.div
        style={navAnimation}
        className="fixed w-fit h-full top-0 right-0 z-20 bg-zinc-700 md:relative md:left-0 md:bg-transparent"
      >
        <ul className="md:flex md:flex-row gap-4 text-2xl">
          {navItems.map(({ link }, i) => {
            link.label = link.label.toLowerCase()
            return (
              <li key={i}>
                <div
                  className={` pl-10 pr-32 md:px-0 ${i === 0 && 'pt-6 md:pt-0'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <CMSLink
                    {...link}
                    className={`border-none last:pr-0 last:mr-0 transition-all ${
                      title.toLowerCase() === link.label.toLowerCase()
                        ? 'underline dark:underline underline-offset-[14px] dark:text-white'
                        : ''
                    } hover:underline hover:underline-offset-[14px] dark:hover:text-white`}
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
          menuOpen ? 'fixed w-full h-full top-0 left-0 z-10 backdrop-blur-sm' : 'hidden'
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </nav>
  )
}
