'use client'
{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'

import { useTitle } from '../../../_providers/Context/Title/titleContext'

type TitleProps = {
  siteName: string
}

export function Title(props: TitleProps) {
  const { siteName } = props
  const titleContext = useTitle()
  const [title, setTitle] = useState('')
  const [fadeTitle, setFadeTitle] = useState(false)
  const [fadeTitleAndPipe, setFadeTitleAndPipe] = useState(false)
  const animationDuration = 150

  useEffect(() => {
    if (titleContext.title === 'Home') {
      setFadeTitleAndPipe(true)
    } else {
      setFadeTitle(true)
    }
    setTimeout(() => {
      if (titleContext.title === 'Home') {
        setTitle('')
      } else {
        setTitle(titleContext.title.toLowerCase())
        setFadeTitleAndPipe(false)
        setFadeTitle(false)
      }
    }, animationDuration)
  }, [titleContext.title])

  const fadePageTitle = useSpring({
    opacity: fadeTitle ? 0 : 1,
    config: { duration: animationDuration },
  })

  const fadeTitlePipe = useSpring({
    opacity: fadeTitleAndPipe ? 0 : 1,
    config: { duration: animationDuration },
  })

  return (
    <div className="flex h-full text-4xl select-none gap-2">
      <Link className=" justify-normal" href="/">
        {siteName}
      </Link>{' '}
      <animated.div className="flex gap-2" style={fadeTitlePipe}>
        |<animated.div style={fadePageTitle}>{title}</animated.div>
      </animated.div>
    </div>
  )
}
