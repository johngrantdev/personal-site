'use client'

import React from 'react'

import { Site } from '@/payload-types'
import { useMenuOpen } from '@/providers/Context/menuOpenContext'
import { usePage } from '@/providers/Context/pageContext'
import { CMSLink } from '@/components/Link'
import { ThemeSelector } from '@/components/ThemeSelector'

type headerNavProps = {
  siteSettings: Site
}

export const HeaderNav = ({ siteSettings }: headerNavProps) => {
  const navItems = siteSettings && siteSettings.navItems ? siteSettings.navItems : []
  const { title, category } = usePage()
  const { menuOpen, setMenuOpen } = useMenuOpen()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav role="navigation" aria-label="Main menu" className="flex static">
      <button onClick={toggleMenu} className={`visible xl:invisible xl:w-0 text-2xl`}>
        menu
      </button>
      <div
        className={`$${
          menuOpen ? 'opacity-100 right-0' : 'opacity-0 -right-full xl:opacity-100 xl:right-auto'
        } absolute w-60 xl:w-auto top-32 xl:top-0 sm:top-40 h-screen xl:h-auto xl:relative xl:left-0 xl:bg-transparent transition-all duration-500`}
      >
        <ul className="xl:flex xl:flex-row text-2xl">
          {navItems.map(({ link }, i) => {
            // Lowercase for comparison like in old site
            const linkLabel = link.label?.toLowerCase?.() ?? '';
            const isActive =
              title?.toLowerCase?.() === linkLabel ||
              (category && category.title?.toLowerCase?.() === linkLabel);
            return (
              <li key={i + 1} style={{ transitionDelay: `${(i + 1) * 300}ms` }}>
                <div onClick={() => setMenuOpen(false)}>
                  <CMSLink
                    {...link}
                    className={`border-none pl-0 xl:pl-4 last:pr-0 last:mr-0 transition-all ${
                      isActive
                        ? 'dark:underline underline underline-offset-[14px] text-white'
                        : ''
                    } hover:underline hover:underline-offset-[14px] dark:hover:text-white`}
                    appearance="default"
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <ThemeSelector className="xl:hidden  pt-6" />
      </div>
    </nav>
  );
};