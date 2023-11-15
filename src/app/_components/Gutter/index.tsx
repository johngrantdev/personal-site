import React, { forwardRef, Ref } from 'react'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return (
    // add gutter styles with className props
    // eg.
    // left (boolean) && gutterLeft styles,
    // right && gutterRight,
    <div
      ref={ref}
      className={[
        'max-w-full mx-auto',
        left ? 'pl-36' : 'pl-0',
        right ? 'pr-36' : 'pr-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'
