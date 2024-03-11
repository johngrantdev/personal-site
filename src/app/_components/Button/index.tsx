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
      appearanceStyle =
        'bg-transparent hover:bg-zinc-700 text-zinc-950 dark:text-zinc-50 dark:border-zinc-50 border-zinc-950'
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
    appearanceStyle,
    classNameFromProps,
    'border rounded-xl cursor-pointer inline-flex justify-center bg-transparent px-3 py-2 transition-colors',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className="flex items-center justify-around">
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
