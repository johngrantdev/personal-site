'use client'
{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect, useState, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useMenuOpen } from '@/providers/Context/menuOpenContext'
import { usePage } from '@/providers/Context/pageContext'

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
  const animationDuration = 300
  const router = useRouter();
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Fade in on mount
  useEffect(() => {
    setFadeTitle(false);
    setFadeTitleAndPipe(false);
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    // If navigating, don't run entry animation (will remount after navigation)
    if (isNavigating) return;
    const isHome = pageContext.title?.toLowerCase().trim() === 'home';
    if (isHome) {
      setFadeTitleAndPipe(true);
    } else {
      setFadeTitle(true);
    }
    fadeTimeoutRef.current = setTimeout(() => {
      if (isHome) {
        setTitle('');
        setFadeTitleAndPipe(true);
      } else {
        setTitle(pageContext.title?.toLowerCase() || '');
        setFadeTitleAndPipe(false);
        setFadeTitle(false);
      }
    }, animationDuration);
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    }
  }, [pageContext.title, isNavigating]);

  const fadePageTitle = useSpring({
    opacity: fadeTitle ? 0 : 1,
    config: { duration: animationDuration },
  });

  const fadeTitlePipe = useSpring({
    opacity: fadeTitleAndPipe ? 0 : 1,
    config: { duration: animationDuration },
  });

  // SPA-like fade out before navigation
  const handleNavigate = (e: any) => {
    e.preventDefault();
    setIsNavigating(true);
    setFadeTitle(true);
    setFadeTitleAndPipe(true);
    navTimeoutRef.current = setTimeout(() => {
      router.push('/');
    }, animationDuration);
  };

  return (
    <div className="flex gap-0 md:gap-2 h-12 text-2xl select-none">
      <Link
        href="/"
        onNavigate={handleNavigate}
        onClick={() => setMenuOpen(false)}
        className={`my-auto items-center justify-normal ${title !== '' && 'w-auto'} `}
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
