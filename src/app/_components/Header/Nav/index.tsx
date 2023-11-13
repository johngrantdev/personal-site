'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { CMSLink } from '../../Link'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className={`flex gap-2 items-center flex-wrap text-2xl`}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} className=" border-none" appearance="none" />
      })}
      {/*
        // Uncomment this code if you want to add a login and account links to the header
        {user && <Link href="/account">Account</Link>}
        {!user && (
          <React.Fragment>
            <Link href="/login">Login</Link>
            <Link href="/create-account">Create Account</Link>
          </React.Fragment>
        )}
      */}
    </nav>
  )
}
