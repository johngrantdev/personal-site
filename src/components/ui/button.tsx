import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
  el?: 'button' | 'link' | 'a'
  href?: string
  newTab?: boolean
  label?: string
  invert?: boolean
  appearance?: 'default' | 'primary' | 'secondary' | 'none' | VariantProps<typeof buttonVariants>['variant']
  disabled?: boolean
  className?: string
}

import Link from 'next/link'
import { ElementType } from 'react'

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  el: elFromProps = 'link',
  href,
  newTab,
  label,
  invert,
  appearance = 'default',
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  children,
  size,
  variant,
  ref,
  ...props
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  // Appearance logic (merge old with new system)
  let appearanceStyle = ''
  switch (appearance) {
    case 'primary':
      appearanceStyle = 'bg-transparent hover:bg-zinc-700 text-zinc-950 dark:text-zinc-50 dark:border-zinc-50 border-zinc-950'
      break
    case 'secondary':
      appearanceStyle = 'bg-green-400 border-zinc-950'
      break
    case 'none':
      appearanceStyle = 'bg-transparent'
      break
    default:
      appearanceStyle = '' // Use variant system for default
  }

  const mergedClassName = [
    appearanceStyle,
    classNameFromProps,
    'border rounded-xl cursor-pointer inline-flex justify-center bg-transparent px-3 py-2 transition-colors',
  ]
    .filter(Boolean)
    .join(' ')

  const content = children || (
    <div className="flex items-center justify-around">
      <span className="text-center flex items-center">{label}</span>
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  switch (el) {
    case 'link':
      return (
        <Link
          href={href || ''}
          className={mergedClassName}
          {...newTabProps}
          {...props}
        >
          {content}
        </Link>
      )
    case 'a':
      return (
        <a
          href={href}
          className={mergedClassName}
          {...newTabProps}
          {...props}
        >
          {content}
        </a>
      )
    case 'button':
    default:
      return (
        <button
          type={type}
          className={mergedClassName}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
      )
  }
}

export { Button, buttonVariants }
