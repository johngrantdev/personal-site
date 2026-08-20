'use client'
{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'

import { useMenuOpen } from '../../../_providers/Context/menuOpenContext'
import { usePage } from '../../../_providers/Context/pageContext'

type TitleProps = {
  siteTitle: string
}

export function Title(props: TitleProps) {
  const { siteTitle } = props
  const pageContext = usePage()
  const { setMenuOpen } = useMenuOpen()
  const [title, setTitle] = useState('')
  const [fadeTitle, setFadeTitle] = useState(false)
  const [fadeTitleAndPipe, setFadeTitleAndPipe] = useState(true)
  const animationDuration = 150

  useEffect(() => {
    if (pageContext.title === 'Home') {
      setFadeTitleAndPipe(true)
    } else {
      setFadeTitle(true)
    }
    setTimeout(() => {
      if (pageContext.title === 'Home') {
        setTitle('')
        setFadeTitleAndPipe(true)
      } else {
        setTitle(pageContext.title.toLowerCase())
        setFadeTitleAndPipe(false)
        setFadeTitle(false)
      }
    }, animationDuration)
  }, [pageContext.title])

  const fadePageTitle = useSpring({
    opacity: fadeTitle ? 0 : 1,
    config: { duration: animationDuration },
  })

  const fadeTitlePipe = useSpring({
    opacity: fadeTitleAndPipe ? 0 : 1,
    config: { duration: animationDuration },
  })

  return (
    <div className="flex gap-0 md:gap-2 h-12 text-2xl select-none">
      <Link
        onClick={() => setMenuOpen(false)}
        className={`my-auto items-center justify-normal ${title !== '' && 'w-auto'} `}
        href="/"
      >
        {siteTitle.toLowerCase()}
      </Link>{' '}
      <animated.div
        className="my-auto flex gap-0 md:gap-2 invisible w-0 md:visible md:w-auto"
        style={fadeTitlePipe}
      >
        <div>|</div>
        <animated.div style={fadePageTitle}>{title}</animated.div>
      </animated.div>
    </div>
  )
}
