'use client'

import React, { ElementType } from 'react'
import Link from 'next/link'

// import classes from './index.module.scss'

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  let appearanceStyle

  // need to add inverse appearances types to tailwind
  switch (appearance) {
    case 'primary':
      appearanceStyle = 'bg-zinc-300 text-zinc-950 border-zinc-950'
      break
    case 'secondary':
      appearanceStyle = 'bg-green-400 border-zinc-950'
      break
    case 'none':
      appearanceStyle = 'bg-transparent'
      break
    default:
      appearanceStyle = 'bg-transparent'
  }

  const className = [
    'border rounded-md cursor-pointer inline-flex justify-center bg-transparent no-underline underline-offset-5 mr-4 px-3 py-2 transition-colors',
    classNameFromProps,
    appearanceStyle,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className=" flex items-center justify-around">
      <span className="text-center flex items-center">{label}</span>
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
