import React, { forwardRef, Ref } from 'react'

type Props = {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Padding: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { top = true, bottom = true, left = true, right = true, children, className } = props

  return (
    <div
      ref={ref}
      className={`max-w-full mx-auto ${top ? 'pt-6' : 'pt-0'} ${
        bottom ? 'pb-6' : 'pb-0'
      } ${className} ${left ? 'pl-6 md:pl-12 xl:pl-24' : 'pl-0'} ${
        right ? 'pr-6 md:pr-12 xl:pr-24' : 'pr-0'
      }`}
    >
      {children}
    </div>
  )
})

Padding.displayName = 'Padding'
