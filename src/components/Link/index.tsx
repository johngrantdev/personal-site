import { Button, type ButtonProps } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useCurrentPath } from './useCurrentPath'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: ButtonProps['variant'] | 'inline'
  children?: React.ReactNode
  className?: string
  invert?: ButtonProps['invert']
  label?: string | null
  newTab?: boolean | null
  ref?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

type CMSLinkTypeWithOffset = CMSLinkType & { activeUnderlineOffset?: string }

export const CMSLink: React.FC<CMSLinkTypeWithOffset> = (props) => {
  const {
    type,
    appearance = 'inline',
    invert,
    children,
    className,
    label,
    newTab,
    ref,
    size: sizeFromProps,
    url,
    activeUnderlineOffset,
  } = props

  const href =
    type === 'reference' && typeof ref?.value === 'object' && ref.value.slug
      ? `${ref?.relationTo !== 'pages' ? `/${ref?.relationTo}` : ''}/${
          ref.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const pathname = useCurrentPath()
  const normalize = (str: string) => str.replace(/\/$/, '')
  const isActive = normalize(href) === normalize(pathname)

  /* Ensure we don't break any styles set by richText */
  if (!appearance || appearance === 'inline') {
    return (
      <Link
        href={href || url || ''}
        className={[
          className,
          isActive
            ? [
                'underline',
                activeUnderlineOffset ? `underline-offset-[${activeUnderlineOffset}]` : 'underline-offset-4',
                'text-white dark:text-white',
              ].join(' ')
            : '',
        ].filter(Boolean).join(' ')}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  // Otherwise, render Button as in old component
  return (
    <Button
      asChild
      className={className}
      appearance={appearance}
      invert={invert}
      size={size}
    >
      <Link href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
